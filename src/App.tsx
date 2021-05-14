import { useState } from 'react';
import './App.css';
import moment from 'moment'
import UseDashboard from './components/Dashboard/useDashboard';
import UseCalendarGrid from './components/CalendarGrid/useCalendarGrid';
import styled from 'styled-components';


const Container = styled('div')`
border-top:1px solid #737374;
border-left:1px solid #464648;
border-right:1px solid #464648;
border-bottom: 2px solid  #464648;
overflow:hidden;
`;

function App() {

  const [actualMoment, setActualMoment] = useState(moment());
  //const actualMoment = moment() ;
  const startDay = actualMoment.clone().startOf('month').startOf('week');
  const endDay = moment().endOf('month').endOf('week');

  const calendar = [];
  const day = startDay.clone();
  while (!day.isAfter(endDay)) {
    calendar.push(day.clone());
    day.add(1, 'day')
  }

  const prevHandler = () => setActualMoment(prev => prev.clone().subtract(1, 'month'));;
  const todayHandler = () => setActualMoment(moment());
  const nextHandler = () => setActualMoment(prev => prev.clone().add(1, 'month'));

  return (
    <Container>
      <UseDashboard
        actualMoment={actualMoment}
        prevHandler={prevHandler}
        todayHandler={todayHandler}
        nextHandler={nextHandler}
      />
      <UseCalendarGrid startDay={startDay} actualMoment={actualMoment} />
    </Container>
  );
}

export default App;

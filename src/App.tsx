import './App.css';
import moment from 'moment'
import UseHeader from './components/Header/useHeader';
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

  const actualMoment = moment();
  const startDay = actualMoment.clone().startOf('month').startOf('week');
  const endDay = moment().endOf('month').endOf('week');

  const calendar = [];
  const day = startDay.clone();
  while (!day.isAfter(endDay)) {
    calendar.push(day.clone());
    day.add(1, 'day')
  }



  return (
    <Container>
      {/* <UseHeader /> */}
      <UseDashboard actualMoment={actualMoment} />
      <UseCalendarGrid startDay={startDay} />
    </Container>
  );
}

export default App;

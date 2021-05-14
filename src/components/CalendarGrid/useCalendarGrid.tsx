import moment, { Moment } from 'moment';
import { useState, memo } from 'react'
import styled from 'styled-components';
import { ICalendar, ICellWrapper, IHeaders, IRowInCell } from '../../interfaces';
import Modal from '../Modal/useModal';

const GridWrapper = styled.div<IHeaders>`
display: grid;
grid-template-columns: repeat(7, 1fr);
grid-gap:1px;
background-color: ${props => props.isHeader ? '#3f75a5' : '#404040'};
${props => props.isHeader && 'border-botton: 1px solid #404040'}

`;

const CellWrapper = styled.div<ICellWrapper>`
min-width: 140px;
min-height: 80px;
background-color: ${props => props.isWeekend ? '#c3c9cc' : '#f2f2f2'};
color: ${props => props.isWeekend ?
        props.isSelectedMonth ? '#73acd4' : '#b2b9bf'
        :
        props.isSelectedMonth ? '#1E1F21' : '#b2b9bf'}; 
font-weight:bold;
`;

const HeaderWrapper = styled.div`
min-width: 140px;
min-height: 24px;
background-color: #3f75a5;
color: #DDDCDD;
font-weight:bold;
`;

const RowInCell = styled.div<IRowInCell>`
display:flex;
justify-content: ${props => props.justifyContent} ;
`;

const DayWrapper = styled.div`
height: 33px;
width: 33px;
display:flex;
align-items:center;
justify-content: center;
margin: 2px;
`;

const CurrentDay = styled.div`
height: 100%;
width: 100%;
background: #3f75a5;
border-radius: 50%;
display:flex;
align-items:center;
justify-content:center;
color: #DDDCDD;
`;

export default memo(function useCalendarGrid(props: ICalendar) {

    const { startDay, actualMoment } = props;
    const [modalIsOpened, setModalIsOpened] = useState(false);
    const [selectedDay, setSelectedDay] = useState<Moment>();
    const day = startDay.clone().subtract(1, 'day');
    const days = [...Array(42)].map(() => day.add(1, 'day').clone());
    const isSelectedMonth = (day: moment.Moment) => actualMoment.isSame(day, 'month');
    const currentDay = (day: moment.Moment) => moment().isSame(day, 'day');


    const driveModalEvent = (value: boolean, day: moment.Moment) => {
        setModalIsOpened(value);
        setSelectedDay(day);
    };

    return (
        <>
            <GridWrapper isHeader={true}>
                {[...Array(7)].map((_, i) => (
                    <HeaderWrapper key={_}>
                        <RowInCell justifyContent={'center'} >
                            {moment().day(i).format('dddd')}
                        </RowInCell>
                    </HeaderWrapper>)
                )}
            </GridWrapper>
            <GridWrapper isHeader={false}>
                {days.map((dayItem) => (

                    <CellWrapper
                        key={dayItem.unix()}
                        isSelectedMonth={isSelectedMonth(dayItem)}
                        isWeekend={dayItem.day() === 6 || dayItem.day() === 0}
                        onClick={() => driveModalEvent(true, dayItem)}>
                        <RowInCell justifyContent={'flex-start'}  >
                            <DayWrapper>
                                {!currentDay(dayItem) && dayItem.format('D')}
                                {currentDay(dayItem) && <CurrentDay>{dayItem.format('D')}</CurrentDay>}
                            </DayWrapper>
                        </RowInCell>
                    </CellWrapper>

                ))}
            </GridWrapper>
            {modalIsOpened ? <Modal driveModalEvent={driveModalEvent} isOpen={modalIsOpened} actualMoment={actualMoment} day={selectedDay}></Modal> : <></>}
        </>
    )
}
)

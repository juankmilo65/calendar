import moment from 'moment';
import React from 'react'
import styled from 'styled-components';
import { ICalendar, ICellWrapper } from '../../interfaces';

const GridWrapper = styled.div`
display: grid;
grid-template-columns: repeat(7, 1fr);
grid-template-rows: repeat(6, 1fr);
grid-gap:1px;
background-color: #404040;
`;

const CellWrapper = styled.div<ICellWrapper>`
min-width: 140px;
min-height: 80px;
background-color: ${props => props.isWeekend ? '#c3c9cc' : '#f2f2f2'};
color: ${props => props.isWeekend ? '#73acd4' : '#1E1F21'}; ;
font-weight:bold;
`;

const RowInCell = styled.div`
display:flex;
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

export default function useCalendarGrid({ startDay }: ICalendar) {
    const day = startDay.clone().subtract(1, 'day');
    const days = [...Array(42)].map(() => day.add(1, 'day').clone());
    const currentDay = (day: moment.Moment) => moment().isSame(day, 'day');

    return (
        <GridWrapper>
            {days.map((dayItem) => (
                <CellWrapper
                    key={dayItem.unix()}
                    isWeekend={dayItem.day() === 6 || dayItem.day() === 0}>
                    <RowInCell>
                        <DayWrapper>
                            {!currentDay(dayItem) && dayItem.format('D')}
                            {currentDay(dayItem) && <CurrentDay>{dayItem.format('D')}</CurrentDay>}
                        </DayWrapper>
                    </RowInCell>
                </CellWrapper>
            ))}
        </GridWrapper>
    )
}

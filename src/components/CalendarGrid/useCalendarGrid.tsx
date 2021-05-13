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
height: 15px;
width: 33px;
display:flex;
align-items:center;
justify-content: center;
`;

export default function useCalendarGrid({ startDay }: ICalendar) {
    const totaldays = 42;
    const day = startDay.clone().subtract(1, 'day');
    const days = [...Array(42)].map(() => day.add(1, 'day').clone());
    console.log(days)
    return (
        <GridWrapper>
            {days.map((dayItem) => (
                <CellWrapper
                    key={dayItem.format('DDMMYYY')}
                    isWeekend={dayItem.day() === 6 || dayItem.day() === 0}>
                    <RowInCell>
                        <DayWrapper>
                            {dayItem.format('D')}
                        </DayWrapper>
                    </RowInCell>
                </CellWrapper>
            ))}
        </GridWrapper>
    )
}

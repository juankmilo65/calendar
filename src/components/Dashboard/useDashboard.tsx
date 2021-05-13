import React from 'react'
import styled from 'styled-components'
import { IDashboard } from '../../interfaces';

const DivWraper = styled('div')`
 display:flex;
 justify-content: space-between;
 background-color: #3f75a5;
 color: #DDDCDD;
 padding: 16px;
`;

const TexWrapper = styled('span')`
font-size:32px;
`;

const TitleWrapper = styled(TexWrapper)`
font-weight:bold;
margin-right: 8px;
`;

const ButtonsWrapper = styled('div')`
display: flex;
align-items: center;
`;

const ButtonWrapper = styled('button')`
border: unset;
background-color:#c3c9cc;
height: 20px;
margin-right: 2px;
border-radius:4px;
color:#1E1F21;
`;

const TodayButon = styled(ButtonWrapper)`
padding-right:16px;
padding-left:16px;
font-weight:bold;
`;


export default function useDashboard(props: IDashboard) {

    const { actualMoment, prevHandler, todayHandler, nextHandler } = props;

    return (
        <DivWraper>
            <div>
                <TitleWrapper>{actualMoment.format('MMMM')}</TitleWrapper>
                <TexWrapper>{actualMoment.format('YYYY')}</TexWrapper>
            </div>
            < ButtonsWrapper>
                <ButtonWrapper onClick={prevHandler}>{'<'}</ButtonWrapper>
                <TodayButon onClick={todayHandler}>Today</TodayButon>
                <ButtonWrapper onClick={nextHandler}>{'>'}</ButtonWrapper>
            </ ButtonsWrapper>
        </DivWraper>
    )
}

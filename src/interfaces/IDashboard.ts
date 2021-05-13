import moment from "moment";

export interface IDashboard {
    actualMoment: moment.Moment;
    prevHandler: React.MouseEventHandler<HTMLButtonElement>;
    todayHandler: React.MouseEventHandler<HTMLButtonElement>;
    nextHandler: React.MouseEventHandler<HTMLButtonElement>;
}
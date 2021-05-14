import moment from "moment";

export interface ICalendar {
    startDay: moment.Moment;
    actualMoment: moment.Moment;
}
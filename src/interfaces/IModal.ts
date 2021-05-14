import moment from "moment";

export interface IModal {
    isOpen: boolean;
    driveModalEvent(value: boolean, day: moment.Moment | undefined): void;
    actualMoment: moment.Moment;
    day: moment.Moment | undefined;
};
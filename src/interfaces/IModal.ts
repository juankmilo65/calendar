import moment from "moment";

export interface IModal {
    isOpen: boolean;
    driveModalEvent(value: boolean, day: moment.Moment | undefined): void;
    day: moment.Moment | undefined;
};
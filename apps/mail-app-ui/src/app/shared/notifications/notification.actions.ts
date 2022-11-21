import {createAction, createActionGroup} from "@ngrx/store";
import {DateTime} from "luxon";

class NotificationsActionProps {
  constructor(public message: string, public id: string, public date: Date) {
  }
}

export interface NotificationProps {
  message: string;
  id: string;
  date: Date;
}

export const test123 = createAction('XXXX');

export const notificationActions = createActionGroup({
  source: 'Notification',
  events: {
    success: (data: {
      message: string,
      id?: string,
      date?: Date
    }) => new NotificationsActionProps(data.message, data.id ?? Date.now().toString(), data.date ?? DateTime.utc().toJSDate()),
    error: (data: {
      message: string,
      id?: string,
      date?: Date
    }) => new NotificationsActionProps(data.message, data.id ?? Date.now().toString(), data.date ?? DateTime.utc().toJSDate())
  }
})

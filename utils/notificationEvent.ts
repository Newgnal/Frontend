import mitt from "mitt";

type NotificationPayload = {
  title: string | null;
  body: string | null;
};

export const notificationEvent = mitt<{
  foregroundNotification: NotificationPayload;
}>();

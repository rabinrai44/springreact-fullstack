import { notification } from "antd";

const openNotificationWithIcon = (type, message, description) => {
  notification[type]({ message, description });
};

const successNotification = (message, description) => {
  openNotificationWithIcon("success", message, description);
};

const errorNotification = (message, description) => {
  openNotificationWithIcon("error", message, description);
};

const infoNotification = (message, description) => {
  openNotificationWithIcon("info", message, description);
};

const warningNotification = (message, description) => {
  openNotificationWithIcon("warning", message, description);
};

export {
  successNotification,
  errorNotification,
  infoNotification,
  warningNotification,
};

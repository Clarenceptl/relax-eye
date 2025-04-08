export const sendNotification = (title: string, message: string) => {
  return new window.Notification(title, {
    body: message
  });
};

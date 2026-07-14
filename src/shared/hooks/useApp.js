/**
 * custom wrapper hook over ant design's global app context for notifications.
 * standardizes toast message configurations (duration, placement, hover behavior)
 * and exposes a simplified, unified api (success, error, warning, info) across the app.
 */

"use client";

import { App } from "antd";

// Hook to access Ant Design App context
export const useApp = () => {
  const { notification } = App.useApp();

  const notificationMsgObj = (text) => {
    return {
      title: text,
      description: null,
      placement: "topRight",
      duration: 3.5,
      pauseOnHover: true,
    }
  }

  const customMessage = {
    success: (text) => notification.success(notificationMsgObj(text)),
    error: (text) => notification.error(notificationMsgObj(text)),
    warning: (text) => notification.warning(notificationMsgObj(text)),
    info: (text) => notification.info(notificationMsgObj(text)),
  };

  return {
    message: customMessage,
  };
};
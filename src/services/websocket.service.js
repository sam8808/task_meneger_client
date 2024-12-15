import Echo from "laravel-echo";
import Pusher from "pusher-js";
import { websocketConfig } from "../config/websocket";

export const initWebSocket = (token) => {
  window.Pusher = Pusher;

  return new Echo({
    broadcaster: "pusher",
    key: websocketConfig.key,
    wsHost: websocketConfig.host,
    wsPort: websocketConfig.port,
    wssPort: websocketConfig.port,
    forceTLS: websocketConfig.forceTLS,
    disableStats: true,
    auth: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });
};

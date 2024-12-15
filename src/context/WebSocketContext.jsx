import { createContext, useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import Echo from "laravel-echo";
import Pusher from "pusher-js";
import { websocketConfig } from "../config/websocket";

const WebSocketContext = createContext({});

export const WebSocketProvider = ({ children }) => {
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!token) return;

    window.Pusher = Pusher;

    const echo = new Echo({
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

    // Subscribe to channels
    echo.private(`App.Models.User.${userId}`).notification((notification) => {
      // Handle notification
    });

    return () => {
      echo.disconnect();
    };
  }, [token]);

  return (
    <WebSocketContext.Provider value={{}}>{children}</WebSocketContext.Provider>
  );
};

export const useWebSocket = () => useContext(WebSocketContext);

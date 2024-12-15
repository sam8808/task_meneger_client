export const websocketConfig = {
    key: import.meta.env.VITE_PUSHER_APP_KEY,
    cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
    host: import.meta.env.VITE_WEBSOCKETS_SERVER || window.location.hostname,
    port: import.meta.env.VITE_WEBSOCKETS_PORT || 6001,
    forceTLS: false
  }
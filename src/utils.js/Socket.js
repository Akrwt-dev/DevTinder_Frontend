import { io } from "socket.io-client";
import { SOCKET_URL } from "./constant";

export const createSocketConnection = () => {
  return io(SOCKET_URL, {
    withCredentials: true,
  });
};

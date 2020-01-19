import { config } from "./config";
import socketIO from 'socket.io-client'

const { SERVER_URL } = config;
const socket = socketIO(SERVER_URL);

export default socket;

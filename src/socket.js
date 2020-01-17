import { config } from "./config";

const { SERVER_URL } = config;

import socketIO from 'socket.io-client'

const socket = socketIO(SERVER_URL);

export default socket;

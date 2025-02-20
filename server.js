require("dotenv").config();
const aedes = require("aedes")();
const net = require("net");
const mqtt = require("mqtt");
const express = require("express");

const MQTT_PORT = 1883;
const HTTP_PORT = 3000;

// Create MQTT broker
const server = net.createServer(aedes.handle);
server.listen(MQTT_PORT, () => {
  console.log(`MQTT broker running on port ${MQTT_PORT}`);
});

// Log new connections
aedes.on("client", (client) => {
  console.log(`New MQTT client connected: ${client.id}`);
});

// Log when a client disconnects
aedes.on("clientDisconnect", (client) => {
  console.log(`MQTT client disconnected: ${client.id}`);
});

// Express API Server
const app = express();
app.use(express.json());

let latestData = {
  temperature: null,
  humidity: null,
};



// API Endpoints
app.get("/data", (req, res) => {
  res.json(latestData);
});

// Start HTTP Server
app.listen(HTTP_PORT, () => {
  console.log(`HTTP server running on port ${HTTP_PORT}`);
});

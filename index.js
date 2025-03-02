require("dotenv").config();
const { connect, JSONCodec } = require("nats");
let nc;

async function initNats() {
  try {
    nc = await connect({ servers: process.env.NATS_URL });
    console.log("NATS connected successfully");
  } catch (err) {
    console.error("Failed to connect to NATS:", error);
    process.exit(1); // Exit if we can't connect to NATS
  }
}

initNats();

const jc = JSONCodec();
const sub = nc.subscribe("todo_status");

async function logMessages() {
  try {
    for await (const m of sub) {
      console.log(`[${sub.getProcessed()}]: ${jc.decode(m.data)}`);
    }

    console.log("subscription closed");
  } catch (err) {
    console.error("Error connecting to NATS:", err);
  }
}

logMessages();

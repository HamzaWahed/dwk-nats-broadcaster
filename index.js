require("dotenv").config();
const { connect, JSONCodec } = require("nats");
let nc;
const jc = JSONCodec();

async function initNats() {
  try {
    nc = await connect({ servers: process.env.NATS_URL });
    console.log("NATS connected successfully");

    const sub = nc.subscribe("todo_status");

    for await (const m of sub) {
      console.log(`[${sub.getProcessed()}]: ${jc.decode(m.data).status}`);
    }

    console.log("subscription closed");
  } catch (error) {
    console.error("Failed to connect to NATS:", error);
    process.exit(1);
  }
}

initNats();

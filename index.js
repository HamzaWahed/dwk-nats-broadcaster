require("dotenv").config();
const axios = require("axios");
const { connect, JSONCodec } = require("nats");
let nc;
const jc = JSONCodec();
const webhookUrl = process.env.WEBHOOK;
const staging = process.env.STAGING;

async function initNats() {
  try {
    nc = await connect({ servers: process.env.NATS_URL });
    console.log("NATS connected successfully");

    const sub = nc.subscribe("todo_status", { queue: "todo_workers" });

    for await (const m of sub) {
      const payload = jc.decode(m.data);
      console.log(`[${sub.getProcessed()}]: ${payload.status}`);
      if (!staging) {
        await axios.post(webhookUrl, {
          content: `Todo status update: ${payload.status}`,
        });
      }
    }

    console.log("subscription closed!");
  } catch (error) {
    console.error("Failed to connect to NATS:", error);
    process.exit(1);
  }
}

initNats();

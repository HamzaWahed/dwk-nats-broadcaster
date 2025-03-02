const { connect, JSONCodec } = require("nats");

nc = await connect({ servers: process.env.NATS_URL });
jc = JSONCodec();

const sub = nc.subscribe("todo_status");

(async () => {
  for await (const m of sub) {
    console.log(`[${sub.getProcessed()}]: ${jc.decode(m.data)}`);
  }

  console.log("subscription closed");
})();

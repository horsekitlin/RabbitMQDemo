const amqp = require("amqplib/callback_api");

amqp.connect("amqp://localhost", function(err, conn) {
  if (err) return;
  conn.createChannel(function(err, ch) {
    const q = "hello";
    ch.prefetch(2);

    ch.assertQueue(q, { durable: false });
    ch.sendToQueue(q, new Buffer('{"hello": "world"}'));
    //ch.publish((exchange = ""), (routing_key = "hello"), (body = "message"));

    setTimeout(function() {
      conn.close();
      process.exit(0);
    }, 500);
    console.log(" [x] Sent 'Hello World!'");
  });
});

var amqp = require("amqplib/callback_api");

amqp.connect("amqp://localhost", function(err, conn) {
  conn.createChannel(function(err, ch) {
    const ex = "direct_logs";

    const topic_ex = "topic_logs";
    const msg = "Hello World!";

    const severity = "hello.11";

    ch.assertExchange(topic_ex, "topic", { durable: false });
    ch.assertExchange(ex, "direct", { durable: false });

    ch.publish(topic_ex, severity, new Buffer(msg));
    console.log(" [x] Sent topic %s %s: '%s'", topic_ex, severity, msg);
  });

  setTimeout(function() {
    conn.close();
    process.exit(0);
  }, 500);
});

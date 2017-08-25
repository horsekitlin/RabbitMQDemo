const amqp = require("amqplib/callback_api");
const moment = require("moment");

amqp.connect("amqp://localhost", function(err, conn) {
  conn.createChannel(function(err, ch) {
    ch.assertExchange("logs", "fanout", { durable: false });

    ch.publish("logs", "", new Buffer("Hello World!"));
    setTimeout(function() {
      conn.close();
      process.exit(0);
    }, 500);
  });
});

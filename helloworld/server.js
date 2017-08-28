const amqp = require("amqplib/callback_api");
const moment = require("moment");

amqp.connect("amqp://localhost", function(err, conn) {
  conn.createChannel(function(err, ch) {
    var q = "hello";

    ch.assertQueue(q, { durable: false });

    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
    ch.consume(
      q,
      async msg => {
        console.log(JSON.parse(msg.content.toString()));
        // console.log(" [x] Received %s", msg.content.toString(), moment());
        //todo
        ch.ack(msg);
      },
      { noAck: false }
    );
  });
});

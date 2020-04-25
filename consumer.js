var q = 'tasks';
 
var open = require('amqplib').connect('amqp://localhost');
var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(error0, connection) {
  console.log(1);
  if (error0) {
    throw error0;
  }
  console.log(2);
  connection.createChannel(function(error1, channel) {
    console.log(3, channel);
  });
});

// // consumer
// open.then(function(conn) {
//   return conn.createChannel();
// }).then(function(ch) {
//   return ch.assertQueue(q).then(function(ok) {
//     return ch.consume(q, function(msg) {
//       if (msg !== null) {
//         console.log(msg.content.toString());
//         ch.ack(msg);
//       }
//     });
//   });
// }).catch(console.warn);
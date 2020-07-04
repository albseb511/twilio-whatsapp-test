var express = require("express");
const app = express();
const bodyParser = require("body-parser");
const MessagingResponse = require("twilio").twiml.MessagingResponse;
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.TWILLIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);
var port = 8000;

var count = 0;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/", (req, res) => {
  console.log(req.body, ++count);
  const twiml = new MessagingResponse();
  if (req.body.From.indexOf("+91---") !== -1) {
    twiml.message("Hey Albert! you have a Javascript class in 2 hours");
  } else if (req.body.From.indexOf("+91---") !== -1) {
    twiml.message(
      "Hey Nrupul! Todays stats are: Ninjas: 32/35 attended all classes, 30% started coding sessions.!"
    );
  } else if (req.body.From.indexOf("+91---") !== -1) {
    twiml.message(
      "Hey Prateek! Todays stats are: Ninjas: 32/35 attended all classes, 30% started coding sessions."
    );
  } else if (req.body.From.indexOf("+91---") !== -1) {
    twiml.message("Hey Anoop! there is a lot of work to do!");
  }

  res.writeHead(200, { "Content-Type": "text/xml" });
  res.end(twiml.toString());
});
app.post("/response", (req, res) => {
  console.log(req.body);
  res.send({ message: "success" });
});

app.post("/message/:phone", (req, res) => {
  client.messages
    .create({
      body: req.body.message,
      from: "whatsapp:+14155238886",
      to: "whatsapp:" + req.params.phone
    })
    .then(message => {
      res.send({ error: false, message: "successful", data: message });
    })
    .catch(err => {
      res.send({ error: true, message: "Something went wrong", data: err });
    });
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);

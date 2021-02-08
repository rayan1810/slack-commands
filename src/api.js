const express = require("express");

const serverless = require("serverless-http");

const app = express();

const router = express.Router();

router.get("/", (req, res) => {
  const messages = [
    "Signing off for the day, Good night!",
    "Wrapping up, Good night everyone.",
    "Signing off , Good Night.",
    "Wrapping up for the day. Good night.",
  ];
  const weekend_messages = [
    " and a Happy Weekend everyone 🏖️",
    " , Happy Weekend 🌴",
    " and a Happy Weekend 😄",
    " and a Happy Weekend everyone 🏝️",
  ];
  const randomInd = Math.floor(Math.random() * 3);
  let curr_text_msg = messages[randomInd];
  let today = new Date();
  if (today.getDay() == 6 || today.getDay() == 0) {
    curr_text_msg = curr_text_msg.slice(0, -1) + weekend_messages[randomInd];
  }

  res.json({
    response_type: "in_channel",
    text: curr_text_msg,
  });
});

app.use("/.netlify/functions/api", router);

module.exports.handler = serverless(app);

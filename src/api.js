const express = require("express");
const bodyParser = require("body-parser");
const serverless = require("serverless-http");

const app = express();
const axios = require("axios");
const router = express.Router();
app.use(bodyParser.urlencoded({ extended: true }));

router.post("/", (req, res) => {
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
  if (today.getDay() == 5 || today.getDay() == 6) {
    curr_text_msg = curr_text_msg.slice(0, -1) + weekend_messages[randomInd];
  }
  // const config = {
  //   headers: {
  //     "Content-type": "application/json",
  //   },
  // };
  // const bodyParameters = {
  //   text: "Thanks for your request, we'll process it and get back to you.",
  // };
  // Todo: - Fetch User RealName or Display Name from user.profile slack api
  // axios
  //   .post(req.body.response_url, bodyParameters, config)
  //   .then(function (response) {
  //     res.json({
  //       response_type: "ephemeral",
  //       text: curr_text_msg + JSON.stringify(response.data, null, 2),
  //     });
  //   })
  //   .catch((err) => {
  //     res.json({
  //       response_type: "ephemeral",
  //       text:
  //         curr_text_msg + JSON.stringify(req.body, null, 2) + "Error = " + err,
  //     });
  //   });
  // ----Old
  // res.json({
  //   response_type: "in_channel",
  //   blocks: [
  //     {
  //       type: "section",
  //       text: {
  //         type: "mrkdwn",
  //         text: `<@${req.body.user_name}> says \n>${curr_text_msg}`,
  //       },
  //     },
  //   ],
  // });
  res.json({
    response_type: "ephemeral",
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `Hi <@${req.body.user_name}>,  just wanted to say what someone quoted`,
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `\n>Be strong now, because things will get better. It might be stormy now, but it can't rain forever. `,
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `in these tough times we all have been dealing with a lot, and that is slowly pulling us apart, for this reason I would encourage you to atleast call it a day with your personal touch so that everyone can feel more human and connected in our goodbye's. Since you are expecting a Signing off message here's what you can use for your message today. And please do add something distict to your message.\n>${curr_text_msg} `,
        },
      },
    ],
  });
});

app.use("/.netlify/functions/api", router);

module.exports.handler = serverless(app);

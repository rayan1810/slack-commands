const express = require("express");
const bodyParser = require("body-parser");
const serverless = require("serverless-http");
const { createClient } = require("@supabase/supabase-js");
const supabaseUrl = "https://smorvzcentuxgmhpoejx.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNDk3NDE0MSwiZXhwIjoxOTUwNTUwMTQxfQ.BT4u0bUMzkGDyAJFVXLJz02Ph3c9RbtseX67eHg_qzE";
const supabase = createClient(supabaseUrl, supabaseKey);

const app = express();
const axios = require("axios");
const router = express.Router();
app.use(bodyParser.urlencoded({ extended: true }));

const addBirthday = async (birthday, username) => {
  const { data, error } = await supabase
    .from("Birthdays")
    .upsert([{ birthday: birthday, slackid: username }]);

  if (error) {
    console.log("error ", error);
    return;
  }

  console.log("data ", data);
};

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
  const birthday_messages = ["Signing off for the day, Good night!"];
  const showRandomInitiativeMessage = false;
  const randomInd = Math.floor(Math.random() * 3);
  const showPersonalTouch = Math.floor(Math.random() * 24) % 5 === 0;
  const text = req.body.text;
  let curr_text_msg = messages[randomInd];
  let today = new Date();
  if (today.getDay() == 5 || today.getDay() == 6) {
    curr_text_msg = curr_text_msg.slice(0, -1) + weekend_messages[randomInd];
  }
  if (text.includes("setBirthday")) {
    let birthdate = Date.parse(text.split("setBirthday ")[1]);
    if (birthdate === NaN) {
      res.json({
        response_type: "ephemeral",
        blocks: [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: `>Yes I have got validation checks , please enter your correct birthday!>`,
            },
          },
        ],
      });
    } else {
      addBirthday(birthdate, req.body.user_name);
    }
  } else {
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

    res.json({
      response_type: showPersonalTouch ? "ephemeral" : "in_channel",
      blocks:
        showPersonalTouch && showRandomInitiativeMessage
          ? [
              {
                type: "section",
                text: {
                  type: "mrkdwn",
                  text: `Hi <@${req.body.user_name}>,  someone rightly said`,
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
                  text: `In these tough times we all have been dealing with a lot, and that is slowly pulling us apart, for saving our culture and bond I would encourage you to at least call it a day with your personal touch sometimes, so that everyone can feel more human and connected in our goodbyes. Since you are expecting a Signing off message here's what you can use for your message today. And please do add something distict in your message.\n>${curr_text_msg} `,
                },
              },
            ]
          : [
              // {
              //   type: "section",
              //   text: {
              //     type: "mrkdwn",
              //     text: `<@${req.body.user_name}> says \n>${curr_text_msg}`,
              //   },
              // },
              {
                type: "section",
                text: {
                  type: "mrkdwn",
                  text: `${JSON.stringify(req.body, null, 2)}`,
                },
              },
            ],
    });
  }
});

router.get("/test", (req, res) => {
  addBirthday("23 Oct", "Rohit_Singh");
  res.json({
    response_type: "in_channel",
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `asdasd asd `,
        },
      },
    ],
  });
});
app.use("/.netlify/functions/api", router);

module.exports.handler = serverless(app);

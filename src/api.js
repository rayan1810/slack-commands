const express = require("express");
const bodyParser = require("body-parser");
const serverless = require("serverless-http");
const superagent = require("superagent");
const app = express();
const axios = require("axios");
const router = express.Router();
app.use(bodyParser.urlencoded({ extended: true }));

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
  if (today.getDay() == 5 || today.getDay() == 6) {
    curr_text_msg = curr_text_msg.slice(0, -1) + weekend_messages[randomInd];
  }
  // const config = {
  //   headers: {
  //     Authorization: `Bearer ${req.body.token}`,
  //     "Content-Type": "application/x-www-form-urlencoded",
  //   },
  // };
  // const bodyParameters = {
  //   user: req.body.user_id,
  // };
  // axios.post("https://slack.com/api/users.info", bodyParameters, config)
  //   .then(function (response) {
  //     res.json({
  //       response_type: "ephemeral",
  //       text: curr_text_msg + JSON.stringify(response, null, 2),
  //     });
  //   })
  //   .catch((err) => {
  //     res.json({
  //       response_type: "ephemeral",
  //       text:
  //         curr_text_msg + JSON.stringify(req.body, null, 2) + "Error = " + err,
  //     });
  //   });
  // superagent
  //   .get("https://slack.com/api/users.info")
  //   .send({ user: req.body.user_id }) // sends a JSON post body
  //   .set("Content-Type", "application/x-www-form-urlencoded")
  //   .set("Authorization", `Bearer ${req.body.token}`)
  //   .end(function (err, res) {
  res.json({
    response_type: "ephemeral",
    // text:
    //   curr_text_msg +
    //   JSON.stringify(req.body, null, 2) +
    //   "Error = " +
    //   err +
    //   "Response = " +
    //   res,
  });
  //   });
});

app.use("/.netlify/functions/api", router);

module.exports.handler = serverless(app);

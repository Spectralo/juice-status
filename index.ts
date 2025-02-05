const { App } = require("@slack/bolt");
const axios = require("axios");

const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,
});

const file_path = process.env.FILE_PATH;

(async () => {
  await app.start(process.env.PORT || 3000);
  console.log("Juice Status is running!");
  setInterval(async () => {
    const file = Bun.file(file_path);
    const jsonData = await file.json();

    jsonData.array.forEach((element) => {
      axios
        .get("https://juice.hackclub.com/api/user", {
          headers: {
            Authorization: `Bearer ${process.env.JUICE_TOKEN}`,
          },
        })
        .then((res: any) => {
          console.log(res.data.userData.totalJuiceHours);
          app.client.users.profile.set({
            token: process.env.SLACK_BOT_TOKEN,
            profile: {
              status_text: `${Math.round(res.data.userData.totalJuiceHours * 10) / 10} hours spent juicing!`,
              status_emoji: ":juice:",
            },
          });
        });
    });
  }, 3000);
})();

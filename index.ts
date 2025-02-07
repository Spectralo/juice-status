const { App } = require("@slack/bolt");
require("better-logging")(console);

const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,
});

const file_path: string = process.env.FILE_PATH || "tokens.json";

(async () => {
  await app.start(process.env.PORT || 3000);
  console.info("Started Juice Status Setter !");
  setInterval(async () => {
    const file = Bun.file(file_path);
    const jsonData = await file.json();
    let counter = 0;

    Object.keys(jsonData).forEach((key) => {
      counter++;
      console.info("");
      fetch("https://juice.hackclub.com/api/user", {
        headers: {
          Authorization: `Bearer ${jsonData[key]}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.info(
            "Fetched 1 user with : " + data.userData.totalJuiceHours + "h",
          );
          app.client.users.profile.set({
            token: key,
            profile: {
              status_text: `${Math.round(data.userData.totalJuiceHours * 10) / 10} hours spent juicing!`,
              status_emoji: ":juice:",
            },
          });
        })
        .catch((error) => {
          console.error(error)
        })
    });
    console.info(`Updated ${counter} users`);
  }, 10000);
})();

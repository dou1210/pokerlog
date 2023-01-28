import { BlindCountdown } from "./models/Countdowns/BlindCountdown";
import { BreakCountdown } from "./models/Countdowns/BreakCountdown";
import { config } from "./config";
import { StartBlindButton } from "./models/StartBlindButton";
import { Blind } from "./models/Blind";
import dayjs from "dayjs";
import { Time } from "./services/Time";

const blindCountdown = new BlindCountdown(
  config.countdowns.blind.id,
  config.countdowns.blind.initial,
  config.countdowns.blind.interval
);

const breakCountdown = new BreakCountdown(
  config.countdowns.break.id,
  config.countdowns.break.initial,
  config.countdowns.break.interval
);

new StartBlindButton("start-button").listenToClick(blindCountdown);
breakCountdown.start();

document.addEventListener("blindCountdownEnd", () => {
  Blind.next();
});

Time.changeCurrentHTMLTime();

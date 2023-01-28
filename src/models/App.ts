import { config } from "../config";
import { Time } from "../services/Time";
import { Blind } from "./Blind";
import { CloseMenuButton } from "./Buttons/CloseMenuButton";
import { MenuButton } from "./Buttons/MenuButton";
import { StartBlindButton } from "./Buttons/StartBlindButton";
import { BlindCountdown } from "./Countdowns/BlindCountdown";
import { BreakCountdown } from "./Countdowns/BreakCountdown";
import { ElapsedTimeCounter } from "./TimeCounters/ElapsedTimeCounter";

export class App {
  public init() {
    const blindCountdown = new BlindCountdown(
      config.countdowns.blind.id,
      config.countdowns.blind.initial,
      config.countdowns.blind.restartTime
    );

    const breakCountdown = new BreakCountdown(
      config.countdowns.break.id,
      config.countdowns.break.initial,
      config.countdowns.break.restartTime
    );

    const elapsedTimeCounter = new ElapsedTimeCounter(
      config.counters.timeElapsed.id,
      config.counters.timeElapsed.interval
    );

    new StartBlindButton("start-button").listenToClick(blindCountdown);

    document.addEventListener("blind_countdown:start", () => {
      console.log(breakCountdown.isRunning);

      if (!breakCountdown.isRunning) breakCountdown.start();
      if (!elapsedTimeCounter.isRunning) elapsedTimeCounter.start();
    });

    document.addEventListener("blind_countdown:manual_stop", () => {
      if (breakCountdown.isRunning) breakCountdown.stop();
    });

    document.addEventListener("blind_countdown:end", () => {
      Blind.next();
    });

    Time.changeCurrentHTMLTime();

    const menuButton = new MenuButton();
    const closeMenuButton = new CloseMenuButton();

    menuButton.init();
    closeMenuButton.init();
  }
}

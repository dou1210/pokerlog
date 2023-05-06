import { config } from '../config';
import { Time } from '../services/Time';
import { Blind } from './Blind';
import { MenuButton } from './Buttons/MenuButton';
import { PlayerListButton } from './Buttons/PlayerListButton';
import { StartBlindButton } from './Buttons/StartBlindButton';
import { BlindCountdown } from './Countdowns/BlindCountdown';
import { BreakCountdown } from './Countdowns/BreakCountdown';
import { Player } from './Player';
import { ElapsedTimeCounter } from './TimeCounters/ElapsedTimeCounter';

export class App {
  private static _playersInGame: Player[] = [];

  public static get playersInGame(): Player[] {
    return App._playersInGame;
  }

  public static addPlayerToGame(player: Player) {
    App._playersInGame.push(player);
  }

  public static removePlayerFromGame(player: Player) {
    App._playersInGame = App._playersInGame.filter(
      (playerInGame) => playerInGame.id !== player.id,
    );
  }

  public init() {
    const blindCountdown = new BlindCountdown(
      config.countdowns.blind.id,
      config.countdowns.blind.initial,
      config.countdowns.blind.restartTime,
    );

    const breakCountdown = new BreakCountdown(
      config.countdowns.break.id,
      config.countdowns.break.initial,
      config.countdowns.break.restartTime,
    );

    const elapsedTimeCounter = new ElapsedTimeCounter(
      config.counters.timeElapsed.id,
      config.counters.timeElapsed.interval,
    );

    new StartBlindButton('start-button').listenToClick(blindCountdown);

    document.addEventListener('blind_countdown:start', () => {
      console.log(breakCountdown.isRunning);

      if (!breakCountdown.isRunning) breakCountdown.start();
      if (!elapsedTimeCounter.isRunning) elapsedTimeCounter.start();
    });

    document.addEventListener('blind_countdown:manual_stop', () => {
      if (breakCountdown.isRunning) breakCountdown.stop();
    });

    document.addEventListener('blind_countdown:end', () => {
      Blind.next();
    });

    Time.changeCurrentHTMLTime();

    const menuButton = new MenuButton();
    menuButton.init();
    const playerListButton = new PlayerListButton();
    playerListButton.init();
  }
}

import { Time } from "../services/Time";

const blindTime = Time.toMinutes(0.08);
const breakTime = Time.toMinutes(90);

class Config {
  public readonly countdowns = {
    blind: {
      id: "round-countdown-timer",
      initial: blindTime,
      current: blindTime,
      interval: Time.toMilliseconds(4),
    },
    break: {
      id: "break",
      initial: breakTime,
      current: breakTime,
      interval: 0,
    },
    elapsed: {
      id: "time-elapsed",
      current: 0,
    },
  };

  public readonly blinds = [
    "50 / 100",
    "100 / 200",
    "150 / 300",
    "200 / 400",
    "300 / 600",
    "400 / 800",
    "500 / 1K",
    "600 / 1200",
    "800 / 1600",
    "1K / 2K",
    "1500 / 3K",
    "2K / 4K",
    "3K / 6K",
    "4K / 8K",
    "5K / 10K",
    "6K / 12K",
    "8K / 16K",
    "10K / 20K",
  ];
}

/**
 * Cette variable représente la configuration de la partie
 * Elle contient les informations suivantes:
 * - la configuration des compte à rebours
 * - la valeur des blinds
 */
export const config = new Config();

import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

// le mot clé abstract permet de créer une classe abstraite
// une classe abstraite ne peut pas être instanciée
// une classe abstraite peut contenir des méthodes abstraites
// une classe abstraite peut contenir des méthodes normales
export abstract class Time {
  public static readonly HOUR = 60 * 60;
  public static toMinutes(num: number): number {
    return dayjs.duration(num * 60, "minutes").asMinutes();
  }

  public static toMilliseconds(num: number): number {
    return dayjs.duration(num / 60, "minutes").asMilliseconds();
  }

  public static getCurrentTime() {
    return dayjs().format("HH:mm:ss");
  }

  public static changeCurrentHTMLTime() {
    const time = document.getElementById("current-time");
    if (time) {
      time.innerText = Time.getCurrentTime();

      setInterval(() => {
        time.innerText = Time.getCurrentTime();
      }, 1000);
    }
  }
}

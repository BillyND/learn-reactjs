import { useEffect } from "react";
import { useState } from "react";

const CountDown = (props) => {
  const { timeOutSubmit, stopCount } = props;
  const [count, setCount] = useState(300);
  const [timeCount, setTimeCount] = useState("00:00");
  const [isOutTime, setIsOutTime] = useState(false);

  useEffect(() => {
    if (stopCount === false) {
      const secondsToTime = (e) => {
        const h = Math.floor(e / 3600)
            .toString()
            .padStart(2, "0"),
          m = Math.floor((e % 3600) / 60)
            .toString()
            .padStart(2, "0"),
          s = Math.floor(e % 60)
            .toString()
            .padStart(2, "0");

        // return h + ':' + m + ':' + s;
        return m + ":" + s;
      };

      if (count < 0) {
        setIsOutTime(true);
        timeOutSubmit();
        return;
      }
      const timer = setInterval(() => {
        setCount(count - 1);
        setTimeCount(secondsToTime(count));
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [count]);

  return (
    <div className="countdown">
      {isOutTime ? <div>Hết giờ</div> : <div> {timeCount}</div>}
    </div>
  );
};

export default CountDown;

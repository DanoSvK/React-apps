import { useEffect } from "react";

function Timer({ dispatch, secondsRemaining }) {
  const min = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  const formattedMin = min.toString().padStart(2, "0");
  const formattedSeconds = seconds.toString().padStart(2, "0");

  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);

    return () => clearInterval(id);
  }, [dispatch]);

  return (
    <div className="timer">
      {formattedMin}:{formattedSeconds}
    </div>
  );
}

export default Timer;

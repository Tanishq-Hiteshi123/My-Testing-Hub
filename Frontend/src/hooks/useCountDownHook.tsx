
// import { useState, useEffect } from "react";

// const useCountDownHook = (targetDate: string | number) => {
//   const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

//   function calculateTimeLeft() {
   
//     const now = new Date().getTime();

//     let countdownDate;
//     if (typeof targetDate == "string") {
         
//          countdownDate = new Date(targetDate).getTime();
//     }
//     else {
//         console.log("Its number")
//          countdownDate = now + targetDate * 60 * 1000
//     }

    
//     const difference = countdownDate - now;

//     if (difference <= 0) {
//       return { days: 0, hours: 0, minutes: 0, seconds: 0 };
//     }

//     console.log(
//         difference,
//        { days: Math.floor(difference / (1000 * 60 * 60 * 24)),
//         hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
//         minutes: Math.floor((difference / 1000 / 60) % 60),
//         seconds: Math.floor((difference / 1000) % 60),}
//     )
//     return {
//       days: Math.floor(difference / (1000 * 60 * 60 * 24)),
//       hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
//       minutes: Math.floor((difference / 1000 / 60) % 60),
//       seconds: Math.floor((difference / 1000) % 60),
//     };
   

  
//   }

  

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setTimeLeft(calculateTimeLeft());
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [targetDate]);

//   return timeLeft;
// };

// export default useCountDownHook;
import { useState, useEffect } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const useCountDownHook = (targetDate: string | number): TimeLeft => {
  const calculateTimeLeft = (): TimeLeft => {
    const now = new Date().getTime();

    let countdownDate: number;
    if (typeof targetDate === "string") {
      countdownDate = new Date(targetDate).getTime();
      if (isNaN(countdownDate)) {
        console.error("Invalid date string passed to useCountDownHook.");
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }
    } else if (typeof targetDate === "number") {
      countdownDate = now + targetDate * 60 * 1000; // Convert minutes to milliseconds
    } else {
      console.error("Invalid targetDate type passed to useCountDownHook.");
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const difference = countdownDate - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return timeLeft;
};

export default useCountDownHook;

import React, { useState, useEffect } from 'react';
import moment from 'moment-timezone';

const CountdownCard = ({ name, workHours, endDate, characterFolder }) => {
  const [currentFrame, setCurrentFrame] = useState(0);
  const totalFrames = 6; // Adjust based on the number of frames

  const calculateTimeLeft = () => {
    const now = moment();
    const endOfWork = moment().set('hour', workHours.end).set('minute', 0).set('second', 0);
    const endOfInternship = moment(endDate);

    const hoursLeftToday = endOfWork.diff(now, 'hours');
    const daysLeft = endOfInternship.diff(now, 'days');

    return {
      hoursLeftToday: hoursLeftToday >= 0 ? hoursLeftToday : 0,
      daysLeft,
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
      setCurrentFrame((prevFrame) => (prevFrame + 1) % totalFrames);
    }, 1000); // Adjust the interval for smoother animation if needed

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative bg-gray-800 p-4 rounded-lg shadow-lg flex flex-col items-center justify-between h-[40vh] max-w-full">
      <div className="relative mb-4 w-full h-[60%] overflow-hidden">
        <img
          src={`/assets/${characterFolder}/${characterFolder}_${currentFrame}.png`}
          alt={name}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      <div className="w-full text-center">
        <h2 className="text-xl font-bold text-white">{name}</h2>
        <p className="text-lg text-white">Hours till off work: {timeLeft.hoursLeftToday}</p>
        <p className="text-lg text-white">Days till end of internship: {timeLeft.daysLeft}</p>
      </div>
    </div>
  );
};

export default CountdownCard;

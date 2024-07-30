import React, { useState, useEffect } from 'react';
import moment from 'moment';

const CountdownTimer = ({ workHours, endDate }) => {
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
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-4 animate-bounce">Motivation Countdown</h1>
      <p className="text-2xl">Hours till we get off work: {timeLeft.hoursLeftToday}</p>
      <p className="text-2xl">Days till we complete our internship: {timeLeft.daysLeft}</p>
    </div>
  );
};

export default CountdownTimer;

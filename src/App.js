import React, { useState, useEffect } from 'react';
import moment from 'moment-timezone';
import CountdownCard from './components/CountdownCard';

const App = () => {
  const endDate = '2024-12-31';
  const people = [
    { name: 'Jean', workHours: { start: 7.5, end: 16.5 }, characterFolder: 'pirate1' },
    { name: 'Alice', workHours: { start: 8, end: 17 }, characterFolder: 'pirate2' },
    { name: 'Bob', workHours: { start: 9, end: 18 }, characterFolder: 'pirate3' },
    { name: 'Charlie', workHours: { start: 10, end: 19 }, characterFolder: 'pirate4' },
    { name: 'Dave', workHours: { start: 11, end: 20 }, characterFolder: 'pirate5' },
    { name: 'Eve', workHours: { start: 12, end: 21 }, characterFolder: 'pirate6' },
    { name: 'Frank', workHours: { start: 13, end: 22 }, characterFolder: 'pirate7' },
  ];

  const calculateTimeDetails = () => {
    const now = moment().tz('Asia/Kuala_Lumpur');
    const endOfInternship = moment(endDate);

    const daysLeft = endOfInternship.diff(now, 'days');
    const weeksLeft = endOfInternship.diff(now, 'weeks');

    return {
      currentTime: now.format('YYYY-MM-DD HH:mm:ss'),
      daysLeft,
      weeksLeft,
      currentWeek: now.week(),
    };
  };

  const [timeDetails, setTimeDetails] = useState(calculateTimeDetails());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeDetails(calculateTimeDetails());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Left Side (30%) */}
      <div className="w-1/3 bg-gray-800 p-4 flex flex-col justify-center items-center overflow-hidden">
        <h2 className="text-2xl font-bold mb-4">Current Time (Malaysia)</h2>
        <p className="text-lg mb-4">{timeDetails.currentTime}</p>
        <h2 className="text-2xl font-bold mb-4">Days Until Internship Ends</h2>
        <p className="text-lg mb-4">{timeDetails.daysLeft} days</p>
        <h2 className="text-2xl font-bold mb-4">Weeks Remaining</h2>
        <p className="text-lg mb-4">
          Week {timeDetails.currentWeek} of {timeDetails.weeksLeft} weeks left
        </p>
      </div>

      {/* Right Side (70%) */}
      <div className="w-2/3 p-4 flex flex-wrap gap-4 justify-center items-start overflow-hidden">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full h-full">
          {people.map((person, index) => (
            <CountdownCard
              key={index}
              name={person.name}
              workHours={person.workHours}
              endDate={endDate}
              characterFolder={person.characterFolder}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;

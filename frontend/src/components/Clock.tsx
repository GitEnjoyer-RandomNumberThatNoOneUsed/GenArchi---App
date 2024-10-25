import React, { useState, useEffect } from "react";

const Clock: React.FC = () => {
  const [dateTime, setDateTime] = useState({
    time: new Date().toUTCString(),
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime({
        time: new Date().toUTCString(),
      });
    }, 1000);

    return () => clearInterval(interval); // Nettoyage de l'intervalle
  }, []);

  return (
    <div className="p-6 font-bold text-white bg-gray-800 rounded-md shadow-lg">
      <div>{dateTime.time}</div>
    </div>
  );
};

export default Clock;

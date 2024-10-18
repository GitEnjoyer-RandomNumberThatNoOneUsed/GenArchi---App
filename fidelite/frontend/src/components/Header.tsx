import { useState, useEffect } from "react";
import "../header.css";

interface Infos {
  commitSha: string;
  environment: string;
}

const Header = () => {
  const [currentTime, setCurrentTime] = useState<string>("");
  const [infos, setInfos] = useState<Infos | null>(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      const formattedTime = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
      setCurrentTime(formattedTime);
    }, 1000);

    fetch(`${process.env.BACKEND_FIDELITE}/sprint0/infos`)
      .then((response) => response.json())
      .then((data) => setInfos(data));

    return () => clearInterval(intervalId);
  }, []);

  const appName = "Fidelity";
  const deployDate = process.env.DEPLOY_DATE;

  return (
    <header className="app-header">
      <nav>
        <h1>{appName}</h1>
        <ul className="info-list">
          <li>Version : {infos?.commitSha}</li>
          <li>Current date and time : {currentTime}</li>
          <li>Environment : {infos?.environment}</li>
          <li>Deploy date : {deployDate}</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

import React, { useEffect, useState } from "react";

function ProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const moveProgress = () => {
      if (progress === 100) {
        setProgress(0);
        setProgress((prevProgress) => prevProgress + 1);
      } else if (progress < 100) {
        setProgress((prevProgress) => prevProgress + 1);
      }
    };
    let interval = setInterval(moveProgress, 500);
    return () => {
      clearInterval(interval);
    };
  });
  return (
    <div>
      <div className="progress fixed-top">
        <div
          className="progress-bar"
          role="progressbar"
          style={{ width: `${progress}%` }}
          aria-valuenow={progress}
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>
    </div>
  );
}

export default ProgressBar;

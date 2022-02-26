import React, { useEffect, useState } from "react";

function ProgressBar(props) {
  const { load, loader } = props.loading;
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
    let interval = setInterval(moveProgress, 50);
    return () => {
      clearInterval(interval);
    };
  });
  return (
    <div>
      {loader && (
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
      )}
      {load && (
        <div className="loader">
          <i className="fas fa-circle-notch fa-2x fa-spin" />
        </div>
      )}
    </div>
  );
}

export default ProgressBar;

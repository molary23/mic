import React from "react";

function AnnCard(props) {
  const { details } = props;
  console.log(details);
  return details.map((item, i) => {
    return (
      <div className="col-md-4 col-xs-12" key={i}>
        <div className="dash-ann ann-card dash-card">
          <div className="ann-title">
            <h4 className="mb-1">{item.title}</h4>
          </div>
          <div className="ann-content">Announcement Content {item.summary}</div>
          <div className="ann-link">
            <a
              href={item.summary}
              target="_blank"
              rel="noreferrer"
              className="btn default-btn"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  });
}

export default AnnCard;

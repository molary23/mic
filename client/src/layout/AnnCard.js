import React from "react";
import PropTypes from "prop-types";

import { HiOutlineSpeakerphone } from "react-icons/hi";

function AnnCard(props) {
  const { details } = props;
  return details.map((item, i) => {
    return (
      <div className="col-md-4 col-12" key={i}>
        <div className="dash-ann ann-card dash-card">
          <div className="ann-title">
            <span>
              <HiOutlineSpeakerphone />
            </span>
            <h4 className="mb-1">{item.title}</h4>
          </div>
          <div className="ann-content">{item.summary}</div>
          {item.link !== null && (
            <div className="ann-link">
              <a
                href={item.link}
                target="_blank"
                rel="noreferrer"
                className="btn default-btn"
              >
                Read More
              </a>
            </div>
          )}
        </div>
      </div>
    );
  });
}

AnnCard.propTypes = {
  details: PropTypes.array.isRequired,
};

export default AnnCard;

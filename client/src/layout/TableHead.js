import React from "react";
import PropTypes from "prop-types";

function TableHead(props) {
  const { head } = props;

  return (
    <div>
      <div className="table-responsive">
        <table className="mytable">
          <thead>
            <tr>
              {head.map((head, i) => {
                return <th key={i}>{head}</th>;
              })}
            </tr>
          </thead>
          {props.children}
        </table>
      </div>
    </div>
  );
}
TableHead.propTypes = {
  head: PropTypes.array.isRequired,
};
export default TableHead;

import React from 'react';
import PropTypes from 'prop-types';
import { JVFromToElement } from './JVFromTo.jsx';

const JVForm = ({
  jvStopValues,
  changeElement,
  addElement,
  removeElement,
  id,
  locked
}) => {
  return (
    <form className="">
      <fieldset disabled={locked}>
        <div className="row top-buffer">
          <div className="col-sm-1">
            <label>Starting voltage</label>
          </div>
          <div className="col-sm-1">
            <label>Ending voltage</label>
          </div>
          <div className="col-sm-1">
            <label>Scan rate</label>
          </div>
        </div>

        {jvStopValues.map((fromTo, index) => {
          return (
            <JVFromToElement
              key={index}
              id={index}
              fromV={fromTo.start}
              toV={fromTo.end}
              scanRate={fromTo.scanRate}
              addElement={() => addElement(index, id)}
              removeElement={() => removeElement(index, id)}
              onChange={e => {
                changeElement(index, e.target.name, e.target.value, id);
              }}
            />
          );
        })}
      </fieldset>
    </form>
  );
};

JVForm.propTypes = {
  jvStopValues: PropTypes.arrayOf(
    PropTypes.shape({
      start: PropTypes.number,
      end: PropTypes.number,
      scanRate: PropTypes.number
    }).isRequired
  ).isRequired,
  id: PropTypes.number.isRequired,
  changeElement: PropTypes.func.isRequired,
  removeElement: PropTypes.func.isRequired,
  addElement: PropTypes.func.isRequired
};

export default JVForm;

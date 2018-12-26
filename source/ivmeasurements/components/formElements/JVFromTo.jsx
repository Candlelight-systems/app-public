import React from 'react';
import PropTypes from 'prop-types';

export const JVFromToElement = ({
  onChange,
  id,
  fromV,
  toV,
  scanRate,
  addElement,
  removeElement
}) => (
  <div className="row margin-bottom-sm">
    <div className="col-sm-1">
      <div className="input-group">
        <input
          className="form-control"
          value={fromV}
          name="fromV"
          onChange={onChange}
        />
        <span className="input-group-addon"> V </span>
      </div>
    </div>
    <div className="col-sm-1">
      <div className="input-group">
        <input
          className="form-control"
          value={toV}
          name="toV"
          onChange={onChange}
        />
        <span className="input-group-addon"> V </span>
      </div>
    </div>
    <div className="col-sm-1">
      <div className="input-group">
        <input
          className="form-control"
          value={scanRate}
          name="scanRate"
          onChange={onChange}
        />
        <span className="input-group-addon"> V/s </span>
      </div>
    </div>
    <div className="col-sm-1">
      <div className="btn-group">
        <button className="btn btn-default" type="button" onClick={addElement}>
          +
        </button>
        {id > 0 ? (
          <button
            className="btn btn-default"
            type="button"
            onClick={removeElement}>
            -
          </button>
        ) : null}
      </div>
    </div>
  </div>
);

JVFromToElement.propTypes = {
  onChange: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  fromV: PropTypes.number.isRequired,
  toV: PropTypes.number.isRequired,
  scanRate: PropTypes.number.isRequired,
  addElement: PropTypes.func.isRequired,
  removeElement: PropTypes.func.isRequired
};

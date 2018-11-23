import React from 'react';
import PropTypes from 'prop-types';

const MPPTForm = ({
  duration,
  durationUnit,
  locked,
  stepSize,
  id,
  changeDuration,
  changeDurationUnit,
  changeStepSize
}) => {
  return (
    <form className="form-horizontal">
      <fieldset locked={locked.toString()}>
        <div className="form-group">
          <div className="col-sm-3">
            <label>Duration</label>
          </div>
          <div className="col-sm-9">
            <div className="input-group">
              <input
                name="duration"
                type="number"
                className="form-control"
                value={duration}
                onChange={e => changeDuration(e.target.value, id)}
              />

              <div className="input-group-btn">
                <button
                  type="button"
                  className="btn btn-default dropdown-toggle"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false">
                  {durationUnit == 1
                    ? 'Seconds'
                    : durationUnit == 60
                      ? 'Minutes'
                      : 'Hours'}{' '}
                  <span className="caret" />
                </button>
                <ul className="dropdown-menu dropdown-menu-right">
                  <li
                    value="1"
                    onClick={e => {
                      changeDurationUnit(1, id);
                    }}>
                    <a href="#">Seconds</a>
                  </li>
                  <li
                    value="60"
                    onClick={e => {
                      changeDurationUnit(60, id);
                    }}>
                    <a href="#">Minutes</a>
                  </li>
                  <li
                    value="3600"
                    onClick={e => {
                      changeDurationUnit(3600, id);
                    }}>
                    <a href="#">Hours</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="form-group">
          <div className="col-sm-3">
            <label>Step size</label>
          </div>
          <div className="col-sm-9">
            <select
              name="durationUnit"
              className="form-control"
              value={stepSize}
              onChange={e => changeStepSize(e.target.value, id)}>
              <option value="1">1 mV</option>
              <option value="2">2 mV</option>
              <option value="3">3 mV</option>
            </select>
          </div>
        </div>
      </fieldset>
    </form>
  );
};

MPPTForm.propTypes = {
  duration: PropTypes.number.isRequired,
  durationUnit: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  stepSize: PropTypes.number.isRequired,
  changeDuration: PropTypes.func.isRequired,
  changeDurationUnit: PropTypes.func.isRequired,
  changeStepSize: PropTypes.func.isRequired
};

export default MPPTForm;

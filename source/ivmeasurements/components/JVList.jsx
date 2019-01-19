import React from 'react';
import PropTypes from 'prop-types';

const JVList = ({ jvList, jvEnabled, toggleJV }) => (
  <div>
    <div className="row">
      <div className="form-horizontal">
        <div className="form-group">
          <label className="col-sm-1 control-label">J(V) sections:</label>
          <div className="col-sm-7">
            <div className="btn-group">
              {jvList.map((jv, index) => (
                <button
                  key={index}
                  type="button"
                  className={
                    'btn ' +
                    (jvEnabled.indexOf(index) > -1
                      ? ' btn-primary'
                      : ' btn-default')
                  }
                  onClick={() => toggleJV(index)}>
                  {jv.start}V{' '}
                  <span className="glyphicon glyphicon-arrow-right" /> {jv.end}V
                  @ {jv.scanRate}
                  V/s
                </button>
              ))}

              <button
                type="button"
                className={'btn  btn-default'}
                onClick={() => {
                  jvList.map((jv, index) => toggleJV(index, true));
                }}>
                All
              </button>
              <button
                type="button"
                className={'btn btn-default'}
                onClick={() => {
                  jvList.map((jv, index) => toggleJV(index, false));
                }}>
                None
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

JVList.propTypes = {
  jvList: PropTypes.arrayOf(
    PropTypes.shape({
      start: PropTypes.number.isRequired,
      end: PropTypes.number.isRequired,
      scanRate: PropTypes.number.isRequired
    })
  ),
  jvEnabled: PropTypes.arrayOf(PropTypes.number).isRequired,
  toggleJV: PropTypes.func.isRequired
};

export default JVList;

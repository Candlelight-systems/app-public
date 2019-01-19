import React from 'react';
import PropTypes from 'prop-types';
import measurementActions from '../measurementActions';

export const Queue = ({
  queueElements,
  selectedElement,
  runningElement,
  selectElement,
  removeElement,
  removeElementConfirm,
  addElement,
  changeAddElementType,
  upElement,
  downElement,
  sunIntensity,
  changeSunIntensity,
  locked
}) => {
  //let this = this;

  return (
    <div className="">
      <h4>Measurement queue</h4>
      <ul className="list-group">
        {queueElements.map((element, index) => (
          <li
            onClick={() => selectElement(index)}
            className={
              'list-group-item ' + (selectedElement == index ? 'active' : '')
            }
            key={index}>
            {index + 1}. {element.name}
            {locked && runningElement == index ? (
              <div className="pull-right">( Running... )</div>
            ) : null}
            {!locked && (
              <div className="pull-right btn-group">
                <button
                  className="btn btn-xs btn-default"
                  disabled={index == 0}
                  onClick={() => upElement(index)}>
                  <span className="glyphicon glyphicon-arrow-up" />
                </button>
                <button
                  className="btn btn-xs btn-default"
                  disabled={index == queueElements.length - 1}
                  onClick={() => downElement(index)}>
                  <span className="glyphicon glyphicon-arrow-down" />
                </button>

                {element.removableSafe ? (
                  <button
                    className="btn btn-xs btn-primary"
                    onClick={removeElementConfirm}>
                    Confirm deletion
                  </button>
                ) : (
                  <button
                    className="btn btn-xs btn-danger"
                    onClick={removeElement}>
                    <span className="glyphicon glyphicon-remove" />
                  </button>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
      {!locked ? (
        <div>
          <div className="">
            Add an action:
            <div className="input-group">
              <select className="form-control" onChange={changeAddElementType}>
                <option value="null">Select an action</option>
                {measurementActions.map(action => (
                  <option key={action.type} value={action.type}>
                    {action.name}
                  </option>
                ))}
              </select>
              <span className="input-group-btn">
                <button className="btn btn-primary" onClick={addElement}>
                  + Add
                </button>
              </span>
            </div>
          </div>
          <div className="">
            Sun intensity:
            <div className="input-group">
              <input
                type="number"
                value={sunIntensity}
                className="form-control"
                onChange={changeSunIntensity}
              />
              <span className="input-group-addon">
                {' '}
                mW cm
                <sup>-2</sup>
              </span>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

Queue.propTypes = {
  queueElements: PropTypes.arrayOf(
    PropTypes.shape({ name: PropTypes.string.isRequired })
  ),
  selectedElement: PropTypes.number,
  selectElement: PropTypes.func.isRequired,
  removeElement: PropTypes.func.isRequired,
  removeElementConfirm: PropTypes.func.isRequired,
  addElement: PropTypes.func.isRequired,
  changeAddElementType: PropTypes.func.isRequired,
  upElement: PropTypes.func.isRequired,
  downElement: PropTypes.func.isRequired,
  changeSunIntensity: PropTypes.func.isRequired,
  sunIntensity: PropTypes.number.isRequired
};

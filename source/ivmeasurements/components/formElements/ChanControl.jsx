import React from 'react';
import PropTypes from 'prop-types';

const ChannelControl = ({
  channels,
  changeChannel,
  param1Name = 'Param 1',
  param2Name = 'Param 2',
  changeParam1Name,
  changeParam2Name,
  buttonView,
  viewState,
  toggleViewState
}) => {
  console.log(channels);
  return (
    <div>
      {buttonView && (
        <button className="btn btn-default" onClick={toggleViewState}>
          {viewState
            ? 'Hide channel configuration'
            : 'View channel configuration'}
        </button>
      )}

      <form className={'form' + (viewState ? ' visible' : ' hidden')}>
        <div className="form-group">
          <div className="col-sm-3">
            <div className="form-group">
              <label>Parameter 1</label>
              <input
                className="form-control"
                value={param1Name}
                onChange={changeParam1Name}
              />
            </div>

            <div className="form-group">
              <label>Parameter 2</label>
              <input
                className="form-control"
                value={param2Name}
                onChange={changeParam2Name}
              />
            </div>
          </div>
          <div className="col-sm-9">
            <table>
              <tbody>
                <tr>
                  <th>&nbsp;</th>
                  <th>Sample name</th>
                  <th>Sample ID</th>
                  <th>
                    Active area (cm
                    <sup>2</sup>)
                  </th>
                  <th>{param1Name || 'Parameter 1'}</th>
                  <th>{param2Name || 'Parameter 2'}</th>
                </tr>
                {channels.map(chan => (
                  <tr key={chan.chanId}>
                    <td>
                      <div>
                        <input
                          type="checkbox"
                          checked={chan.active}
                          value=""
                          onChange={e =>
                            changeChannel(
                              chan.chanId,
                              'active',
                              e.target.checked
                            )
                          }
                        />
                      </div>
                    </td>
                    <td>
                      <input
                        className="form-control"
                        type="text"
                        onChange={e =>
                          changeChannel(chan.chanId, 'name', e.target.value)
                        }
                        value={chan.name}
                      />
                    </td>
                    <td>
                      <input
                        className="form-control"
                        type="text"
                        onChange={e =>
                          changeChannel(chan.chanId, 'id', e.target.value)
                        }
                        value={chan.id}
                      />
                    </td>
                    <td>
                      <div className="input-group">
                        <input
                          type="number"
                          className="form-control"
                          onChange={e =>
                            changeChannel(
                              chan.chanId,
                              'area',
                              parseFloat(e.target.value)
                            )
                          }
                          value={chan.area}
                        />
                        <span className="input-group-addon">
                          cm
                          <sup>2</sup>
                        </span>
                      </div>
                    </td>
                    <td>
                      <input
                        className="form-control"
                        type="text"
                        onChange={e =>
                          changeChannel(chan.chanId, 'param1', e.target.value)
                        }
                        value={chan.param1}
                      />
                    </td>
                    <td>
                      <input
                        className="form-control"
                        type="text"
                        onChange={e =>
                          changeChannel(chan.chanId, 'param2', e.target.value)
                        }
                        value={chan.param2}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </form>
    </div>
  );
};

ChannelControl.propTypes = {
  channels: PropTypes.array.isRequired,

  changeChannel: PropTypes.func.isRequired,

  param1Name: PropTypes.string,
  param2Name: PropTypes.string
};

export default ChannelControl;

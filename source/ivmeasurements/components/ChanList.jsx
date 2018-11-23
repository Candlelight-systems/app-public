import React from 'react';
import PropTypes from 'prop-types';

//import allChannels from '../channelsAvailable';

const ChanList = ({
  channels,
  channelsView,
  toggleChannel,
  toggleAllChannel,
  toggleNoChannel
}) => (
  <div>
    <div className="row">
      <div className="form-horizontal">
        <div className="form-group">
          <label className="col-sm-1 control-label">Available channels:</label>
          <div className="col-sm-7">
            <div className="btn-group">
              {channels.filter(chan => chan.active).map(chan => (
                <button
                  key={chan.chanId}
                  type="button"
                  className={
                    'btn ' +
                    (channelsView.filter(c => c == chan.chanId).length > 0
                      ? ' btn-primary'
                      : ' btn-default')
                  }
                  onClick={() => toggleChannel(chan.chanId)}>
                  {chan.chanId}
                </button>
              ))}

              <button
                type="button"
                className="btn btn-success"
                onClick={() => toggleAllChannel(channels)}>
                All
              </button>
              <button
                type="button"
                className="btn btn-success"
                onClick={() => toggleNoChannel(channels)}>
                None
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

ChanList.propTypes = {
  channels: PropTypes.arrayOf(
    PropTypes.shape({ chanId: PropTypes.number.isRequired })
  ).isRequired,
  toggleChannel: PropTypes.func.isRequired,
  toggleAllChannel: PropTypes.func.isRequired,
  toggleNoChannel: PropTypes.func.isRequired
};

export default ChanList;

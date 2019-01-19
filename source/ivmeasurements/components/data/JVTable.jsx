import React from 'react';
import PropTypes from 'prop-types';
import JVChannelTableWrapper from './JVChannelTableWrapper.js';

class JVTable extends React.PureComponent {
  render() {
    const { channels, channelsConfig, jvs, exportToXLS } = this.props;
    console.log('redoing table');
    return (
      <div>
        <button className="btn btn-default" onClick={exportToXLS}>
          Export to Excel
        </button>
        {channels.map(chan => (
          <JVChannelTableWrapper
            key={chan}
            jvs={jvs}
            chanId={chan}
            config={channelsConfig.filter(c => c.chanId == chan)[0]}
          />
        ))}
      </div>
    );
  }
}

JVTable.propTypes = {
  channelsConfig: PropTypes.arrayOf(
    PropTypes.shape({ chanId: PropTypes.number.isRequired })
  ),
  channels: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  jvs: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired
};

export default JVTable;

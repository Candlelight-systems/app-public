import { connect } from 'react-redux';
import ChanList from './ChanList.jsx';
import { ChannelsToggleViewData } from '../actions/Channels';
import allChannels from '../channelsAvailable';

const mapStateToProps = state => {
  return {
    channels: state.channels,
    channelsView: state.viewData.channels
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleChannel: chanId => {
      dispatch(ChannelsToggleViewData(chanId));
    },

    toggleAllChannel: channels => {
      channels.map(channel => {
        dispatch(ChannelsToggleViewData(channel.chanId, true));
      });
    },

    toggleNoChannel: channels => {
      channels.map(channel => {
        dispatch(ChannelsToggleViewData(channel.chanId, false));
      });
    }
  };
};

const ChanListWrapper = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChanList);

export default ChanListWrapper;

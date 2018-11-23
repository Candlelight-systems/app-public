import { connect } from 'react-redux';
import {
  ChannelsChangeChan,
  ChannelsToggleViewConfig
} from '../actions/Channels';
import { ChangeParamName } from '../actions/general';
import ChanControl from './formElements/ChanControl.jsx';
import allChannels from '../channelsAvailable';

const mapDispatchToProps = dispatch => {
  return {
    changeChannel: (chanId, field, value) => {
      dispatch(ChannelsChangeChan(chanId, field, value));
    },

    toggleViewState: () => {
      dispatch(ChannelsToggleViewConfig());
    },

    changeParam1Name: e => {
      dispatch(ChangeParamName(1, e.target.value));
    },

    changeParam2Name: e => {
      dispatch(ChangeParamName(2, e.target.value));
    }
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    channelsAvailable: allChannels,
    channels: state.channels,
    param1Name: state.appState.param1Name,
    param2Name: state.appState.param2Name,
    buttonView: ownProps.buttonView,
    viewState: state.appState.channelsView
  };
};

const ChanControlWrapper = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChanControl);

export default ChanControlWrapper;

export function ivReceived(queueId, chanId, data) {
  if (data.chanId) {
    data.chanId = parseInt(data.chanId);
  } else {
    data.chanId = chanId;
  }
  return {
    type: 'DATA_IV_RECEIVED',
    queueId: queueId,
    channelId: chanId,
    data: data
  };
}

export function mppReceived(queueId, chanId, data) {
  if (data.chanId) {
    data.chanId = parseInt(data.chanId);
  } else {
    data.chanId = chanId;
  }
  return {
    type: 'DATA_MPP_RECEIVED',
    queueId: queueId,
    channelId: chanId,
    data: data
  };
}

export function emptyData() {
  return {
    type: 'EMPTY_DATA'
  };
}

import urllib from 'url-lib';

const buildURL = urlProps => {
  return `http://${urlProps.trackerHost}:${urlProps.trackerPort}/`;
};

const fetchGET = url => {
  return fetch(url, {
    method: 'GET'
  });
};

const fetchGETJson = url => {
  return fetchGET(url).then(response => response.json());
};

const fetchPOST = (url, bodyObject) => {
  const bodyJSON = JSON.stringify(bodyObject);
  const headers = new Headers({
    'Content-Type': 'application/json',
    'Content-Length': bodyJSON.length.toString()
  });

  fetch(url, {
    headers: headers,
    method: 'POST',
    body: bodyJSON
  });
};

export const autoZero = (urlProps, instrumentId, chanId) => {
  return fetchGET(
    urllib.formatUrl(`${buildURL(urlProps)}instrument.autoZero`, {
      instrumentId: instrumentId,
      channelId: chanId
    })
  );
};

export const autoZeroMaster = (urlProps, instrumentId, chanId) => {
  return fetchGET(
    urllib.formatUrl(`${buildURL(urlProps)}instrument.autoZeroMaster`, {
      instrumentId: instrumentId,
      channelId: chanId
    })
  );
};

export const getChannelStatus = (urlProps, instrumentId, chanId) => {
  return fetchGETJson(
    urllib.formatUrl(`${buildURL(urlProps)}getStatus`, {
      instrumentId: instrumentId,
      chanId: chanId
    })
  );
};

export const saveChannelStatus = (urlProps, newStatus) => {
  return fetchPOST(`${buildURL(urlProps)}setStatus`, newStatus);
};

export const saveChannelStatuses = (urlProps, newStatuses) => {
  return fetchPOST(`${buildURL(urlProps)}setStatuses`, newStatuses);
};

export const resetChannelStatus = (urlProps, instrumentId, chanId) => {
  return fetchGET(
    urllib.formatUrl(`${buildURL(urlProps)}resetStatus`, {
      instrumentId: instrumentId,
      chanId: chanId
    })
  );
};

export const channelExecuteIV = (urlProps, instrumentId, chanId) => {
  return fetchGET(
    urllib.formatUrl(`${buildURL(urlProps)}executeIV`, {
      instrumentId: instrumentId,
      chanId: chanId
    })
  );
};

export const channelExecuteVoc = (urlProps, instrumentId, chanId) => {
  return fetchGET(
    urllib.formatUrl(`${buildURL(urlProps)}recordVoc`, {
      instrumentId: instrumentId,
      chanId: chanId
    })
  );
};

export const channelExecuteJsc = (urlProps, instrumentId, chanId) => {
  return fetchGET(
    urllib.formatUrl(`${buildURL(urlProps)}recordJsc`, {
      instrumentId: instrumentId,
      chanId: chanId
    })
  );
};

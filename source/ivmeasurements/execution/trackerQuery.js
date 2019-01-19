import qs from 'qs';

const httpquery = (tracker, instrumentId, path, queryParams, stopPromise) => {
  const abortController = new AbortController();

  if (stopPromise) {
    stopPromise.then(() => {
      abortController.abort();
    });
  }
  const req = new Request(
    'http://' +
      tracker.trackerHost +
      ':' +
      tracker.trackerPort +
      '/' +
      path +
      '?' +
      qs.stringify(
        Object.assign({}, { instrumentId: instrumentId }, queryParams)
      )
  );
  return fetch(req, { method: 'GET', signal: abortController.signal });
};

const httppost = (tracker, instrumentId, path, queryParams, stopPromise) => {
  const abortController = new AbortController();

  if (stopPromise) {
    stopPromise.then(() => {
      abortController.abort();
    });
  }
  const bodyJSON = JSON.stringify(
    Object.assign({}, queryParams, { instrumentId: instrumentId })
  );

  const headers = new Headers({
    'Content-Type': 'application/json',
    'Content-Length': bodyJSON.length.toString()
  });
  const req = new Request(
    'http://' + tracker.trackerHost + ':' + tracker.trackerPort + '/' + path
  );
  return fetch(req, {
    headers: headers,
    method: 'POST',
    body: bodyJSON,
    signal: abortController.signal
  });
};

const queryJSON = (...args) => {
  return httpquery(...args).then(file => file.json());
};

const queryJson = queryJSON;

export { httpquery, httppost, queryJSON, queryJson };
export default httpquery;

const delay = (timeout, stopPromise) => {
  return new Promise((resolver, rejecter) => {
    const t = setTimeout(resolver, timeout);

    if (stopPromise) {
      stopPromise.then(() => {
        clearTimeout(t);
        rejecter();
      });
    }
  });
};

export { delay };
export default delay;

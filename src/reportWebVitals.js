const reportWebVitals = async (onPerfEntry) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    const {
      getCLS,
      getFID,
      getFCP,
      getLCP,
      getTTFB,
      // Rule disabled here as we this to be a dynamic import
      // only on function call
      // eslint-disable-next-line global-require
    } = await require("web-vitals");

    getCLS(onPerfEntry);
    getFID(onPerfEntry);
    getFCP(onPerfEntry);
    getLCP(onPerfEntry);
    getTTFB(onPerfEntry);
  }
};

export default reportWebVitals;

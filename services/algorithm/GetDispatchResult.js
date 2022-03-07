const GetDispatchResult = (L3) => {
  if (L3.length == 0) {
    return -1;
  }
  const opt = L3.sort(function (a, b) {
    return b.prevArrivalTime - a.prevArrivalTime;
  });

  return opt;
};

module.exports = GetDispatchResult;

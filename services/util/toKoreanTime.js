const ToKoreanTime = (time) => {
  return new Date(
    time.getTime() - time.getTimezoneOffset() * 60000
  ).toISOString();
};

module.exports = ToKoreanTime;

const GetResult = (L3, cArr) => {
  if (L3.length == 0) {
    return -1;
  }
  const filteredArr = cArr.filter((id) => id == L3.id);
  const opt = filteredArr.sort(function (a, b) {
    return a.c - b.c;
  });
  return opt;
};

module.exports = GetResult();

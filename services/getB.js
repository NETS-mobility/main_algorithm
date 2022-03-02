const GetB = (hosTime, a) => {
  const resDate = new Date(hosTime);
  b = new Date(resDate - a);
  return b;
};

module.exports = GetB;

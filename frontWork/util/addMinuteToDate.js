const AddMinuteToDate = (dt, minute) => {
  return new Date(dt.getTime() + minute * 60000);
};

export default AddMinuteToDate;

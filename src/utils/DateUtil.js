import moment from "moment";

export const formatStringToDate = (string) => {
  let dateObj = "";
  if (string !== "") {
    dateObj = moment(string).format("DD-MM-yyyy");
  } else {
  }
  return dateObj;
};

export const formatStringToTime = (string) => {
  let dateObj = "";
  if (string !== "") {
    dateObj = moment(string).format("HH:mm:ss");
  }
  return dateObj;
};

export const dateCurrent = () => {
  let date = new Date();
  let dateObj = moment(date).format("DD-MM-yyyy");
  return dateObj;
};

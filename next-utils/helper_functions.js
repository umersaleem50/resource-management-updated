const { Typography } = require("@mui/material");

export const generateDateFromString = (date) => {
  const custom_date = new Intl.DateTimeFormat(navigator.language, {
    dateStyle: "medium",
    timeStyle: "medium",
  }).format(new Date(date));
  return custom_date;
  // return new Date(date).toLocaleString();
};

export const showSnackBar = (enqueueSnackbar, message, variant = "success") => {
  return enqueueSnackbar(<Typography>{message}</Typography>, {
    variant,
  });
};

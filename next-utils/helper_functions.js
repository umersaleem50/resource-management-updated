export const generateDateFromString = (date) => {
  const custom_date = new Intl.DateTimeFormat(navigator.language, {
    dateStyle: "medium",
    timeStyle: "medium",
  }).format(new Date(date));
  return custom_date;
  // return new Date(date).toLocaleString();
};



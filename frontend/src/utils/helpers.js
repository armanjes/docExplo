export const formatTime = (time24) => {
  const [hourStr, min] = time24.split(":");
  let hour = parseInt(hourStr, 10);
  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12; // convert 0 => 12, 13 => 1, etc.
  return `${hour}:${min} ${ampm}`;
};

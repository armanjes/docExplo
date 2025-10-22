export const formatTime = (time24) => {
  const [hourStr, min] = time24.split(":");
  let hour = parseInt(hourStr, 10);
  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12;
  return `${hour}:${min} ${ampm}`;
};

export const capitalize = (name) => {
  const words = name.split(" ");
  const capitalizeWord = words.map(
    (w) => w.charAt(0).toUpperCase() + w.slice(1)
  );
  return capitalizeWord.join(" ");
}
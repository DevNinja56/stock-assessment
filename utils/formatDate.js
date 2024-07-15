export default function formatDate(dateStr) {
  // Parse the date string into a Date object
  const date = new Date(dateStr);

  // Define arrays for month names and day suffixes
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const getDaySuffix = (day) => {
    if ((day >= 4 && day <= 20) || day % 10 === 0) {
      return "th";
    }
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  // Extract day, month, and year from the Date object
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  // Format the date with suffix
  const dayWithSuffix = day + getDaySuffix(day);
  const formattedDate = `${dayWithSuffix} ${month}, ${year}`;

  return formattedDate;
}

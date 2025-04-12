/**
 * Add a '0' in fornt of single digit integer
 * @param {Integer} number
 * @returns
 */
const addLeadingZero = (number) => {
  return number < 10 ? `0${number}` : `${number}`;
};

/**
 * Function to split salary range string into min and max values. E.g. "$5000-$6000" to [5000, 6000]
 * @param {String} salaryRange
 * @returns Processed array containing min and max values
 */
const extractSalaryRange = (salaryRange) => {
  if (!salaryRange) return [0, Infinity];

  const salaryNumbers = salaryRange.replace(/[$,]/g, "").split("-");

  if (!salaryNumbers || salaryNumbers.length < 2) return [0, Infinity];

  const minSalary = parseInt(salaryNumbers[0], 10);
  const maxSalary = parseInt(salaryNumbers[1], 10);

  return [minSalary, maxSalary];
};

/**
 * Regex function to remove last forward slash & everything before
 * @param {String} inputString
 * @returns Processed string
 */
const removeSlashAndPrefix = (inputString) => {
  return inputString.replace(/.*\//, "");
};

/**
 * Calculate interval between a given date and current date
 * @param {String} date
 * @param {Function} intervalToDuration
 * @returns Calculated date string
 */
const renderIntervalDuration = (date, intervalToDuration) => {
  const duration = intervalToDuration({
    start: new Date(date),
    end: new Date(),
  });

  const years = !duration.years
    ? ""
    : duration.years > 1
    ? `${duration.years} years`
    : `${duration.years} year`;

  const months = !duration.months
    ? ""
    : duration.months > 1
    ? `${duration.months} months`
    : `${duration.months} month`;

  const days = !duration.days
    ? "less than a day"
    : duration.days > 1
    ? `${duration.days} days`
    : `${duration.days} day`;

  return `${years} ${months} ${days}`;
};

export {
  addLeadingZero,
  extractSalaryRange,
  removeSlashAndPrefix,
  renderIntervalDuration,
};

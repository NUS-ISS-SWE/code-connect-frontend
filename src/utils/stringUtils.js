/**
 * Add a '0' in fornt of single digit integer
 * @param {Integer} number
 * @returns 
 */
const addLeadingZero = (number) => {
  return number < 10 ? `0${number}` : `${number}`;
};

/**
 * Regex function to remove last forward slash & everything before
 * @param {String} inputString
 * @returns Processed string
 */
const removeSlashAndPrefix = (inputString) => {
  return inputString.replace(/.*\//, "");
};

export { addLeadingZero, removeSlashAndPrefix };

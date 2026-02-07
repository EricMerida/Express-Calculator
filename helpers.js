/**
 * Build a frequency counter object from an array
 * @param {Array} arr any array
 */
function createFrequencyCounter(arr) {
  return arr.reduce(function(acc, next) {
    acc[next] = (acc[next] || 0) + 1;
    return acc;
  }, {});
}

/**
 * Find the most common element in the array
 * @param {Array} arr any array
 */
function findMode(arr) {
  let freqCounter = createFrequencyCounter(arr);

  let count = 0;
  let mostFrequent;

  for (let key in freqCounter) {
    if (freqCounter[key] > count) {
      mostFrequent = key;
      count = freqCounter[key];
    }
  }

  return +mostFrequent;
}

/**
 * Attempt to convert an array of strings to an array of numbers
 * @param {Array} numsAsStrings array of strings
 * @returns {Array|Error} an array or an error object
 */
function convertAndValidateNumsArray(numsAsStrings) {
  let result = [];

  for (let i = 0; i < numsAsStrings.length; i++) {
    let valToNumber = Number(numsAsStrings[i]);

    if (Number.isNaN(valToNumber)) {
      return new Error(`${numsAsStrings[i]} is not a number.`);
    }

    result.push(valToNumber);
  }
  return result;
}

function findMedian(nums) {
  const sorted = [...nums].sort((a, b) => a - b);

  let middleIndex = Math.floor(sorted.length / 2);

  if (sorted.length % 2 === 0) {
    return (sorted[middleIndex] + sorted[middleIndex - 1]) / 2;
  }
  return sorted[middleIndex];
}

function findMean(nums) {
  if (nums.length === 0) return 0;
  return nums.reduce((acc, cur) => acc + cur, 0) / nums.length;
}

module.exports = {
  createFrequencyCounter,
  findMean,
  findMedian,
  findMode,
  convertAndValidateNumsArray
};

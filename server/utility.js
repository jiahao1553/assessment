const axios = require("axios");
const { typeDescription } = require('./mapping')

const getRandomCoffeeImage = async () => {
  const imageRes = await axios("https://coffee.alexflipnote.dev/random.json");
  const imageData = await imageRes.data;
  return imageData.file;
};

const validateDrink = (input) => {
  if (
    input &&
    Object.keys(input).length === 0 &&
    Object.getPrototypeOf(input) === Object.prototype &&
    ((input.title && input.title === "") || (input.name && input.name === ""))
  )
    return false;
  // add other criterias below

  return true;
};

const roundDecimal = (input, decimalPlaces) => {
  if (decimalPlaces === undefined) decimalPlaces = 3;
  if (decimalPlaces === 0) return Math.round(input);
  return Math.round((input + Number.EPSILON) * Math.pow(10, decimalPlaces)) / Math.pow(10, decimalPlaces);
};

const generateRandomPrice = (min = 0, max = 20) => {
  return Math.random() * (max - min) + min;
};

const getTypeDescriptionByName = (name) => {
  const regex = /ale|porter|stout|brown ale|pale ale|ipa/gi;
  const match = regex.exec(name);
  return match ? typeDescription[match[0].toLowerCase()] : null;
};

const generateRandomAlphaNumeric = (length) => {
  return Math.random().toString(36).slice(2).substring(0, length).toUpperCase()
}

module.exports = { getRandomCoffeeImage, validateDrink, roundDecimal, generateRandomPrice, getTypeDescriptionByName, generateRandomAlphaNumeric }
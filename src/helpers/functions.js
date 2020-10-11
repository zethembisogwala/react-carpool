export const capitalize = (word) => {
  return word[0].toUpperCase() + word.substring(1, word.length);
};

export const objectToList = (object) => {
  return Object.keys(object).map((key) => {
    return {
      id: key,
      ...object[key],
    };
  });
};

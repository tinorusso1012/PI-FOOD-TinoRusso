export function validateArray(word, arr) {
  let errorsArr = {};
  if (word === "" || word === " ") {
    errorsArr.diets = "You cant put a empty Diet";
  }
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].name.toLowerCase() === word.toLowerCase()) {
      errorsArr.diets = "This Diet already exists";
    }
  }
  return errorsArr;
}

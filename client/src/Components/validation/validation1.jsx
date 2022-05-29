export function validate(input) {
  let errors = {};
  if (!input.title) {
    errors.title = "Username is required";
  } else if (input.title[0] === input.title[0].toUpperCase()) {
    errors.username = "Username is invalid";
  }
  if (!input.summary) {
    errors.summary = "summary is required";
  }
  if (input.spoonacularScore === 0) {
    errors.spoonacularScore = "Score is required";
  } else if (input.spoonacularScore > 100 || input.spoonacularScore < 1) {
    errors.spoonacularScore = "Score is invalid";
  }
  if (input.HealthScore === 0) {
    errors.HealthScore = "HealthScore is required";
  } else if (input.HealthScore > 100 || input.HealthScore < 1) {
    errors.HealthScore = "HealthScore is invalid";
  }
  if (
    input.image &&
    !/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(
      input.image
    )
  ) {
    errors.image = "Required a Link ";
  }

  return errors;
}

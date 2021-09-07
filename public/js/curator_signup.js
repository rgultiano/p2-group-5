const signupFormHandler = async (event) => {
  // Stop the browser from submitting the form so we can do so with JavaScript
  event.preventDefault();

      document.location.replace("/curator/onboard");
};

document
  .querySelector(".signup-form")
  .addEventListener("submit", signupFormHandler);

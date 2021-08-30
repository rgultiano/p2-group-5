const loginFormHandler = async (event) => {
    // Stop the browser from submitting the form so we can do so with JavaScript
    event.preventDefault();
  
    // Gather the data from the form elements on the page
    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#password').value.trim();
  
    if (email && password) {
      // Send the e-mail and password to the server
      const response = await fetch('/api/users/auth', {
        method: 'POST',
        body: JSON.stringify({ email, password, type: "email"}),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        if(response.status == 401){
            const {message} = await response.json();
            // make the password border red
            document.querySelector('#password').classList.add("border-red-500")

            // display the error message
            document.querySelector('.login-error-message').innerText = message;
        } else {
            // display the error message
            document.querySelector('.login-error-message').innerText = "Unexpected error! Please try again later.";
        }

      }
    }
  };
  
  document
    .querySelector('.login-form')
    .addEventListener('submit', loginFormHandler);
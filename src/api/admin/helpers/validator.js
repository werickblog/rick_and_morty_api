// Email validation
export const validateEmail = email => {
  let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (mailformat.test(email)) {
    return {
      correct: true,
      message: "Valid email provided"
    };
  } else {
    return {
      corect: false,
      message: "Please provide a valid email"
    };
  }
};

// Password validation
export const validatePassword = password => {
  const regularExpression = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;

  if (password.length < 6 || password.length > 12) {
    return {
      correct: false,
      message:
        "Ensure password is either less that 6 characters or more than 12"
    };
  }
  /* istanbul ignore next */ 
  else if (!regularExpression.test(password)) {
    /* istanbul ignore next */
    return {
      correct: false,
      message: "Password should contain at lease one number & special character"
    };
  } else {
    return {
      correct: true,
      message: "Valid password provided"
    };
  }
};

// Name validation
export const validateName = name => {
  const strippedName = name.replace(/\s/g, "");

  if (strippedName.length < 3) {
    return {
      correct: false,
      message: "That name is pretty short"
    };
  } else {
    return {
      correct: true,
      message: "Valid name provided"
    };
  }
};

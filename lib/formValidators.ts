type Validator = (value: string) => string | undefined;

const ValidatePasswordLogin: Validator = (password) => {
  let error;

  if (!password) {
    error = 'Vyplňte vaše heslo';
  }

  return error;
};

const ValidatePasswordSignUp: Validator = (password) => {
  let error;

  if (!password) {
    error = 'Vyplňte vaše heslo';
  } else if (password.length < 6) {
    error = 'Heslo musí mít alespoň 6 znaků';
  }

  return error;
};

const ValidateEmail: Validator = (email) => {
  let error;

  if (!email) {
    error = 'Vyplňte váš email';
  } else if (!/^\S+@\S+\.\S+$/.test(email)) {
    error = 'Emailová adresa je v chybném formátu';
  }

  return error;
};

export { ValidatePasswordLogin, ValidatePasswordSignUp, ValidateEmail };
export type { Validator };

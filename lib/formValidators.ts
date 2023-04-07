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

const ValidateProfileBio: Validator = (bio) => {
  let error;

  if (!bio) {
    error = 'Bio nemůže být prázdné';
  }

  return error;
};

const ValidateProfilePic: Validator = (pic) => {
  let error;

  if (!pic) {
    error = 'Vyberte profilový obrázek';
  }

  return error;
};

const ValidateProfileUsername: Validator = (userName) => {
  let error;

  if (!userName) {
    error = 'Vyplňte prosím uživatelksé jméno';
  }

  return error;
};

const ValidateSearch: Validator = (search) => {
  let error;

  if (!search) {
    error = 'Zadejte klíčová slova pro vyhledání';
  }

  return error;
};

const ValidateMessage: Validator = (message) => {
  let error;

  if (!message) {
    error = 'Zpráva nemůže být prázdná';
  }

  return error;
};

const ValidateStars: Validator = (stars) => {
  let error;

  if (!stars || Number(stars) < 1 || Number(stars) > 5) {
    error = 'Vyberte počet hvězd';
  }

  return error;
};

export {
  ValidatePasswordLogin,
  ValidatePasswordSignUp,
  ValidateEmail,
  ValidateProfileBio,
  ValidateProfilePic,
  ValidateProfileUsername,
  ValidateSearch,
  ValidateMessage,
  ValidateStars,
};
export type { Validator };

export const validateUsername = (str: string) => {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/;
  if (!str.match(regex) || str === "") return false;
  return true;
};

export const validatePassword = (str: string) => {
  if (str.length < 6 || str === "") return false;
  return true;
};

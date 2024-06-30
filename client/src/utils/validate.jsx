const checkValidateData = (email, password, fullName) => {
  if (fullName !== null && fullName.trim() === "")
    return "Full Name is required";
  const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(
    email
  );
  const isPasswordValid =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);

  if (!isEmailValid) return "Email ID is not valid";
  if (!isPasswordValid) return "Password is not valid";

  if (isEmailValid && isPasswordValid) {
    return null;
  }
};
export default checkValidateData;

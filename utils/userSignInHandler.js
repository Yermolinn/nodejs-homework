exports.userSignInHandler = (obj) => {
  let { email, subscription, token } = obj;

  email = email.toString();
  subscription = subscription.toString();
  token = token.toString();

  return {
    user: {
      email,
      subscription,
    },
    token,
  };
};
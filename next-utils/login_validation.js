const jwt = require("jsonwebtoken");

export const login_validation = (req, url = null) => {
  const jwtCookie = req.cookies.jwt;

  const validCookieData =
    jwtCookie && jwt.verify(jwtCookie, process.env.JWT_SECERT_KEY);

  if (!jwtCookie || !validCookieData)
    return {
      redirect: {
        redirect: {
          permanent: false,
          destination: url || "/auth/login",
        },
      },
      isLogged: false,
    };

  return { isLogged: validCookieData.id };
};

export const check_have_permission = (account_data, permission) => {
  // const SELECTED_PERMISSON = permissions[1];

  if (
    account_data.permissions &&
    account_data.permissions.includes(permission)
  ) {
    return { updateOwnAccount: true };
  }
  return { updateOwnAccount: false };
};

export const verify_already_login = (
  context,
  destination = "/",
  defaultReturn = true
) => {
  const token = context.req?.cookies?.jwt;

  if (token && jwt.verify(token, process.env.JWT_SECERT_KEY)) {
    return {
      redirect: {
        permanent: false,
        destination,
      },
    };
  }
  if (defaultReturn) {
    return { props: {} };
  }
  return null;
};

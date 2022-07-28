export const ironSessionConfig = {
  cookieName: process.env.COOKIE_NAME,
  cookieOptions: { secure: process.env.NODE_ENV === 'production' },
  password: process.env.SECRET,
};

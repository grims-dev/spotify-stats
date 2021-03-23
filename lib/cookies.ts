const signCookieKeys = { keys: [process.env.COOKIES_KEY_1, process.env.COOKIES_KEY_2] };
const getOptions = { signed: true };
const setOptions = {
  secure: !Boolean(process.env.IS_DEV_MODE),
  sameSite: true,
  signed: true,
};

export { signCookieKeys, getOptions, setOptions };
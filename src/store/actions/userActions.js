export const SET_USER_DETAILS = 'SET_USER_DETAILS';

export const setUserDetails = (name, email) => ({
  type: SET_USER_DETAILS,
  payload: { name, email },
});
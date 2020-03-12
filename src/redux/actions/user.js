export const getUser = data => {
  return {
    type: 'GET_USER',
    payload: data,
  };
};
export const getFriend = data => {
  return {
    type: 'GET_FRIEND',
    payload: data,
  };
};

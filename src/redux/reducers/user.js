const initialValue = {
  complete: false,
  user: {},
};

const getUser = (state = initialValue, action) => {
  switch (action.type) {
    case 'GET_USER':
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default getUser;

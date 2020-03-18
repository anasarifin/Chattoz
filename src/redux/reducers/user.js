const initialValue = {
  complete: false,
  user: {},
  friend: [],
  chat: [],
};

const getUser = (state = initialValue, action) => {
  switch (action.type) {
    case 'GET_USER':
      return {
        ...state,
        user: action.payload,
      };
    case 'GET_FRIEND':
      return {
        ...state,
        friend: action.payload,
      };
    case 'GET_CHAT':
      return {
        ...state,
        chat: action.payload,
      };
    default:
      return state;
  }
};

export default getUser;

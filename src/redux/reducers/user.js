const initialValue = {
  // email: 'riantosm@gmail.com',
  // name: 'Rian Tosm',
  // phone: '089921022022',
  // address: 'Jl. Raya Senen',
  // gender: 0,
  // image: '',
  complete: false,
  user: {},
  userStats: [],
  backup: {
    answer: {'1': 3, '2': 0, '3': 4, '4': 2, '5': 1},
  },
  adminAss: [],
};

const getUser = (state = initialValue, action) => {
  switch (action.type) {
    case 'GET_USER':
      return {
        ...state,
        user: action.payload,
      };
    case 'GET_USER_STATS':
      return {
        ...state,
        userStats: action.payload,
      };
    case 'GET_USER_ASS':
      return {
        ...state,
        adminAss: action.payload,
      };
    default:
      return state;
  }
};

const getUserTeacher = (state = initialValue, action) => {
  switch (action.type) {
    case 'GET_USER':
      return {
        ...state,
        user: action.payload,
      };
    case 'GET_USER_ASS':
      return {
        ...state,
        userStats: action.payload,
      };
    default:
      return state;
  }
};

export default getUser;

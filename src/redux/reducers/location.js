const initialValue = {
  coordinate: false,
  ready: false,
};

const getCoordinate = (state = initialValue, action) => {
  switch (action.type) {
    case 'SET_COORDINATE':
      return {
        ...state,
        coordinate: action.payload,
        ready: true,
      };
    default:
      return state;
  }
};

export default getCoordinate;

export const initialState = {
  user: null,
  userLoading: false,
};

export const actionTypes = {
  SET_USER: "SET_USER",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.user,
        userLoading: action.userLoading,
      };

    default:
      return state;
  }
};

export default reducer;

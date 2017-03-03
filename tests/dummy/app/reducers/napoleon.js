export default ((state={}, action) => {
  if(action.type === 'INVADE') {
    return { ...state, invade: action.payload };
  }
  return state;
});

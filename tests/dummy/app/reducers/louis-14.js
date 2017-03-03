export default ((state={}, action) => {
  if(action.type === 'GLORIOUS') {
    return { ...state, glory: action.payload };
  }
  return state;
});

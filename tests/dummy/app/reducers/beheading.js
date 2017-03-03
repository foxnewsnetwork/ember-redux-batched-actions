export default ((state={ dead: [] }, action) => {
  if(action.type === 'BEHEAD') {
    return { ...state, dead: state.dead.concat(action.payload) };
  }
  return state;
});

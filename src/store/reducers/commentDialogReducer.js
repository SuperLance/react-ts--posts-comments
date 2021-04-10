import ACTION from '../actionTypes';

const initialState = {
  opened: false,
  postId: null,
};

const commentDialogReducer = (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
    case ACTION.OPEN_ADD_COMMENT_MODAL:
      return {
        opened: true,
        postId: payload.postId,
      };

    case ACTION.CLOSE_ADD_COMMENT_MODAL:
      return {
        opened: false,
        postId: null,
      };

    default:
      return state;
  }
};

export default commentDialogReducer;

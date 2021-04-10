import ACTION from '../actionTypes';

export const openDialog = (postId) => ({
  type: ACTION.OPEN_ADD_COMMENT_MODAL,
  payload: { postId },
});

export const closeDialog = () => ({
  type: ACTION.CLOSE_ADD_COMMENT_MODAL,
});

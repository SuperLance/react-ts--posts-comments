import ACTION from '../actionTypes';

export const getPosts = (posts) => ({
  type: ACTION.GET_POSTS,
  payload: { posts },
});

export const addComment = (postId, comment) => ({
  type: ACTION.ADD_COMMENT,
  payload: { postId, comment },
});

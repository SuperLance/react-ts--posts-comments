import ACTION from '../actionTypes';

const initialState = {
  posts: {},
};

const postReducer = (state = initialState, action) => {
  const { payload } = action;

  switch (action.type) {
    case ACTION.GET_POSTS:
      return {
        ...state,
        posts: payload.posts,
      };

    case ACTION.ADD_COMMENT:
      const { postId, comment } = payload;
      const addedPost = { ...state.posts[postId] };
      addedPost.comments.push(comment);

      return {
        ...state,
        posts: {
          ...state.posts,
          postId: addedPost,
        },
      };

    default:
      return state;
  }
};

export default postReducer;

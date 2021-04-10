import axios from 'axios';

const baseURL = '/';

const http = axios.create({ baseURL });

let posts = [];
let comments = [];

const fetchPosts = () => {
  return http
    .get('json/posts.json')
    .then((response) => {
      if (response.status === 200) {
        posts = response.data;
      }
    });
};

const fetchComments = () => {
  return http
    .get('json/comments.json')
    .then((response) => {
      if (response.status === 200) {
        comments = response.data;
      }
    });
};

const getPosts = () => {
  return Promise.all([fetchPosts(), fetchComments()]).then(() => {
    const postResult = {};
    posts.forEach((post) => {
      postResult[post.id] = { ...post, comments: [] };
    });

    comments.forEach((comment) => {
      if (postResult[comment.postId]) {
        postResult[comment.postId].comments.push(comment);
      }
    });

    return postResult;
  });
};

export default {
  getPosts,
};

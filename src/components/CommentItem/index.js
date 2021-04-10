import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

const CommentItem = ({ name, body, email }) => (
  <div className="comment-item">
    <div className="comment-item__header">
      <h2>{name}</h2>
      <p>{email}</p>
    </div>
    <p>{body}</p>
  </div>
);

CommentItem.propTypes = {
  name: PropTypes.string,
  body: PropTypes.string,
  email: PropTypes.string,
};

CommentItem.defaultProps = {
  name: '',
  body: '',
  email: '',
};

export default CommentItem;

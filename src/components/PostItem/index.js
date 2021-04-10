import React from 'react';
import PropTypes from 'prop-types';
import CommentIcon from '@material-ui/icons/Comment';
import './style.scss';
import { history } from '../../store';

const PostItem = ({
  title, body, id, comments,
}) => (
  <div className="post-item" onClick={() => { history.push(`/posts/${id}`); }}>
    <h2 className="post-item__title">
      { title }
      <span className="comments-count">
        <CommentIcon className="comment-icon" />
        { comments }
      </span>
    </h2>
    <p className="post-item__body">{ body }</p>
  </div>
);

PostItem.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  comments: PropTypes.number,
};

PostItem.defaultProps = {
  title: '',
  body: '',
  id: '',
  comments: 0,
};

export default PostItem;

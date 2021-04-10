import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useRouteMatch } from 'react-router';
import { bindActionCreators } from 'redux';
import CommentIcon from '@material-ui/icons/Comment';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Button } from '@material-ui/core';
import { history } from '../../store';
import CommentItem from '../../components/CommentItem';
import { openDialog } from '../../store/actions/commentDialogActions';
import './style.scss';

const Comments = ({ posts, openDialog }) => {
  const match = useRouteMatch();
  const post = useMemo(() => posts[match.params.id], [posts, match.params.id]);


  return (
    <div className="comments-page">
      <div className="page-header">
        <h1 className="page-title">
          <CommentIcon className="comment-icon" />
          Comments
        </h1>
        <div className="comment-action-wrapper">
          <Button
            className="add-comment-btn"
            variant="contained"
            color="primary"
            onClick={() => openDialog(post.id)}
          >
            Add comment
          </Button>
        </div>
      </div>
      <div className="comments-container">
        <div className="comments-header">
          <ArrowBackIcon className="back-icon" onClick={() => history.push('/posts')} />
          <h2 className="post-title">{ post && post.title }</h2>
        </div>
        {
          post && post.comments && post.comments.length > 0
            ? post.comments.map((comment, index) => (
              <CommentItem
                key={index}
                name={comment.name}
                body={comment.body}
                email={comment.email}
              />
            ))
            : (
              <div className="no-list-wrapper">
                <span className="no-list">There is no comment.</span>
              </div>
            )
        }
      </div>
    </div>
  );
};

Comments.propTypes = {
  posts: PropTypes.object,
  openDialog: PropTypes.func.isRequired,
};

Comments.defaultProps = {
  posts: {},
};

const mapStateToProps = (store) => ({
  posts: store.postReducer.posts,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    openDialog,
  },
  dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(Comments);

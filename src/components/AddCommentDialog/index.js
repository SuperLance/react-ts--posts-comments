import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog, DialogContent, Button, TextField,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CloseIcon from '@material-ui/icons/Close';
import { closeDialog } from '../../store/actions/commentDialogActions';
import { addComment } from '../../store/actions/postActions';
import './styles.scss';

const AddCommentDialog = ({
  opened, postId, closeDialog, addComment,
}) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [body, setBody] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    addComment(postId, { email, name, body });
    closeDialog();
  };

  useEffect(() => {
    if (!opened) {
      setEmail('');
      setName('');
      setBody('');
    }
  }, [opened]);

  return (
    <Dialog
      className="add-comment-dialog"
      fullWidth
      maxWidth="sm"
      open={opened && postId !== null}
      onClose={closeDialog}
    >
      <div className="dialog-title">
        <h4>Add comment</h4>
        <Button aria-label="Close" className="close-icon" onClick={closeDialog}>
          <CloseIcon />
        </Button>
      </div>
      <DialogContent>
        <form className="add-comment-form" onSubmit={onSubmit}>
          <TextField
            className="form-input"
            label="Your Email"
            name="email"
            type="email"
            required
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            className="form-input"
            label="Comment Name"
            name="name"
            variant="outlined"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            className="form-input"
            label="Comment Body"
            variant="outlined"
            name="body"
            required
            multiline
            rows={5}
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          <div className="form-action">
            <Button
              type="submit"
              variant="contained"
              color="primary"
            >
              Add
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

AddCommentDialog.propTypes = {
  opened: PropTypes.bool,
  postId: PropTypes.any,
  closeDialog: PropTypes.func.isRequired,
  addComment: PropTypes.func.isRequired,
};

AddCommentDialog.defaultProps = {
  opened: false,
  postId: null,
};

const mapStateToProps = (store) => ({
  opened: store.commentDialogReducer.opened,
  postId: store.commentDialogReducer.postId,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    closeDialog,
    addComment,
  },
  dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(AddCommentDialog);

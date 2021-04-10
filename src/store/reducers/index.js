import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import postReducer from './postReducer';
import commentDialogReducer from './commentDialogReducer';

export default (history) => combineReducers({
  router: connectRouter(history),
  postReducer,
  commentDialogReducer,
});

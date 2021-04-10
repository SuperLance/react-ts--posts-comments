import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, withRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PublicRoute from 'routes/PublicRoute';
import CircularProgress from '@material-ui/core/CircularProgress';

import { getPosts } from './store/actions/postActions';
import Home from './containers/Home';
import Comments from './containers/Comments';
import NotFound from './containers/NotFound';
import AddCommentDialog from './components/AddCommentDialog';
import ApiService from './services/api.service';

const App = (props) => {
  const [loading, setLoading] = useState(false);
  const { getPosts } = props;

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const posts = await ApiService.getPosts();
      getPosts(posts);
      setLoading(false);
    } catch (e) {
      console.log('error: ', e);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts().then();
  }, []);

  return (
    <SnackbarProvider maxSnack={3}>
      {
        loading
          ? (
            <div className="loading-wrapper">
              <CircularProgress />
            </div>
          )
          : (
            <div className="app-container">
              <Switch>
                <PublicRoute
                  exact
                  path="/"
                  component={Home}
                  props={props}
                />
                <PublicRoute
                  exact
                  path="/posts"
                  component={Home}
                  props={props}
                />
                <PublicRoute
                  exact
                  path="/posts/:id"
                  component={Comments}
                  props={props}
                />

                <Route component={NotFound} />
              </Switch>
            </div>
          )
      }

      <AddCommentDialog />
    </SnackbarProvider>
  );
};

App.propTypes = {
  getPosts: PropTypes.func,
};

App.defaultProps = {
  getPosts: () => {},
};

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    getPosts,
  },
  dispatch,
);

export default connect(null, mapDispatchToProps)(withRouter(App));

import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LocalPostOfficeIcon from '@material-ui/icons/LocalPostOffice';
import SearchIcon from '@material-ui/icons/Search';
import PostItem from '../../components/PostItem';

import './style.scss';

const Home = ({ posts }) => {
  const [searchWord, setSearchWord] = useState('');
  const postList = useMemo(() => (
    Object.values(posts).filter((post) => post.title.indexOf(searchWord) !== -1)
  ), [posts, searchWord]);

  return (
    <div className="home-page">
      <div className="page-header">
        <h1 className="page-title">
          <LocalPostOfficeIcon className="post-icon" />
          Posts
        </h1>
      </div>
      <div className="search-input-wrapper">
        <SearchIcon className="search-icon" />
        <input
          className="search-input"
          value={searchWord}
          placeholder="search by post title"
          onChange={(e) => setSearchWord(e.target.value)}
        />
        <span className="search-result">
          {`${postList.length} result found`}
        </span>
      </div>
      <div className="posts-container">
        {
          postList.length > 0
            ? postList.map((item) => (
              <PostItem
                key={item.id}
                id={item.id}
                title={item.title}
                body={item.body}
                comments={item.comments.length ? item.comments.length : 0}
              />
            ))
            : (
              <div className="no-list-wrapper">
                <span className="no-list">There is no post.</span>
              </div>
            )
        }
      </div>
    </div>
  );
};

Home.propTypes = {
  posts: PropTypes.object,
};

Home.defaultProps = {
  posts: {},
};

const mapStateToProps = (store) => ({
  posts: store.postReducer.posts,
});

export default connect(mapStateToProps)(Home);

import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import SignUpForm from './components/auth/SignUpForm';
import ProtectedRoute from './components/auth/ProtectedRoute';
import User from './components/User';
import UserViewPage from './components/UserViewPage';
import Navigation from './components/UserPage/Navigation';

import { authenticate } from './store/session';
import { loadPosts } from './store/post';
import { loadComments } from './store/comment';
import { loadLikes } from './store/like';
import { loadFollows } from './store/follow';
import PostView from './components/UserPage/Post/PostView';
import ProfilePage from './components/UserPage/ProfilePage';
import PageNotFound from './components/PageNotFound';
import loading from './images/loading.gif'
import AboutMe from './components/UserPage/AboutMePage';

function App() {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const user = useSelector(state => state.session.user);

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      await dispatch(loadPosts());
      await dispatch(loadComments())
      await dispatch(loadLikes())
      await dispatch(loadFollows())
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return <img className="loader" src={loading} alt="loader" />;
  }

  return (
    <BrowserRouter>
      {user &&
        <Navigation />
      }
      <Switch>
        <Route path='/' exact={true}>
          <UserViewPage sessionUser={user} />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/about-me' exact={true} >
          <AboutMe />
        </ProtectedRoute>
        <ProtectedRoute path='/posts/:postId' exact={true} >
          <PostView loaded={loaded} />
        </ProtectedRoute>
        <ProtectedRoute path='/:username' exact={true} >
          <ProfilePage loaded={loaded}/>
        </ProtectedRoute>
        <PageNotFound />
      </Switch>
    </BrowserRouter>
  );
}

export default App;

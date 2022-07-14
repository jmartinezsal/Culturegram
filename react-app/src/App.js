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
import PostView from './components/UserPage/Post/PostView';

function App() {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const user = useSelector(state => state.session.user);

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      await dispatch(loadPosts());
      await dispatch(loadComments())
      await dispatch(loadLikes())
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
        {user &&
        <Navigation />
        }
      <Switch>
        <Route path='/' exact={true}>
          <UserViewPage sessionUser={user}/>
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/posts/:postId' exact={true} >
          <PostView />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/' exact={true} >
          <h1>My Home Page</h1>
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

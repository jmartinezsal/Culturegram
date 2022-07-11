import { useSelector } from 'react-redux';

import SplashPage from '../SplashPage';
import HomePage from '../UserPage/HomePage';

function UserViewPage({sessionUser}) {

  return (
    <>
      {sessionUser ?
          <HomePage /> : <SplashPage />}
    </>
  )
}

export default UserViewPage;

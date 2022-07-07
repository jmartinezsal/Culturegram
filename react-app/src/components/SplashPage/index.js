import { Link } from 'react-router-dom';

import LoginForm from '../auth/LoginForm';
import splashpage from '../../images/splashpage.png';

function SplashPage() {


  return (
    <div className="splash-page">
      <img className="splash-img" src={splashpage} alt="splash-page" />
      <div className='splash-right'>
        <LoginForm />
        <div className='sign-up-link'>
          <p>Don't have an acount? <Link to="/sign-up" className="bold">Sign up</Link> </p>
        </div>
      </div>
    </div>
  )
}

export default SplashPage;

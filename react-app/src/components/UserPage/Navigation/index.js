import logo from '../../../images/logo.svg'
import ProfileButton from './Profilebutton';

function Navigation(){


  return(
    <div className="navigation">
      <img src={logo} alt="logo"></img>

      <ProfileButton />
    </div>
  )
}

export default Navigation;

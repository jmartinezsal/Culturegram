import logo from '../../../images/logo.svg'
import ProfileButton from './Profilebutton';
import { VscDiffAdded, VscHome } from 'react-icons/vsc';
import { Link, NavLink } from 'react-router-dom';


function Navigation() {


  return (
    <div className="navigation">
      <NavLink to="/">
        <img src={logo} alt="logo"></img>
      </NavLink>
      <div className='right-nav'>
        <Link to="/">
          <VscHome className='nav-icons' />
        </Link>
        <NavLink to="">
          <VscDiffAdded className='nav-icons' />
        </NavLink>
        <ProfileButton />
      </div>
    </div>
  )
}

export default Navigation;

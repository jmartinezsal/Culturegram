import logo from '../../../images/logo.svg'
import ProfileButton from './Profilebutton';
import {  VscHome } from 'react-icons/vsc';
import { Link, NavLink } from 'react-router-dom';
import CreatePostButton from '../Modal/CreatePost';


function Navigation() {


  return (
    <div className="navigation">
      <Link to="/">
        <img src={logo} alt="logo"></img>
      </Link>
      <div className='right-nav'>
        <NavLink to="/" exact={true}>
          <VscHome className='nav-icons' />
        </NavLink>
          <CreatePostButton />
        <ProfileButton />
      </div>
    </div>
  )
}

export default Navigation;

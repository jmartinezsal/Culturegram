import logo from '../../../images/logo.svg'
import ProfileButton from './Profilebutton';
import {  VscHome } from 'react-icons/vsc';
import { Link, NavLink } from 'react-router-dom';
import CreatePostButton from '../Modal/CreatePost';
import {SiAboutdotme} from 'react-icons/si';



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
        <NavLink to="/about-me" exact={true}>
          <SiAboutdotme className='nav-icons' />
        </NavLink>
        <ProfileButton />
      </div>
    </div>
  )
}

export default Navigation;

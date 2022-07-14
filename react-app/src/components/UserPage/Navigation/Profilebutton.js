import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from "react-router-dom";
import { FaRegHeart } from 'react-icons/fa';
import { VscAccount } from 'react-icons/vsc';
import { RiLogoutCircleRLine } from 'react-icons/ri';

import { logout } from '../../../store/session';

function ProfileButton() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(state => state.session.user)
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);


  const onLogout = async (e) => {
    await dispatch(logout());
    history.push('/')
  };

  return (
    <>
      <div onClick={openMenu} className='profile-btn'>
        <img src={user.profilePicture} alt="avatar"></img>
      </div>
      {showMenu && (
        <div className='profile-btn-nav' >
          <div className="profile-nav-selection">
            <Link  to={`/${user.username}`}>
              <VscAccount />
              <p className="dropdown-txt">Profile</p>
            </Link>
          </div>
          {/* <div className="profile-nav-selection">
            <Link to="/liked">
              <FaRegHeart />
              <p className="dropdown-txt">Liked</p>
            </Link>
          </div> */}
          <div className="profile-nav-selection" onClick={onLogout}>
            <a>
              <RiLogoutCircleRLine />
              <p className="dropdown-txt">Log Out</p>
            </a>
          </div>
        </div>
      )}
    </>
  );
}

export default ProfileButton;

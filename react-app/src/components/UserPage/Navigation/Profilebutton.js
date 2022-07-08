import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import { BsSuitHeart } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';

import { logout } from '../../../store/session';

function ProfileButton() {
  const dispatch = useDispatch();
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
  };

  return (
    <>
      <div onClick={openMenu} className='profile-btn'>
        <img src={ user.profilePicture} alt="avatar"></img>
      </div>
      {showMenu && (
        <div className='profile-btn-nav' >
          <NavLink className="profile" to="/profile">
            <div className="profile-nav-selection">
              <CgProfile />
              <p className="dropdown-txt">Profile</p>
            </div>
          </NavLink>
          <NavLink to="/liked">
            <div className="profile-nav-selection">
              <BsSuitHeart />
              <p className="dropdown-txt">Liked</p>
            </div>
          </NavLink>
          <div className="profile-nav-selection" onClick={onLogout}>
            <p className="dropdown-txt">Logout</p>
          </div>
        </div>
      )}
    </>
  );
}

export default ProfileButton;

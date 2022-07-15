import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, Link } from 'react-router-dom';
import { signUp } from '../../store/session';
import authlogo from '../../images/auth-logo.svg'


const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [bio, setBio] = useState('');
  const [currentStep, setCurrentStep] = useState(1);

  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    let errors = [];
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp({ username, email, password, firstName, lastName, bio }));
      if (data) {
        errors = data;
      } else {
        return;
      }
    };
    errors.push("Password does not match");
    setErrors(errors)
  }

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  const updateFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const updateLastName = (e) => {
    setLastName(e.target.value);
  };

  const updateBio = (e) => {
    setBio(e.target.value);
  };


  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='splash-page'>
      <div className='signup-page'>
        <form className="sign-up-auth" onSubmit={onSignUp}>
          <div className="left-auth-signup">
            <img className='auth-logo' src={authlogo} alt="authlogo" />
              <p className="bold">Sign up, display your culture and see all other culture's across the world.</p>
            <div className='auth-errors'>
              {errors.map((error, ind) => (
                <div key={ind}>{ind+1}. {error.includes(':') ? error.split(':')[1] : error}</div>
              ))}
          </div>
            </div>
          <div className="auth-input-container">
            <div className='pair-inputs'>
              <input
                placeholder='First Name'
                type='text'
                name='firstname'
                onChange={updateFirstName}
                value={firstName}
              ></input>
              <input
                placeholder='Last Name'
                type='text'
                name='Lastname'
                onChange={updateLastName}
                value={lastName}
              ></input>
            </div>
            <div className='pair-inputs'>

              <input
                placeholder='User Name'
                type='text'
                name='username'
                onChange={updateUsername}
                value={username}
              ></input>
              <input
                placeholder='Email'
                type='text'
                name='email'
                onChange={updateEmail}
                value={email}
              ></input>
            </div>
            <textarea
              placeholder='Bio'
              type='text'
              name='bio'
              onChange={updateBio}
              value={bio}
              minLength={3}
              maxLength={255}
            >
            </textarea>
            <div className='pair-inputs'>

              <input
                placeholder='Password'
                type='password'
                name='password'
                onChange={updatePassword}
                value={password}
              ></input>

              <input
                placeholder='Confirm Password'
                type='password'
                name='repeat_password'
                onChange={updateRepeatPassword}
                value={repeatPassword}
              ></input>
            </div>
            <button className="auth-btn" type='submit'>Sign Up</button>
          <div className='sign-up-link'>
          <p>Already have an account? <Link to="/" className="bold">Log in</Link> </p>
        </div>
          </div>
                </form>
      </div>
    </div>
  );
};

export default SignUpForm;

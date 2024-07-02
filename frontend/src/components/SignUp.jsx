import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MainHeader from './MainHeader';
import HomeTitleSignUp from './HomeTitleSignUp';
import image from '../assets/circle.png';
import image2 from '../assets/form-img.png';

function SignUp() {
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:3002/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstName, middleName, lastName, email, password, userType: "customer" }),
    });
    const data = await response.json();
    if (data.success) {
      navigate('/'); // Redirect to sign-in page after successful sign-up
    } else {
      alert('Error: Unable to create account');
    }
  };

  return (
    <div className='wholesignin'>
      <MainHeader title="FieldFare" />
      <div className='signup-container'>
        <div className="left-div-su">
          <HomeTitleSignUp />
        </div>
        <div className='signup-div'>
          <div className='signup-div-left'>
            <img src={image} className='sign-up-circle'/>
            <h2>Create an account</h2>
            <p>
              Already have an account? &nbsp;<Link to="/">Sign in</Link>
            </p>
            <form onSubmit={handleSubmit}>
              <div className="input-row">
                <div className="input-container">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
                <div className="input-container">
                  <label htmlFor="middleName">Middle Name</label>
                  <input
                    type="text"
                    id="middleName"
                    value={middleName}
                    onChange={(e) => setMiddleName(e.target.value)}
                  />
                </div>
              </div>
              <div className="input-container">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
              <div className="input-container">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="input-container">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="button-link-row">
                <p><Link to="/">Sign in instead</Link></p>
                <button type="submit">Create an account</button>
              </div>
            </form>
          </div>
          <div className='signup-div-right'>
            <img src={image2} className='sign-up-img'/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;

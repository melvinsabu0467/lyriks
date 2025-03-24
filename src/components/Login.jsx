import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import { loginSuccess, loginFailure } from '../redux/features/authSlice';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Set cookies after successful login
      Cookies.set('user_uid', user.uid, { expires: 7 });
      Cookies.set('user_email', user.email, { expires: 7 });

      dispatch(loginSuccess({ uid: user.uid, email: user.email }));
      
      // Redirect to home page after successful login
      navigate('/');
    } catch (error) {
      dispatch(loginFailure(error.message));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-white text-center">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 text-white bg-gray-700 border border-gray-600 rounded-lg"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 text-white bg-gray-700 border border-gray-600 rounded-lg"
          />
          <button
            type="submit"
            className="w-full py-3 mt-4 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-500"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

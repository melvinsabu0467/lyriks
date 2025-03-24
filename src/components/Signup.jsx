import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import { loginSuccess, loginFailure } from '../redux/features/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';  // Import js-cookie

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (name) {
        await updateProfile(user, { displayName: name });
      }

      // Set cookies after successful signup
      Cookies.set('user_uid', user.uid, { expires: 7 });
      Cookies.set('user_email', user.email, { expires: 7 });
      Cookies.set('user_name', name, { expires: 7 });

      dispatch(loginSuccess({ uid: user.uid, email: user.email, name: name }));
      navigate('/');
    } catch (error) {
      dispatch(loginFailure(error.message));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-white text-center">Sign Up</h2>
        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-3 text-white bg-gray-700 border border-gray-600 rounded-lg"
          />
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
            className="w-full py-3 mt-4 text-lg font-semibold text-white bg-green-600 rounded-lg hover:bg-green-500"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;

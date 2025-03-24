import React from 'react';
import { signOut } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/features/authSlice';
import { auth } from '../firebase/firebaseConfig';
import Cookies from 'js-cookie';  // Import js-cookie

const LogoutButton = () => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      
      // Remove cookies on logout
      Cookies.remove('user_uid');
      Cookies.remove('user_email');
      Cookies.remove('user_name');

      dispatch(logout());
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <button onClick={handleLogout} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">
      Logout
    </button>
  );
};

export default LogoutButton;

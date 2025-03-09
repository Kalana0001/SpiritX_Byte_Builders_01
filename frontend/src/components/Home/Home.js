import React, { useEffect, useState } from 'react';
import './Home.css';

const Home = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem('authToken');

      if (token) {
        try {
          const response = await fetch('http://localhost:8087/users', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const data = await response.json();

            if (data && data.username) {
              setUser(data);
            } else {
              setError('Invalid user data received');
            }
          } else {
            setError('Failed to fetch user info');
          }
        } catch (error) {
          console.error('Error fetching user info:', error);
          setError('Error fetching user info');
        }
      } else {
        setError('No token found. Please log in.');
      }
      setLoading(false);
    };

    fetchUserInfo();
  }, []);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      localStorage.removeItem('authToken');
      window.location.href = '/signin';
    }
  };

  return (
    <div className="home-container">
      {loading ? (
        <p>Loading user info...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <div>
          {user && user.username ? (
            <h1>Hello, {user.username}!</h1>
          ) : (
            <p>No username available</p>
          )}
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
      )}
      <h1>Welcome to the Home Page</h1>
    </div>
  );
};

export default Home;

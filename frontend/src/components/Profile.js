import React, { useContext, useEffect, useState } from 'react';
import API from '../api';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data } = await API.get('/users/profile', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setProfile(data);
    };

    fetchProfile();
  }, [user]);

  if (!profile) return <p>Loading...</p>;

  return (
    <div>
      <h1>{profile.username}</h1>
      <p>{profile.email}</p>
    </div>
  );
};

export default Profile;

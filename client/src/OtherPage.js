import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default () => {
  const [keys, setKeys] = useState({});

  useEffect(() => {
    const getKeys = async () => {
      const response = await axios.get('/api/keys');
      setKeys({ keys: response.data });
    };

    getKeys();
  }, []);

  return (
    <div>
      <div>{`${JSON.stringify(keys)}`}</div>
      <Link to="/">Go back home</Link>
    </div>
  );
};

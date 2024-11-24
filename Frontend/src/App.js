import React, { useEffect, useState } from 'react';
import API from './api';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    API.get('/admin/resources/User/actions/list').then((response) => {
      setUsers(response.data.records);
    });
  }, []);

  return (
    <div>
      <h1>User List</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.params.name} - {user.params.email}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;

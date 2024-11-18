// components/AdminPages/UserList.js

import React, { useState, useEffect } from 'react';
import api from '../../api';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [roleFilter, setRoleFilter] = useState('all');

  const sortUsersByRole = (usersArray) => {
    const roleOrder = { "admin": 1, "organizer": 2, "student": 3 };
    return [...usersArray].sort((a, b) => roleOrder[a.role] - roleOrder[b.role]);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await api.get('/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const sortedUsers = sortUsersByRole(response.data);
        setUsers(sortedUsers);
        setFilteredUsers(sortedUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const filtered = roleFilter === 'all' 
      ? users 
      : users.filter(user => user.role === roleFilter);

    setFilteredUsers(sortUsersByRole(filtered));
  }, [roleFilter, users]);

  const makeOrganizer = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      await api.patch(
        '/users/update-role',
        { userId, newRole: 'organizer' },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUsers(users.map(user => user._id === userId ? { ...user, role: 'organizer' } : user));
    } catch (error) {
      console.error('Error updating role to organizer:', error);
    }
  };

  const makeStudent = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      await api.patch(
        '/users/update-role',
        { userId, newRole: 'student' },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUsers(users.map(user => user._id === userId ? { ...user, role: 'student' } : user));
    } catch (error) {
      console.error('Error updating role to student:', error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      await api.delete(`/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(users.filter(user => user._id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className='mt-8 p-4 mx-20 bg-white flex-col rounded-md'>
      <h1 className="text-2xl font-bold inline ">Users</h1>

      {/* Role filter dropdown */}
      <div className='flex mt-4'>
            <label htmlFor="roleFilter" className="text-sm font-bold text-gray-700 mr-4">Filter by Role</label>
            <select
                id="roleFilter"
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="p-1 border border-gray-300 rounded"
            >
                <option value="all">All</option>
                <option value="student">Student</option>
                <option value="organizer">Organizer</option>
                <option value="admin">Admin</option>
            </select>
      </div>

      {/* Scrollable User List */}
      <div className="mt-4 overflow-y-auto" style={{ maxHeight: "70vh" }}>
        {filteredUsers.map(user => (
          user.role !== "admin" ? (
            <div key={user._id} className="p-4 border border-gray-300 rounded mb-2 shadow">
              <div className='flex justify-between'>
                  <p><strong>Name:</strong> {user.full_name}</p>
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Role:</strong> {user.role}</p>
              </div>
              <hr className='mt-2'></hr>
              <div className='mt-2 flex justify-around'>
              {user.role === "student" ?
                  <button className="justify-center w-36 py-1 px-1 font-semibold bg-orange-500 hover:bg-orange-600" onClick={() => makeOrganizer(user._id)}>Make Organizer</button>
              : <button className="justify-center w-40 py-1 px-1 font-semibold bg-indigo-500 hover:bg-indigo-600" onClick={() => makeStudent(user._id)}>Remove Organizer</button>
              }
              <button className="justify-center w-36 py-1 px-1 font-semibold bg-red-500 hover:bg-red-600" onClick={() => deleteUser(user._id)}>Delete User</button>
              </div>
            </div>
          ) : (
            <div key={user._id} className='flex justify-between p-4 border border-yellow-200 bg-yellow-100 rounded mb-2 shadow'>
                <p><strong>Name:</strong> {user.full_name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Role:</strong> {user.role}</p>
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export default UserList;

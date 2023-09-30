import React from 'react';
import { NavLink } from 'react-router-dom';

function TaskIndicator() {
  return (
    <div className='flex-grow'>
      <nav>
        <ul className='flex gap-3 justify-between p-3 bg-slate-400 rounded-lg shadow-md'>
          <li>
            <NavLink
              to="/"
              className='text-white hover:text-indigo-500 transition duration-300'
              activeClassName='font-semibold'
            >
              All Tasks
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/active"
              className='text-white hover:text-indigo-500 transition duration-300'
              activeClassName='font-semibold'
            >
              Active
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/completed"
              className='text-white hover:text-indigo-500 transition duration-300'
              activeClassName='font-semibold'
            >
              Completed
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/by-due-date"
              className='text-white hover:text-indigo-500 transition duration-300'
              activeClassName='font-semibold'
            >
              By Due Date
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/by-priority"
              className='text-white hover:text-indigo-500 transition duration-300'
              activeClassName='font-semibold'
            >
              By Priority
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default TaskIndicator;

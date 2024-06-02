import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/line">Line Chart</Link>
        </li>
        <li>
          <Link to="/bar">Bar Chart</Link>
        </li>
        <li>
          <Link to="/pie">Pie Chart</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

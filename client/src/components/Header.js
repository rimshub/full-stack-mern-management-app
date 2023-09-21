import React from 'react';
import { SiApollographql } from 'react-icons/si';
import { GrGraphQl } from 'react-icons/gr';
import { FaReact } from 'react-icons/fa';
import { Link } from 'react-router-dom'; 

function Header() {
  return (
    <header className="bg-black p-4 font-bold font-mono">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold hover:text-white">
          <div className="flex gap-3">
            <FaReact size='2rem' />
            <SiApollographql size='2rem'/>
            <GrGraphQl size='2rem'/>
          </div>
        </Link>

        <Link to="/" className="text-white text-lg font-semibold hover:text-white">
          Project Management System
        </Link>
      </div>
    </header>
  );
}

export default Header;

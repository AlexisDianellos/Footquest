import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between p-4 pl-10 pr-10 shadow-md bg-purple-500 ">
      <Link className="flex items-center font-bold text-2xl text-white no-underline" to='/'>
        <span className="material-symbols-outlined mr-1 text-3xl">
        <span className="material-symbols-outlined">
          sports_soccer
        </span>
        </span> 
        FootQuest 
      </Link>
      <div>
       <Button
        marginLeft={2}
        marginTop={0}
        to="/about"
        name="About"
       >
       </Button>
      </div>
    </nav>
  );
}

export default Navbar;

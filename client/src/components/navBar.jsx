import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { styles } from '../styles';
import { navLinks } from '../constants';

const navBar = () => {

  const [active, setActive] = useState(''); // for nav bar active state

  return (
    <nav className='container w-full flex items-center py-5 fixed top-0 z-20 bg-primary drop-shadow-2xl drop'>
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <p className="text-white text-[18px] font-bold cursor-pointer flex">Jenyll &nbsp;<span className="sm:block hidden">Mabborang</span></p>
        </Link>
        <ul className="list-none hidden sm:flex flex-row gap-10">
          {navLinks.map((link) => (
            <li
              key={link.id}
              className={`${active === link.title
                  ? "text-white"
                  : "text-secondary"
                } hover:text-white text-[18px] font-medium cursor-pointer`}
              onClick={() => setActive(link.title)}
            >
              <a href={`${link.id}`} className='secondary'>{link.title}</a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default navBar;
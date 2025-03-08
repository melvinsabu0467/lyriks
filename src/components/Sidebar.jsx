import React from 'react';
import { NavLink } from 'react-router-dom';
import { RiCloseLine } from 'react-icons/ri';

const links = [
  { name: 'Discover', to: '/', id: 1 },
  { name: 'Around You', to: '/around-you', id: 2 },
  { name: 'Top Artists', to: '/top-artists', id: 3 },
  { name: 'Top Charts', to: '/top-charts', id: 4 },
];

const Sidebar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-col w-[240px] py-10 px-4 bg-[#191624]">
        <h1 className="text-white text-2xl font-bold mb-10">Lyriks</h1>
        <div className="mt-6">
          {links.map((item) => (
            <NavLink
              key={item.id}
              to={item.to}
              className="flex flex-row items-center my-8 text-sm font-medium text-gray-400 hover:text-cyan-400"
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      </div>

      {/* Mobile Menu Button */}
      <div className="absolute md:hidden block top-6 right-3">
        {!mobileMenuOpen ? (
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="text-white mr-2"
          >
            Menu
          </button>
        ) : (
          <RiCloseLine
            className="w-6 h-6 text-white mr-2"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`absolute top-0 h-screen w-2/3 bg-gradient-to-tl from-white/10 to-[#483d8b] 
        backdrop-blur-lg z-10 p-6 md:hidden smooth-transition ${
          mobileMenuOpen ? 'left-0' : '-left-full'
        }`}
      >
        <h1 className="text-white text-2xl font-bold mb-10">Lyriks</h1>
        <div className="mt-6">
          {links.map((item) => (
            <NavLink
              key={item.id}
              to={item.to}
              className="flex flex-row items-center my-8 text-sm font-medium text-gray-400 hover:text-cyan-400"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;

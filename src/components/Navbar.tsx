
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { Menu, X, BarChart2, Users, TrendingUp, LayoutDashboard, LogIn } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const navItems = [
    { name: "Dashboard", link: "/dashboard", icon: <LayoutDashboard className="h-4 w-4 mr-2" /> },
    { name: "Trading", link: "/trading", icon: <TrendingUp className="h-4 w-4 mr-2" /> },
    { name: "Analytics", link: "/analytics", icon: <BarChart2 className="h-4 w-4 mr-2" /> },
    { name: "Community", link: "/community", icon: <Users className="h-4 w-4 mr-2" /> }
  ];

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-commodity-blue font-bold text-xl">CommodityHub</span>
            </Link>
          </div>
          
          {!isMobile && (
            <div className="hidden md:flex items-center space-x-4">
              {navItems.map((item) => (
                <Link 
                  key={item.name} 
                  to={item.link} 
                  className="flex items-center text-gray-600 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100 hover:text-commodity-blue transition-colors"
                >
                  {item.icon}
                  {item.name}
                </Link>
              ))}
              <Button 
                variant="outline" 
                className="flex items-center ml-4 border-commodity-gold text-commodity-gold hover:bg-commodity-gold hover:text-white"
              >
                <LogIn className="h-4 w-4 mr-2" />
                Login
              </Button>
              <Button className="bg-commodity-gold hover:bg-amber-600 text-white">
                Sign Up
              </Button>
            </div>
          )}
          
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-600 hover:text-commodity-blue focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMobile && isMenuOpen && (
        <div className="md:hidden bg-white pt-2 pb-3 space-y-1 px-4 shadow-md">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.link}
              className="flex items-center text-gray-600 px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 hover:text-commodity-blue"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
          <div className="pt-4 pb-2 border-t border-gray-200 flex flex-col space-y-2">
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center border-commodity-gold text-commodity-gold hover:bg-commodity-gold hover:text-white"
            >
              <LogIn className="h-4 w-4 mr-2" />
              Login
            </Button>
            <Button className="w-full bg-commodity-gold hover:bg-amber-600 text-white">
              Sign Up
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

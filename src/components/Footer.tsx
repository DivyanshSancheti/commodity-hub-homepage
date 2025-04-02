
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-commodity-blue text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="text-xl font-bold mb-4">CommodityHub</div>
            <p className="text-gray-300 text-sm">
              The premier platform for commodity trading, market insights, and professional networking.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">Products</h3>
            <ul className="space-y-2">
              <li><Link to="/trading" className="text-gray-300 hover:text-white transition-colors">Trading Platform</Link></li>
              <li><Link to="/analytics" className="text-gray-300 hover:text-white transition-colors">Analytics Tools</Link></li>
              <li><Link to="/api" className="text-gray-300 hover:text-white transition-colors">Market Data API</Link></li>
              <li><Link to="/research" className="text-gray-300 hover:text-white transition-colors">Research Reports</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/careers" className="text-gray-300 hover:text-white transition-colors">Careers</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link></li>
              <li><Link to="/press" className="text-gray-300 hover:text-white transition-colors">Press</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/privacy" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-300 hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link to="/cookie" className="text-gray-300 hover:text-white transition-colors">Cookie Policy</Link></li>
              <li><Link to="/compliance" className="text-gray-300 hover:text-white transition-colors">Compliance</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-700">
          <p className="text-center text-gray-300 text-sm">
            &copy; {currentYear} CommodityHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

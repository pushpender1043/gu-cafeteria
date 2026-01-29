
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-6 md:mb-0">
            <Link to="/" className="flex items-center mb-4">
              <span className="text-foodfusion-orange text-xl font-bold">GU</span>
              <span className="text-foodfusion-teal text-xl font-bold">Cafeteria</span>
            </Link>
            <p className="text-gray-500 text-sm max-w-xs">
              The easiest way to order food on campus. Quick, convenient, and delicious!
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase mb-4">Quick Links</h3>
              <ul className="text-gray-500 space-y-2">
                <li><Link to="/" className="hover:text-foodfusion-orange">Menu</Link></li>
                <li><Link to="/history" className="hover:text-foodfusion-orange">Order History</Link></li>
                <li><Link to="/staff" className="hover:text-foodfusion-orange">Staff Portal</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase mb-4">Information</h3>
              <ul className="text-gray-500 space-y-2">
                <li><a href="#" className="hover:text-foodfusion-orange">About Us</a></li>
                <li><a href="#" className="hover:text-foodfusion-orange">Opening Hours</a></li>
                <li><a href="#" className="hover:text-foodfusion-orange">Contact Us</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-gray-500 text-sm text-center">
            © {new Date().getFullYear()} GU Cafeteria. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

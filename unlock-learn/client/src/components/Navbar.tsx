import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

export const Navbar = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-sm">
            <span className="text-white font-bold text-lg">IL</span>
          </div>
          <span className="font-bold text-2xl text-gray-900 tracking-tight">InclusiveLearn</span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex space-x-8 items-center">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              `font-medium hover:text-blue-600 transition-colors ${
                isActive ? "text-blue-600" : "text-gray-700"
              }`
            }
          >
            Home
          </NavLink>
          <NavLink 
            to="/courses" 
            className={({ isActive }) => 
              `font-medium hover:text-blue-600 transition-colors ${
                isActive ? "text-blue-600" : "text-gray-700"
              }`
            }
          >
            Courses
          </NavLink>
          <NavLink 
            to="/community" 
            className={({ isActive }) => 
              `font-medium hover:text-blue-600 transition-colors ${
                isActive ? "text-blue-600" : "text-gray-700"
              }`
            }
          >
            Community
          </NavLink>
          <NavLink 
            to="/support" 
            className={({ isActive }) => 
              `font-medium hover:text-blue-600 transition-colors ${
                isActive ? "text-blue-600" : "text-gray-700"
              }`
            }
          >
            Support
          </NavLink>
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex space-x-4 items-center">
          <Link to="/auth">
            <Button 
              variant="outline" 
              className="border-blue-600 text-blue-600 hover:bg-blue-50 font-medium"
            >
              Sign In
            </Button>
          </Link>
          <Link to="/courses">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium">
              Get Started
            </Button>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden flex flex-col space-y-1"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="sr-only">Toggle Menu</span>
          <div className="w-6 h-0.5 bg-gray-700"></div>
          <div className="w-6 h-0.5 bg-gray-700"></div>
          <div className="w-6 h-0.5 bg-gray-700"></div>
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white px-6 py-4 space-y-4 border-t shadow-lg">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              `block py-2 font-medium ${
                isActive ? "text-blue-600" : "text-gray-700"
              }`
            }
            onClick={() => setIsOpen(false)}
          >
            Home
          </NavLink>
          <NavLink 
            to="/courses" 
            className={({ isActive }) => 
              `block py-2 font-medium ${
                isActive ? "text-blue-600" : "text-gray-700"
              }`
            }
            onClick={() => setIsOpen(false)}
          >
            Courses
          </NavLink>
          <NavLink 
            to="/community" 
            className={({ isActive }) => 
              `block py-2 font-medium ${
                isActive ? "text-blue-600" : "text-gray-700"
              }
            `}
            onClick={() => setIsOpen(false)}
          >
            Community
          </NavLink>
          <NavLink 
            to="/support" 
            className={({ isActive }) => 
              `block py-2 font-medium ${
                isActive ? "text-blue-600" : "text-gray-700"
              }`
            }
            onClick={() => setIsOpen(false)}
          >
            Support
          </NavLink>
          
          <div className="pt-4 space-y-3 border-t">
            <Link to="/auth" onClick={() => setIsOpen(false)}>
              <Button variant="outline" className="w-full border-blue-600 text-blue-600 font-medium">
                Sign In
              </Button>
            </Link>
            <Link to="/courses" onClick={() => setIsOpen(false)}>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

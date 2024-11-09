import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle, FaBell, FaEnvelope, FaMoon, FaSun } from 'react-icons/fa'; // Icons
import { BsSearch } from 'react-icons/bs'; // Search Icon

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredLinks, setFilteredLinks] = useState([]);
  const [notificationDropdownOpen, setNotificationDropdownOpen] = useState(false);
  const [messageDropdownOpen, setMessageDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    "New order placed by John Doe",
    "Shipment delivered successfully",
    "Production order #456 completed"
  ]);
  const [messages, setMessages] = useState([
    "Meeting scheduled at 3 PM",
    "Message from HR: Please submit your reports",
    "Your invoice #789 is now due"
  ]);

  const [isDarkMode, setIsDarkMode] = useState(false); // State for theme
  const navigate = useNavigate();

  // Example links for BFS search
  const links = [
    { name: 'Home', path: '/home' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Purchase Orders', path: '/purchase-orders' },
    { name: 'Suppliers', path: '/suppliers' },
    { name: 'Work Orders', path: '/work-orders' },
    { name: 'Shipments', path: '/shipments' },
    { name: 'Supplier Contracts', path: '/supplier-contracts' },
    { name: 'Supplier Performance', path: '/supplier-performance' },
    // Add more links as needed
  ];

  useEffect(() => {
    // Check localStorage for the saved theme (if any)
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
  }, []);

  useEffect(() => {
    // Save the theme to localStorage
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    document.body.classList.toggle('dark', isDarkMode); // Apply dark mode class to the body
  }, [isDarkMode]);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const toggleNotificationDropdown = () => setNotificationDropdownOpen(!notificationDropdownOpen);

  const toggleMessageDropdown = () => setMessageDropdownOpen(!messageDropdownOpen);

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // Basic search to filter links
    if (query) {
      const results = links.filter(link =>
        link.name.toLowerCase().includes(query)
      );
      setFilteredLinks(results);
    } else {
      setFilteredLinks([]);
    }
  };

  const handleSearchSelect = (path) => {
    setSearchQuery('');
    setFilteredLinks([]);
    navigate(path);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && filteredLinks.length > 0) {
      navigate(filteredLinks[0].path);
    }
  };

  return (
    <nav className={`p-4 shadow-lg ${isDarkMode ? 'bg-black' : 'bg-white'} transition-colors duration-300`}>
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo (Image Icon) */}
        <Link to="/home" className="flex items-center space-x-2">
          <img src="logo.jpg" alt="App Logo" className="h-14 w-14" />
        </Link>

        {/* Search Bar */}
        <div className="relative w-1/3">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyPress={handleKeyPress}
            className={`w-full py-2 pl-10 pr-4 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800'}`}
            placeholder="Search pages..."
          />
          <BsSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />

          {/* Search Suggestions Dropdown */}
          {filteredLinks.length > 0 && (
            <div className="absolute w-full bg-gray-700 text-white shadow-lg rounded-md mt-2 max-h-60 overflow-y-auto">
              {filteredLinks.map((link) => (
                <div
                  key={link.name}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-600 transition-colors duration-200"
                  onClick={() => handleSearchSelect(link.path)}
                >
                  {link.name}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Icons and Dropdowns */}
        <div className="flex items-center space-x-6">
          {/* Theme Toggle (Day/Night) */}
          <div>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="text-xl cursor-pointer transition-colors duration-300 hover:text-gray-600"
            >
              {isDarkMode ? <FaSun size={24} /> : <FaMoon size={24} />}
            </button>
          </div>

          {/* Notification Icon */}
          <div className="relative">
            <FaBell size={24} onClick={toggleNotificationDropdown} className="cursor-pointer hover:text-gray-400 transition-colors duration-300" />
            {notificationDropdownOpen && (
              <div className="absolute right-0 mt-2 bg-gray-700 text-white shadow-lg rounded-lg w-64 max-h-60 overflow-y-auto">
                <div className="px-4 py-2 font-semibold text-lg">Notifications</div>
                {notifications.length === 0 ? (
                  <div className="px-4 py-2">No notifications</div>
                ) : (
                  notifications.map((notification, idx) => (
                    <div key={idx} className="px-4 py-2 hover:bg-gray-600 transition-colors duration-200">
                      {notification}
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Message Icon */}
          <div className="relative">
            <FaEnvelope size={24} onClick={toggleMessageDropdown} className="cursor-pointer hover:text-gray-400 transition-colors duration-300" />
            {messageDropdownOpen && (
              <div className="absolute right-0 mt-2 bg-black-700 text-white shadow-lg rounded-lg w-64 max-h-60 overflow-y-auto">
                <div className="px-4 py-2 font-semibold text-lg">Messages</div>
                {messages.length === 0 ? (
                  <div className="px-4 py-2">No messages</div>
                ) : (
                  messages.map((message, idx) => (
                    <div key={idx} className="px-4 py-2 hover:bg-gray-600 transition-colors duration-200">
                      {message}
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {/* User Profile Dropdown */}
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="flex items-center focus:outline-none hover:text-gray-400 transition-colors duration-300"
            >
              <FaUserCircle size={24} />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 bg-gray-700 text-white shadow-lg rounded-lg">
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-gray-600 transition-colors duration-200"
                  onClick={() => setDropdownOpen(false)}
                >
                  Profile
                </Link>
                <Link
                  to="/dashboard"
                  className="block px-4 py-2 hover:bg-gray-600 transition-colors duration-200"
                  onClick={() => setDropdownOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  className="block px-4 py-2 w-full text-left hover:bg-gray-600 transition-colors duration-200"
                  onClick={() => {
                    // Handle logout
                    setDropdownOpen(false);
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;

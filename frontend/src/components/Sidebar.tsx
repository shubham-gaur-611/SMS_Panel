import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import {
  HomeIcon,
  UserGroupIcon,
  UserPlusIcon,
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Students List', href: '/students', icon: UserGroupIcon },
  { name: 'Add Student', href: '/students/new', icon: UserPlusIcon },
  // { name: 'Reports', href: '/reports', icon: ChartBarIcon },
  // { name: 'Settings', href: '/settings', icon: Cog6ToothIcon },
];

export const Sidebar = () => {
  const location = useLocation();
  const { getUser } = useAuth();
  const user = getUser();

  return (
    <div className="flex flex-col w-64 bg-gray-800 h-screen fixed">
      <div className="flex items-center justify-center h-16 bg-gray-900">
        <span className="text-white text-lg font-semibold">Admin Panel</span>
      </div>
      <nav className="flex-1 overflow-y-auto">
        <ul className="py-4">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className={`flex items-center px-6 py-3 text-gray-300 hover:bg-gray-700 hover:text-white ${
                    isActive ? 'bg-gray-700 text-white' : ''
                  }`}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center text-gray-300">
          <img
            className="h-8 w-8 rounded-full bg-gray-500"
            src={`https://ui-avatars.com/api/?name=${user?.email || 'User'}&background=random`}
            alt="User avatar"
          />
          <div className="ml-3">
            <p className="text-sm font-medium text-white">{user?.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
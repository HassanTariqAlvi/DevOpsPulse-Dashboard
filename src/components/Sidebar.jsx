import { Link, useLocation } from 'react-router-dom';
import dashboardIcon from '../assets/icons/1.svg';
import buildsIcon from '../assets/icons/2.svg';
import deploymentsIcon from '../assets/icons/3.svg';
import uptimeIcon from '../assets/icons/4.svg';
import logoIcon from '../assets/icons/devops.svg';

const Sidebar = () => {
  const { pathname } = useLocation();

  const links = [
    { to: '/', label: 'Dashboard', icon: dashboardIcon },
    { to: '/builds', label: 'Builds', icon: buildsIcon },
    { to: '/deployments', label: 'Deployments', icon: deploymentsIcon },
    { to: '/uptime', label: 'Uptime', icon: uptimeIcon },
  ];

  return (
    <aside className="sidebar">
      <div className="logo-container">
        <img src={logoIcon} alt="DevOps Pulse" className="logo-icon" />
        <h1 className="logo-text">
          DevOps<span className="pulse">Pulse</span>
        </h1>
      </div>
      <nav className="nav">
        {links.map(({ to, label, icon }) => (
          <Link
            key={to}
            to={to}
            className={`nav-link ${pathname === to ? 'active' : ''}`}
          >
            <img src={icon} alt={label} className="nav-icon" />
            <span>{label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;

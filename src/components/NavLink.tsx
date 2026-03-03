import React from "react";
import { Link, useLocation } from "react-router-dom";

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  activeClassName?: string;
}

const NavLink = ({ to, children, className = "", activeClassName = "text-accent" }: NavLinkProps) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`${className} ${isActive ? activeClassName : ""}`}
    >
      {children}
    </Link>
  );
};

export default NavLink;

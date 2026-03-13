import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-links">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/catalog">Catalog</NavLink>
        <NavLink to="/owned">Owned</NavLink>
        <NavLink to="/wishlist">Wishlist</NavLink>
        <NavLink to="/login">Login</NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
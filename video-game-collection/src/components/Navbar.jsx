import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  function handleLogout() {
    setUser(null);
    navigate("/");
  }

  return (
    <nav className="navbar">
      <div className="nav-links">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/catalog">Catalog</NavLink>
        <NavLink to="/owned">Owned</NavLink>
        <NavLink to="/wishlist">Wishlist</NavLink>

        {user ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <NavLink to="/login">Login</NavLink>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
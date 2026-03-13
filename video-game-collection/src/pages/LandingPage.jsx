import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="landing-page">
      <section className="hero">
        <h1>Track Your Video Game Collection</h1>
        <p>
          Organize your catalog, keep track of the games you own, and build
          your wishlist all in one place.
        </p>

        <div className="hero-buttons">
          <Link to="/catalog" className="hero-button">
            Browse Catalog
          </Link>

          <Link to="/login" className="hero-button secondary-button">
            Login
          </Link>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
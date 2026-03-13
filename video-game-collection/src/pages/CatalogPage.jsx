import { useEffect, useState } from "react";
import GameCard from "../components/GameCard";

function CatalogPage() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/games")
      .then((response) => response.json())
      .then((data) => {
        setGames(data);
      })
      .catch((error) => {
        console.error("Error fetching games:", error);
      });
  }, []);

  return (
    <div className="page-container">
      <h1>Game Catalog</h1>

      {games.map((game) => (
        <GameCard key={game.game_id} game={game} />
      ))}
    </div>
  );
}

export default CatalogPage;
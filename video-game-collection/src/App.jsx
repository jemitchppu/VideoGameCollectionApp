import { useEffect, useState } from "react";
import GameCard from "./components/GameCard";

function App() {
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
  <div>
    <h1>Video Game Collection</h1>

    {games.map((game) => (
          <GameCard key={game.game_id} game={game} />
    ))}
  </div>
);

}

export default App

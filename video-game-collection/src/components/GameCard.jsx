function GameCard({ game }) {
  return (
    <div className="game-card">

      <div className="game-image">
        Image
      </div>

      <div className="game-info">
        <h2>{game.title}</h2>
        <p>Developer: {game.developer}</p>
        <p>Publisher: {game.publisher}</p>
      </div>

      <div className="game-meta">
        <p>Year: {game.release_date}</p>
        <p>Genre: {game.genre}</p>

        <button>☆</button>
        <button>♡</button>
      </div>

    </div>
  );
}

export default GameCard;
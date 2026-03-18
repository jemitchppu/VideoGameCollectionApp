function OwnedPage({ user }) {
  return (
    <div className="page-container">
      <h1>
        {user ? `${user.name}'s Owned Games` : "Owned Games"}
      </h1>
    </div>
  );
}

export default OwnedPage;
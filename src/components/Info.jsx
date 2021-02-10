import React from "react";

const Info = ({ tournament }) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-4">
          <h2>Description</h2>
          <p>{tournament.description}</p>
        </div>
        <div className="col-sm-4">
          <h3>Timezone</h3>
          <p>{tournament.timezone}</p>
        </div>
        <div className="col-sm-4">
          <h3>Organizer's email</h3>
          <p>{tournament.email}</p>
        </div>

        <div className="col-sm-4">
          <h2>Prize</h2>
          <p>{tournament.prize}</p>
        </div>
        <div className="col-sm-4">
          <h2>Rules</h2>
          <p>{tournament.rules}</p>
        </div>
        <div className="col-sm-4">
          <h2>{tournament.tournamentType === "Sports" ? "Avenue" : "Platform"}</h2>
          <p>{tournament.tournamentType === "Sports" ? tournament.avenue: tournament.gameName}</p>
        </div>
      </div>
    </div>
  );
};
export default Info;

//import { render } from "@testing-library/react";
import React, { Component } from "react";
//import { connect } from "react-redux";

class Participants extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { tournament } = this.props;
    console.log(tournament);
    return (
      <div className="container">
        <div className="row">
          {tournament.teamParticipants.length === 0 &&
          tournament.playerParticipants.length === 0 ? (
            <div
              className="p-4 blue lighten-5 m-4"
              style={{ border: "1px solid #5566ff" }}
            >
              <p className="bold blue-text">Participants</p>
              <p className="blue-text">No Participants Yet</p>
            </div>
          ) : (
            <span />
          )}
          {tournament.participantsType === "teams"
            ? tournament.teamParticipants.map((team) => (
                <div className="col-sm-12 col-md-3">
                  <h5
                    className="grey lighten-3 p-2 center"
                    style={{ border: "1px solid black", borderRadius: "8px" }}
                  >
                    {team.teamName}
                    <br />
                    {team.captainEmail}
                  </h5>
                </div>
              ))
            : tournament.playerParticipants.map((player) => (
                <div className="col-sm-12 col-md-3">
                  <h5
                    className="grey lighten-3 p-2 center"
                    style={{ border: "1px solid black", borderRadius: "8px" }}
                  >
                    {player.name}
                    <br />
                    {player.email}
                  </h5>
                </div>
              ))}
        </div>
      </div>
    );
  }
}

export default Participants;
// const mapStateToProps = (state) => ({
//   tournaments: state.tournament,
// });

// const mapDispatchToProps = (dispatch) => ({
// });

// const FeebacksWrapper = connect(mapStateToProps, mapDispatchToProps)(Feedback);
// export default FeebacksWrapper;

import React, { Component } from "react";
import "../css/common.css";
import Feedback from "./Feedback";
import Info from "./Info";
import Participants from "./Participants";
import Result from "./Result";
import RegisterTournamentWrapper from "./RegisterTournament";
import { getCurrentUser } from "../auth/authentication";
import { connect } from "react-redux";
import { fetchTournamentList } from "../redux/actionCreaters/tournamentActionCreator";
import { Link } from "react-router-dom";

class Tournament extends Component {
  constructor(props) {
    super(props);
    if (this.props.location.tournament == null) window.location = "/browse";
  }

  state = {
    tab: "info",
  };

  handleTabs = (tab) => {
    this.setState({ tab: tab });
  };
  render() {
    const tournament = this.props.location.tournament;

    return (
      <React.Fragment>
        <div
          className="row"
          style={{
            backgroundImage: `url(${tournament.image.base64})`,
            backgroundSize: "cover",
            backgroundPosition: "center center",
          }}
        >
          <div className="col-sm-12 overlay-shadow">
            <div className="row">
              <div className="col-sm-12 col-md-6 center mt-10 mb-10">
                <h1 className="mt-4 bold white-text">{tournament.name}</h1>
                <h2 className="mt-4 white-text">{tournament.gameName}</h2>
                <p className="bold white-text">
                  {new Date(tournament.startDate).toLocaleDateString()} -{" "}
                  {new Date(tournament.endDate).toLocaleDateString()}
                </p>
                <p className="bold white-text">{tournament.startTime}</p>
              </div>
              <div className="col-sm-12 col-md-6">
                <div className="register-box ml-auto mr-auto mt-10 mb-10">
                  <div className="row">
                    <div className="col-sm-6 p-4 center">
                      <span className=" white-text bold d-block">
                        Registration Open
                      </span>
                      <span className=" grey-text d-block">
                        until{" "}
                        {new Date(tournament.endDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="col-sm-6 p-4 center ">
                      <span className="white-text bold d-block">
                        {tournament.participantsType === "teams"
                          ? `${tournament.teamParticipants.length} / ${tournament.teams} `
                          : `${tournament.playerParticipants.length} / ${tournament.players} `}
                      </span>
                      <span className="grey-text">
                        {tournament.participantsType === "teams"
                          ? "Teams"
                          : "Players"}
                      </span>
                    </div>

                    {getCurrentUser() ? (
                      getCurrentUser().isAdmin === false ? (
                        <div className="col-sm-12">
                          {tournament.teamParticipants.find(
                            (team) => team.user === getCurrentUser()._id
                          ) ||
                          tournament.playerParticipants.find(
                            (player) => player.user === getCurrentUser()._id
                          ) ? (
                            <h6
                              className="green white-text center w-100 p-3"
                              style={{ marginBottom: "-1rem" }}
                            >
                              You are already register
                            </h6>
                          ) : (
                              tournament.participantsType === "teams"
                                ? tournament.teams ===
                                  tournament.teamParticipants.length
                                  ? false
                                  : true
                                : tournament.players ===
                                  tournament.playerParticipants.length
                                ? false
                                : true
                            ) ? (
                            <h6
                              className={"green white-text center w-100 p-3"}
                              style={{
                                marginBottom: "-1rem",
                                cursor: "pointer",
                              }}
                              onClick={() => this.handleTabs("register")}
                            >
                              Register to the tournament
                            </h6>
                          ) : (
                            <h6
                              className={
                                "green darken-2 white-text center w-100 p-3"
                              }
                              style={{ marginBottom: "-1rem" }}
                            >
                              Registeration full
                            </h6>
                          )}
                        </div>
                      ) : (
                        <span />
                      )
                    ) : (
                      <div className="col-sm-12">
                        <h6
                          className="green white-text center p-3 w-100"
                          style={{ marginBottom: "-1rem" }}
                        >
                          <Link to="/login" className="white-text">
                            Login to register
                          </Link>
                        </h6>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row grey lighten-2">
          <div className="col-sm-12">
            <span
              flat
              waves="light"
              className="bold p-3 d-inline-block tournament-tabs ml-8"
              onClick={() => this.handleTabs("info")}
            >
              Information
            </span>
            <span
              flat
              waves="light"
              className="bold p-3 d-inline-block tournament-tabs"
              onClick={() => this.handleTabs("participants")}
            >
              Participlants
            </span>
            <span
              flat
              waves="light"
              className="bold p-3 d-inline-block tournament-tabs"
              onClick={() => this.handleTabs("result")}
            >
              Result
            </span>
            <span
              flat
              waves="light"
              className="bold p-3 d-inline-block tournament-tabs"
              onClick={() => this.handleTabs("feedback")}
            >
              Feedback
            </span>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            {this.state.tab === "info" ? (
              <Info tournament={tournament} />
            ) : (
              <span />
            )}
          </div>
          <div className="col-sm-12">
            {this.state.tab === "participants" ? (
              <Participants tournament={tournament} />
            ) : (
              <span />
            )}
          </div>
          <div className="col-sm-12">
            {!getCurrentUser() && this.state.tab === "result" ? (
              this.props.history.push("login")
            ) : this.state.tab === "result" ? (
              <Result tournament={tournament} />
            ) : (
              <span />
            )}
            {/* {this.state.tab === "result" ? (
              <Result tournament={tournament} />
            ) : (
              <span />
            )} */}
          </div>
          <div className="col-sm-12">
            {!getCurrentUser() && this.state.tab === "feedback" ? (
              this.props.history.push("login")
            ) : this.state.tab === "feedback" ? (
              <Feedback tournament={tournament} />
            ) : (
              <span />
            )}
          </div>
          <div className="col-sm-12">
            {this.state.tab === "register" ? (
              <RegisterTournamentWrapper tournament={tournament} />
            ) : (
              <span />
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  tournaments: state.tournament,
});

const mapDispatchToProps = (dispatch) => ({
  fetchTournamentList: () => fetchTournamentList(dispatch),
});

const TournamentWrapper = connect(
  mapStateToProps,
  mapDispatchToProps
)(Tournament);

export default TournamentWrapper;

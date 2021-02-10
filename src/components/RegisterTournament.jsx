import React, { Component } from "react";
import { TextInput, Button } from "react-materialize";
import Payment from "../components/Payment" //payment code
import { getCurrentUser } from "../auth/authentication";
import { registerTournament } from "../redux/actionCreaters/tournamentActionCreator";
import { connect } from "react-redux";
import SimpleReactValidator from "simple-react-validator";

class RegisterTournament extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerParticipants: {
        user: getCurrentUser()._id,
        name: "",
        email: "",
      },
      teamParticipants: {
        user: getCurrentUser()._id,
        teamName: "",
        captainEmail: "",
        players: [],
      },
    };
  }

  validator = new SimpleReactValidator({ autoForceUpdate: this });

  validateForm = (e) => {
    this.validator.showMessageFor(e.target.name);
  };

  handlePlayerTextChange = (e) => {
    const playerParticipants = { ...this.state.playerParticipants };

    const field = e.target.name;
    playerParticipants[field] = e.target.value;

    this.setState({
      playerParticipants: playerParticipants,
    });
  };

  handleTeamTextChange = (e, index) => {
    const teamParticipants = { ...this.state.teamParticipants };

    const field = e.target.name;
    console.log(field);
    teamParticipants.players[index][field] = e.target.value; //players k 0 index pa obj (name or phone ka)
    console.log(teamParticipants);
    this.setState({
      teamParticipants: teamParticipants,
    });
  };
  handleTextChange = (e) => {
    const teamParticipants = { ...this.state.teamParticipants };

    const field = e.target.name;

    teamParticipants[field] = e.target.value;

    this.setState({
      teamParticipants: teamParticipants,
    });
  };

  handleSubmit = async (tournament) => {
    if (tournament.participantsType === "players") {
      tournament.playerParticipants.push(this.state.playerParticipants);
    } else {
      tournament.teamParticipants.push(this.state.teamParticipants); // tournament ma jo teamParticipants os ma state push kr rha
    }

    await this.props.registerTournament(tournament);
    console.log(this.props);
    // this.props.history.push({
    //   pathname: '/tournament',
    //   tournament: tournament
    //  });
  };

  // pushing name phone into states using players num
  componentDidMount() {
    const { tournament } = this.props;
    let temp = { ...this.state.teamParticipants };
    for (let i = 0; i < tournament.players; i++) {
      let name = "name" + (i + 1); //name1
      let phone = "phone" + (i + 1); //phone1
      temp.players.push({ [name]: "", [phone]: "" }); //{name1: '', phone1: ''}
    }
    this.setState({ teamParticipants: temp });
  }

  render() {
    if (getCurrentUser() === null) {
      return (
        <div
          className="p-4 orange lighten-5 m-4"
          style={{ border: "1px solid orange" }}
        >
          <p className="bold orange-text">Login Required</p>
          <p className="orange-text">
            You must be logged in to register to a tournament.
          </p>
        </div>
      );
    }
    const { tournament } = this.props;
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="container">
              <div className="row">
                <div className="col-sm-12">
                  <h2 className="center">Registration form</h2>
                </div>
                <div className="col-sm-12">
                  {tournament.participantsType === "players" ? (
                    <>
                      <TextInput
                        label="Name"
                        value={this.state.playerParticipants.name}
                        name="name"
                        onChange={(e) => this.handlePlayerTextChange(e)}
                        onBlur={(e) => this.validateForm(e)}
                      />
                      {this.validator.message(
                        "name",
                        this.state.playerParticipants.name,
                        "required|min:3"
                      )}
                      <TextInput
                        label="Email"
                        value={this.state.playerParticipants.email}
                        name="email"
                        onChange={(e) => this.handlePlayerTextChange(e)}
                        onBlur={(e) => this.validateForm(e)}
                      />
                      {this.validator.message(
                        "email",
                        this.state.playerParticipants.email,
                        "required|email"
                      )}
                      {/* payment code here */}

                      {tournament.isChecked ?
                        <Payment tournament={tournament} />
                        : <span></span>}
                    </>
                  ) : (
                      <>
                        <TextInput
                          value={this.state.teamParticipants.teamName}
                          name="teamName"
                          label="Team Name"
                          onChange={(e) => this.handleTextChange(e)}
                          onBlur={(e) => this.validateForm(e)}
                        />
                        {this.validator.message(
                          "teamName",
                          this.state.teamParticipants.teamName,
                          "required|min:3"
                        )}
                        <TextInput
                          label="Captain Email"
                          value={this.state.teamParticipants.captainEmail}
                          name="captainEmail"
                          onChange={(e) => this.handleTextChange(e)}
                          onBlur={(e) => this.validateForm(e)}
                        />
                        {this.validator.message(
                          "captainEmail",
                          this.state.teamParticipants.captainEmail,
                          "required|email"
                        )}
                        {/* map according to state */}
                        {this.state.teamParticipants.players.map(
                          (player, index) => (
                            <div key={index}>
                              <h5>Player {index + 1}</h5>
                              <TextInput
                                label={index === 0 ? "Name (Captain)" : "Name"}
                                s={12}
                                m={6}
                                id={"name" + index}
                                value={player.name}
                                name={"name" + (index + 1)}
                                onChange={(e) =>
                                  this.handleTeamTextChange(e, index)
                                }
                              //onBlur={(e) => this.validateForm(e)}
                              />
                              {/* {this.validator.message(
                              "name" + (index + 1),
                              player.name,
                              "required"
                            )} */}
                              <TextInput
                                label={index === 0 ? "Phone (Captain)" : "Phone"}
                                s={12}
                                m={6}
                                id={"phone" + index}
                                value={player.phone}
                                name={"phone" + (index + 1)}
                                onChange={(e) =>
                                  this.handleTeamTextChange(e, index)
                                }
                              //onBlur={(e) => this.validateForm(e)}
                              />
                              {/* {this.validator.message(
                              "phone" + (index + 1),
                              player.phone,
                              "required"
                            )} */}
                            </div>
                          )
                        )}
                        {/* payment code here */}

                        {tournament.isChecked ?
                          <Payment tournament={tournament} />
                          : <span></span>}
                      </>
                    )}
                  <Button
                    className="green"
                    onClick={() => this.handleSubmit(tournament)}
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  registerTournament: (tournament) => registerTournament(dispatch, tournament),
});

const RegisterTournamentWrapper = connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterTournament);
export default RegisterTournamentWrapper;

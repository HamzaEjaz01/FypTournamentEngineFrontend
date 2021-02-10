import React, { Component } from "react";
import {
  fetchMyTournaments,
  deleteMyTournament,
} from "../redux/actionCreaters/tournamentActionCreator";
import { connect } from "react-redux";
import { Table, Button } from "react-materialize";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

class MyTournaments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myTournaments: this.props.tournaments,
    };
  }

  async componentDidMount() {
    await this.props.fetchMyTournaments();
    this.setState({
      myTournaments: this.props.tournaments,
    });
  }

  handleDelete = (tournament) => {
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure you want to delete this tournament",
      buttons: [
        {
          label: "Yes",
          onClick: () => this.props.deleteMyTournament(tournament),
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  render() {
    const myTournaments = this.props.tournaments;

    if (myTournaments.length === 0) {
      return (
        <div className="container">
          <div className="row">
            <div className="col-ms-12">
              <h2 className="m-3">My Tournaments</h2>
            </div>
            <div className="col-sm-12">
              <div
                className="p-4 green lighten-5 m-4"
                style={{ border: "1px solid green" }}
              >
                <p className="green-text">
                  You have not organized any tournament yet{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-ms-12">
            <h2 className="m-3">My Tournaments</h2>
          </div>
          <div className="col-sm-12">
            <Table>
              <thead>
                <tr>
                  <th>Tournament Name</th>
                  <th>Date</th>
                  <th>Participants</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {myTournaments.length !== 0 &&
                  myTournaments.map((tournament, index) => (
                    <tr key={index}>
                      <td>
                        <Link
                          className="black-text hover"
                          to={{
                            pathname: "/tournament",
                            tournament: tournament,
                          }}
                        >
                          {tournament.name}
                        </Link>
                      </td>
                      <td>
                        {new Date(tournament.startDate).toDateString()} -{" "}
                        {new Date(tournament.endDate).toDateString()}
                      </td>
                      <td>
                        {tournament.participantsType === "teams"
                          ? `${tournament.teamParticipants.length} / ${tournament.teams} `
                          : `${tournament.playerParticipants.length} / ${tournament.players} `}
                      </td>
                      <td>{tournament.status}</td>
                      <td>
                        <Button
                          disabled={
                            !(
                              new Date(tournament.organizeDate).getTime() +
                                (tournament.tournamentType === "Sports"
                                  ? 86400000
                                  : 43200000) >
                              new Date().getTime()
                            )
                          }
                          className="green ml-r white-text"
                        >
                          <Link
                            className="white-text"
                            to={{
                              pathname: "/organize",
                              tournament: tournament,
                              update: true,
                            }}
                          >
                            Update
                          </Link>
                        </Button>

                        <Button
                          disabled={
                            !(
                              new Date(tournament.organizeDate).getTime() +
                                (tournament.tournamentType === "Sports"
                                  ? 86400000
                                  : 43200000) >
                              new Date().getTime()
                            )
                          }
                          className="red  white-text ml-2"
                          onClick={() => this.handleDelete(tournament)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  tournaments: state.tournament,
});

const mapDispatchToProps = (dispatch) => ({
  fetchMyTournaments: () => fetchMyTournaments(dispatch),
  deleteMyTournament: (tournament) => deleteMyTournament(dispatch, tournament),
});

const MyTournamentsWrapper = connect(
  mapStateToProps,
  mapDispatchToProps
)(MyTournaments);
export default MyTournamentsWrapper;

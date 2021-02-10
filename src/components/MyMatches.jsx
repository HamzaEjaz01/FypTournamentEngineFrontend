import React, { Component } from "react";
import {
  fetchMyMatches,
  deleteMyMatch,
} from "../redux/actionCreaters/tournamentActionCreator";
import { connect } from "react-redux";
import { Table, Button } from "react-materialize";
import { Link } from "react-router-dom";
//import { getCurrentUser } from "./../auth/authentication";

class MyMatches extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myMatches: [],
    };
  }

  async componentDidMount() {
    await this.props.fetchMyMatches();
    // awain aa
    this.setState({
      myMatches: this.props.tournaments,
    });
  }

  handleDelete = (tournament) => {
    this.props.deleteMyMatch(tournament);
  };

  render() {
    const myMatches = this.props.tournaments;
    //console.log(myMatches);

    if (myMatches.length === 0) {
      return (
        <div className="container">
          <div className="row">
            <div className="col-ms-12">
              <h2 className="m-3">My Mataches</h2>
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
          <div className="col-sm-12">
            <h2 className="mt-5">My Matches</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <Table>
              <thead>
                <tr>
                  <th>Tournament Name</th>
                  <th>Date</th>
                  <th>Participants</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {myMatches.length !== 0 &&
                  myMatches.map((tournament, index) => (
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
                        {new Date(tournament.startDate).toDateString()}-{" "}
                        {new Date(tournament.endDate).toDateString()}
                      </td>
                      <td>
                        {tournament.participantsType === "teams"
                          ? `${tournament.teamParticipants.length} / ${tournament.teams} `
                          : `${tournament.playerParticipants.length} / ${tournament.players} `}
                      </td>
                      <td>
                        {new Date(tournament.endDate).getTime() >
                        new Date().getTime() ? (
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
                            className="red white-text"
                            onClick={() => this.handleDelete(tournament)}
                          >
                            Unregister
                          </Button>
                        ) : (
                          <span>Tournament is over</span>
                        )}
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
  fetchMyMatches: () => fetchMyMatches(dispatch),
  deleteMyMatch: (tournament) => deleteMyMatch(dispatch, tournament),
});

const MyMatchesWrapper = connect(
  mapStateToProps,
  mapDispatchToProps
)(MyMatches);
export default MyMatchesWrapper;

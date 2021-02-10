import React, { Component } from "react";
import {
  fetchPendingTournaments,
  approve_dissapprove,
} from "../redux/actionCreaters/tournamentActionCreator";
import { connect } from "react-redux";
import { Table, Button } from "react-materialize";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import "../css/common.css";

class PendingTournaments extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.fetchPendingTournaments();
  }

  handleStatusChange = async (tournament, status) => {
    tournament.status = status;
    //await this.props.updateTournamnt(tournament);
    await this.props.approve_dissapprove(tournament);
    await this.props.fetchPendingTournaments();
    toast.dark(`Tournament ${status}`);
  };

  render() {
    const pendingTournaments = this.props.tournaments;

    if (pendingTournaments.length === 0) {
      return (
        <div className="container">
          <div className="row">
            <div className="col-ms-12">
              <h2 className="m-3">Pending Tournaments</h2>
            </div>
            <div className="col-sm-12">
              <div
                className="p-4 green lighten-5 m-4"
                style={{ border: "1px solid green" }}
              >
                <p className="green-text">No pending tournaments </p>
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
            <h2 className="m-3">Pending Tournaments</h2>
          </div>
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
                {pendingTournaments.length !== 0 &&
                  pendingTournaments.map((tournament, index) => (
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
                      <td>
                        <Button
                          className="green white-text"
                          onClick={() =>
                            this.handleStatusChange(tournament, "approved")
                          }
                        >
                          Approve
                        </Button>
                        <Button
                          className="red  white-text ml-2"
                          onClick={() =>
                            this.handleStatusChange(tournament, "disapproved")
                          }
                        >
                          Disapprove
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
  fetchPendingTournaments: () => fetchPendingTournaments(dispatch),
  approve_dissapprove: (tournament) => approve_dissapprove(tournament),
});

const PendingTournamentsWrapper = connect(
  mapStateToProps,
  mapDispatchToProps
)(PendingTournaments);
export default PendingTournamentsWrapper;

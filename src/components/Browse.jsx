import React, { Component } from "react";
import { TextInput, Select, Table } from "react-materialize";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { connect } from "react-redux";
import { fetchTournamentList } from "../redux/actionCreaters/tournamentActionCreator";
import "react-tabs/style/react-tabs.css";
import { Link } from "react-router-dom";

class Browse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tournamentType: "Sports",
      tournaments: [],
    };
  }

  componentDidMount = async () => {
    await this.props.fetchTournamentList();
    this.setState({
      tournaments: this.props.tournaments,
    });
  };

  handleSearch = (e) => {
    let tournaments = [...this.props.tournaments];
    console.log(
      tournaments.map((tournament) => tournament.name.includes(e.target.value))
    );
    let output = tournaments.filter((tournament) =>
      tournament.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    this.setState({
      tournaments: output,
    });
  };
  handleSelect = (e) => {
    this.setState({
      tournamentType: e.target.value,
    });
  };
  render() {
    const { tournaments } = this.state;

    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-6 center">
            <img
              className="mt-4 pt-4"
              src="images/logo.svg"
              alt="logo"
              width="250px"
            />
          </div>
          <div className="col-sm-12 col-md-6">
            <div className="row mt-4">
              <div className="col-sm-4">
                <Select
                  id="Select-988"
                  multiple={false}
                  onChange={(e) => this.handleSelect(e)}
                  options={{
                    classes: "",
                  }}
                  value={this.state.tournamentType}
                >
                  <option value="Sports">Sports</option>
                  <option value="Game">Games</option>
                </Select>
              </div>
              <div className="col-sm-6">
                <TextInput
                  className=""
                  placeholder="Search"
                  onChange={(e) => this.handleSearch(e)}
                />
              </div>

            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <Tabs>
              <TabList>
                <Tab>Open</Tab>
                <Tab>Past</Tab>
              </TabList>

              <TabPanel>
                <BrowseTable
                  tournaments={tournaments.filter(
                    (tournament) =>
                      new Date(tournament.endDate).getTime() >
                      new Date().getTime() &&
                      tournament.tournamentType === this.state.tournamentType
                  )}
                />
              </TabPanel>
              <TabPanel>
                <BrowseTable
                  tournaments={tournaments.filter(
                    (tournament) =>
                      new Date(tournament.endDate).getTime() <=
                      new Date().getTime() &&
                      tournament.tournamentType === this.state.tournamentType
                  )}
                />
              </TabPanel>
            </Tabs>
          </div>
        </div>
      </div>
    );
  }
}

const BrowseTable = ({ tournaments }) => {
  return (
    <Table>
      <thead>
        <tr>
          <th>Tournament Name</th>
          <th>Date</th>
          <th>Participants</th>
          <th>Register Status</th>
        </tr>
      </thead>
      <tbody>
        {tournaments.map((tournament, index) => (
          <tr key={index}>
            <td>
              <Link className="black-text hover" to={{
                pathname: "/tournament",
                tournament: tournament,
              }}>
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
              {new Date(tournament.endDate).getTime() > new Date().getTime() ? (
                <Link
                  to={{
                    pathname: "/tournament",
                    tournament: tournament,
                  }}
                >
                  Registrations Open
                </Link>
              ) : (
                  <span>Registration closed</span>
                )}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

const mapStateToProps = (state) => ({
  tournaments: state.tournament,
});

const mapDispatchToProps = (dispatch) => ({
  fetchTournamentList: () => fetchTournamentList(dispatch),
});

const BrowseWrapper = connect(mapStateToProps, mapDispatchToProps)(Browse);
export default BrowseWrapper;

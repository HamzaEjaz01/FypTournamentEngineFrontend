import React, { Component } from "react";
import { CardPanel } from "react-materialize";
import OrganizeForm from "./OrganizeForm";
import { connect } from "react-redux";
import {
  addTournament,
  updateTournament,
} from "../redux/actionCreaters/tournamentActionCreator";
import { getCurrentUser } from "../auth/authentication";
import { toast } from "react-toastify";
class Organize extends Component {
  getTournamentState = () => {
    return this.props.location.tournament
      ? this.props.location.tournament
      : {
          organizer: getCurrentUser()._id,
          status: getCurrentUser().isAdmin ? "approved" : "pending",
          tournamentType: "",
          name: "",
          image: "",
          gameName: "",
          platform: "",
          avenue: "",
          email: "",
          participantsType: "teams",
          teams: 0,
          players: 0,
          isChecked: "", //payment code
          entryfee: 0,
          timezone: "Asia/Karachi",
          startDate: "",
          endDate: "",
          startTime: "",
          organizeDate: new Date(),
          prize: 0,
          result: "",
        };
  };
  constructor(props) {
    super(props);
    console.log(this.props.location);
    this.state = {
      tournament: this.getTournamentState(),
      dateErrors: {},
    };
  }

  handleCreateTournament = (value) => {
    const tournament = { ...this.state.tournament };
    tournament["tournamentType"] = value;
    this.setState({
      tournament: tournament,
    });
  };
  handleTextChange = (e) => {
    const tournament = { ...this.state.tournament };

    const field = e.target.name;

    tournament[field] = e.target.value;
    console.log(e.target.value);
    this.setState({
      tournament: tournament,
    });
  };
  //payment code
  handleChecked = (e) => {
    const tournament = { ...this.state.tournament };
    tournament["isChecked"] = e.target.checked;
    this.setState({
      tournament: tournament,
    });
    console.log(tournament.isChecked);
  };
  handleTimezone = (timezone) => {
    const tournament = { ...this.state.tournament };
    tournament["timezone"] = timezone;
    this.setState({
      tournament: tournament,
    });
  };

  handleDatePicker = (feild, date) => {
    const tournament = { ...this.state.tournament };
    const dateErrors = { ...this.state.dateErrors };
    let now = new Date();

    //Date validation
    console.log(feild);
    console.log(date);
    if (feild === "startDate") {
      if (date.getTime() < now.getTime() + 86400000 * 3) {
        console.log("Start date should be at least 3 days later from now");
        dateErrors.startDate =
          "Start date should be at least 3 days later from now";
      } else {
        delete dateErrors.startDate;
      }
    } else if (feild === "endDate") {
      if (!(date.getTime() > tournament.startDate.getTime())) {
        console.log("End Date should be greater than start date");
        dateErrors.endDate = "End Date should be greater than start date";
      } else {
        delete dateErrors.endDate;
      }
    }

    tournament[feild] = date;
    this.setState({
      tournament: tournament,
      dateErrors,
    });
  };

  handleImageSelect = (e) => {
    const images = e.target.files;
    let tournament = { ...this.state.tournament };

    for (let i = 0; i < images.length; i++) {
      //Make new file reader
      let reader = new FileReader();

      //Convert the file to base64
      reader.readAsDataURL(images[i]);

      //On reader load something
      reader.onload = () => {
        let imageInfo = {
          name: images[i].name,
          type: images[i].type,
          size: images[i].size,
          base64: reader.result,
        };

        tournament.image = imageInfo;
        this.setState({ tournament });

        return;
      };
    }
  };

  handleSubmit = (validator) => {
    // console.log(this.state.tournament)
    // console.log(validator.allValid())
    // console.log(Object.keys(this.state.dateErrors).length === 0)
    if (
      validator.allValid() &&
      Object.keys(this.state.dateErrors).length === 0
    ) {
      this.props.addTournament(this.state.tournament);
      this.setState({
        tournament: this.getTournamentState(),
      });
    } else {
      validator.showMessages();
      toast.dark("Please fill all the fields correctly");
    }
  };

  handleUpdate = (validator) => {
    if (
      validator.allValid() &&
      Object.keys(this.state.dateErrors).length === 0
    ) {
      this.props.updateTournament(this.state.tournament);
      this.setState({
        tournament: this.getTournamentState(),
      });
    } else {
      validator.showMessages();
      toast.dark("Please fill all the fields correctly");
    }
  };

  render() {
    //console.log("Update: ", this.props.location.update)
    const update = this.props.location.update || false;
    const { tournament } = this.state;
    console.log(tournament);
    return (
      <>
        {tournament.tournamentType === "" ? (
          <div className=" grey lighten-4" style={{ height: "700px" }}>
            <div className="container">
              <div className="row">
                <div className="col-sm-12">
                  <div className="center m-5">
                    <i
                      className="fa fa-trophy mr-4"
                      aria-hidden="true"
                      style={{ fontSize: "35px" }}
                    ></i>
                    <h1 className="center" style={{ display: "inline-block" }}>
                      Create Tournaments
                    </h1>
                  </div>
                </div>
                <div className="col-sm-6">
                  <CardPanel className="center tournament-organize-box">
                    <div
                      className="m-5"
                      onClick={() => this.handleCreateTournament("Sports")}
                    >
                      <i
                        className="fa fa-plus green-text"
                        aria-hidden="true"
                        style={{ fontSize: "50px" }}
                      ></i>
                      <h3 className="grey-text text-darken-3">
                        Create Sports Tournament
                      </h3>
                    </div>
                  </CardPanel>
                </div>
                <div className="col-sm-6">
                  <CardPanel className="center tournament-organize-box ">
                    <div
                      className="m-5"
                      onClick={() => this.handleCreateTournament("Game")}
                    >
                      <i
                        className="fa fa-plus green-text"
                        aria-hidden="true"
                        style={{ fontSize: "50px" }}
                      ></i>
                      <h3 className="grey-text text-darken-3">
                        Create Game Tournament
                      </h3>
                    </div>
                  </CardPanel>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <OrganizeForm
            tournament={tournament}
            update={update}
            handleCreateTournament={this.handleCreateTournament}
            handleTextChange={this.handleTextChange}
            handleChecked={this.handleChecked} //payment
            handleDatePicker={this.handleDatePicker}
            handleImageSelect={this.handleImageSelect}
            handleTimezone={this.handleTimezone}
            handleSubmit={this.handleSubmit}
            handleUpdate={this.handleUpdate}
            dateErrors={this.state.dateErrors}
          />
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  tournament: state.tournament,
});

const mapDispatchToProps = (dispatch) => ({
  addTournament: (tournament) => addTournament(dispatch, tournament),
  updateTournament: (tournament) => updateTournament(dispatch, tournament),
});

const OrganizeWrapper = connect(mapStateToProps, mapDispatchToProps)(Organize);
export default OrganizeWrapper;

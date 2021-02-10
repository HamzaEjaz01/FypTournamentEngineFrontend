import React, { Component } from "react";
import { Button, Textarea } from "react-materialize";
import { connect } from "react-redux";
import { uploadResult } from "../redux/actionCreaters/tournamentActionCreator";
import { toast } from "react-toastify";
import { getCurrentUser } from "./../auth/authentication";

class Result extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: "",
      tournament: this.props.tournament,
    };
  }

  // refresh pa props ma tournament urr jata to isko local ma save kralay
  componentDidMount() {
    let routeState = null;
    if (this.props.tournament) {
      localStorage.setItem("routeState", JSON.stringify(this.props.tournament)); // whole tour into one string
      routeState = this.props.tournament;
    } else {
      routeState = localStorage.getItem("routeState"); // peecha sa nai ari refresh hua to local storage sa get krlo
      if (routeState) routeState = JSON.parse(routeState);
    }

    this.setState({
      tournament: routeState,
    });
  }

  handleSubmit = async (tournament) => {
    try {
      tournament.result = this.state.result;
      console.log(tournament);
      await this.props.uploadResult(tournament);
      this.setState({
        tournament: tournament,
      });
      //Reset field..
      const resetResult = {
        result: "",
      };
      this.setState({
        result: resetResult,
      });

      //Display Message
      toast.dark("Result Uploaded");
    } catch (error) {
      console.log(error);
    }
  };

  uploadResultRender = (tournament) => {
    return (
      <>
        <h4>Upload Result</h4>
        <Textarea
          value={this.state.result}
          placeholder="Upload result"
          onChange={(e) => this.setState({ result: e.target.value })}
        />
        <Button
          className="blue white-text"
          onClick={() => this.handleSubmit(tournament)}
        >
          Upload
        </Button>
      </>
    );
  };

  resultRender = (tournament) => {
    return (
      <h6>
        <h5 className="bold">Result:</h5> {tournament.result}
      </h6>
    );
  };

  pendingResultRender = () => {
    return (
      <div
        className="p-4 blue lighten-5 m-4"
        style={{ border: "1px solid #5566ff" }}
      >
        <p className="bold blue-text">Result</p>
        <p className="blue-text">The result is pending</p>
      </div>
    );
  };

  render() {
    let { tournament } = this.props;

    return (
      // <p>Pending...</p>
      <>
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              {tournament.result === ""
                ? tournament.organizer === getCurrentUser()._id
                  ? this.uploadResultRender(tournament)
                  : this.pendingResultRender()
                : this.resultRender(tournament)}
            </div>
          </div>
        </div>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  tournaments: state.tournament,
});

const mapDispatchToProps = (dispatch) => ({
  uploadResult: (tournament) => uploadResult(dispatch, tournament),
});

const ResultWrapper = connect(mapStateToProps, mapDispatchToProps)(Result);
export default ResultWrapper;

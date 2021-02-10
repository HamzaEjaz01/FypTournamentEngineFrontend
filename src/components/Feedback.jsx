import React, { Component } from "react";
import { TextInput } from "react-materialize";
import { getCurrentUser } from "../auth/authentication";
import { connect } from "react-redux";
import { sendFeedback } from "../redux/actionCreaters/tournamentActionCreator";
import { toast } from "react-toastify";

class Feedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feedback: {
        name: getCurrentUser().name,
        comment: "",
      },
      tournament: this.props.tournament,
    };
  }


  handleTextChange = (e) => {
    const feedback = { ...this.state.feedback };

    const field = e.target.name;

    feedback[field] = e.target.value;
    console.log(e.target.value);
    this.setState({
      feedback: feedback,
    });
  };

  componentDidMount() {
    console.log("In cdm..........")
    let routeState = null;
    if (this.props.tournament) {
      localStorage.setItem('routeState', JSON.stringify(this.props.tournament))
      routeState = this.props.tournament
    } else {
      routeState = localStorage.getItem('routeState')
      if (routeState) routeState = JSON.parse(routeState)
    }


    this.setState({
      tournament: routeState,
    });
  }

  handleKeyPress = (e, tournament) => {
    if (e.key === "Enter") {
      tournament.feedback.push(this.state.feedback);
      this.props.sendFeedback(tournament);
      this.setState({
        tournament: tournament,
      });
      //Reset field..
      const resetFeedback = {
        name: getCurrentUser().name,
        comment: "",
      }
      this.setState({
        feedback: resetFeedback
      })

      //Display Message
      toast.dark("Comment posted")
    }
  };

  render() {
    console.log("In render", this.props.tournament);
    let { tournament } = this.props;
    let { feedback } = this.state;

    return (
      // <p>Pending...</p>
      <>
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <TextInput
                value={feedback.comment}
                placeholder="Write your comments"
                name="comment"
                onKeyPress={(e) => this.handleKeyPress(e, tournament)}
                onChange={(e) => this.handleTextChange(e)}
              />

            </div>
            <div className="col-sm-12">
              {tournament.feedback.reverse().map((feedback) => (
                <div className="col-sm-12">
                  <h5 className="bold mt-3 grey-text text-darken-3">
                    {feedback.name}:{" "}
                  </h5>
                  <span className="d-inline-block mb-2 grey-text text-darken-2">
                    {feedback.comment}
                  </span>
                </div>
              ))}
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
  sendFeedback: (tournament) => sendFeedback(dispatch, tournament),
});

const FeebacksWrapper = connect(mapStateToProps, mapDispatchToProps)(Feedback);
export default FeebacksWrapper;

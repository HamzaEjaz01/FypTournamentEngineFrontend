import React, { Component } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.css";
import "../css/common.css";
import { Button } from "react-materialize";
import { connect } from "react-redux";
import { fetchTournamentList } from "../redux/actionCreaters/tournamentActionCreator";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Features from "./Features";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.fetchTournamentList();
  }
  render() {
    const tournaments = this.props.tournaments;
    //console.log(tournaments);
    return (
      <>
        <Carousel
          className="carousel-style"
          showStatus={false}
          //showArrows={false}
          showThumbs={false}
        >
          {tournaments.map((tournament, index) => (
            <div key={index}>
              <img
                src={tournament.image.base64}
                alt="tournament-pic"
                height="650px"
              />
              <Link
                to={{
                  pathname: "/tournament",
                  tournament: tournament,
                }}
              >
                <div className="legend bold">
                  <h1 className="mt-4 bold white-text">{tournament.name}</h1>
                  <h2 className="mt-4 white-text">{tournament.gameName}</h2>
                  <h4 className="bold white-text">
                    {new Date(tournament.startDate).toLocaleDateString()} -
                    {new Date(tournament.endDate).toLocaleDateString()}
                  </h4>
                  <h5 className="bold white-text">{tournament.startTime}</h5>
                </div>
              </Link>
            </div>
          ))}
        </Carousel>
        {/* <div className="container">
          <div className="row center m-7">
            <div className="col-sm-12">
              <h2>Why Tournament Engine</h2>
            </div>
            <div className="col-sm-12">
              <h5>
                Organize, manage and share your competitions with Tournament.
              </h5>
            </div>
          </div>
          <div className="row center m-4">
            <div className="col-sm-12 col-md-4">
              <div className="row">
                <div className="col-sm-12">
                  <img
                    src="https://images.prismic.io/toornament%2F4ae43b40-e689-4ea8-bb8a-687637c8ee02_engine-min.png?auto=compress,format"
                    alt="logo"
                  />
                </div>
                <div className="col-sm-12">
                  <p className="bold grey-text text-darken-3">
                    State-of-the-art Tournament Engine
                  </p>
                </div>
                <div className="col-sm-12">
                  <p className="grey-text text-darken-2">
                    From brackets to battle royale rankings, pick and combine
                    our formats for up to 4,096 participants.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-md-4">
              <div className="row">
                <div className="col-sm-12">
                  <img
                    src="https://images.prismic.io/toornament%2F1024a794-280b-4717-b9cb-3d5bffd03331_player-min.png?auto=compress,format"
                    alt="logo"
                  />
                </div>
                <div className="col-sm-12">
                  <p className="grey-text text-darken-3 bold">
                    Manage Your Players, Own Your Data
                  </p>
                </div>
                <div className="col-sm-12">
                  <p className="grey-text text-darken-2">
                    Gather useful data from your participants, it is yours to
                    export and process at any time.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-md-4">
              <div className="row">
                <div className="col-sm-12">
                  <img
                    src="https://images.prismic.io/toornament%2Fd45e88be-a03e-4d8a-b481-4103f56afc66_sharing-min.png?auto=compress,format"
                    alt="logo"
                  />
                </div>
                <div className="col-sm-12">
                  <p className="grey-text text-darken-3 bold">
                    Increase the Reach of Your Tournament
                  </p>
                </div>
                <div className="col-sm-12">
                  <p className="grey-text text-darken-2">
                    Share your tournament information thanks to our embeddable
                    widgets and our live TV module.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        {/* Features */}
        <Features />
        {/* Overview */}
        <div id="overview" className="container" style={{ marginTop: "5rem" }}>
          <div className="row m-5">
            <div className="col-sm-12 center">
              <h1>Overview</h1>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12 col-md-6 mt-5">
              <h1 className="grey-text text-darken-3 pb-4">
                Lets take your events to the next level
              </h1>
              <h4 className="grey-text text-darken-2 my-4 pt-4">
                Organize your Gaming and Sports tournaments with
                <span className="blue-text">Tournament Engine</span>
              </h4>
              <Button className="my-5 blue white-text">
                <Link to="/organize" className="white-text">
                  Lets Organize
                </Link>
              </Button>
            </div>
            <div className="col-sm-12 col-md-6 mt-4">
              <img
                className="overview-animated"
                src="images/overview1.jpeg"
                alt="overviewimage"
                width="100%"
                height="auto"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  tournaments: state.tournament,
});

const mapDispatchToProps = (dispatch) => ({
  fetchTournamentList: () => fetchTournamentList(dispatch),
});

const HomeWrapper = connect(mapStateToProps, mapDispatchToProps)(Home);
export default HomeWrapper;

import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Topbar from "./components/Topbar";
import Home from "./components/Home";
import Organize from "./components/Organize";
import OrganizeForm from "./components/OrganizeForm";
import Login from "./components/Login";
import { getCurrentUser } from "./auth/authentication";
import { ToastContainer } from "react-toastify";
import SignupWrapper from "./components/Signup";
import "react-toastify/dist/ReactToastify.css";
import Browse from "./components/Browse";
import Logout from "./components/Logout";
import MyTournamentsWrapper from "./components/MyTournaments";
import MyMatchesWrapper from "./components/MyMatches";
import PendingTournamentsWrapper from "./components/PendingTournaments";
import Forgot from "./components/Forgot";
import UsersWrapper from "./components/Users";
import ProtectedRoute from "./components/ProtectedRoutes";
import Tournament from "./components/Tournament";
import SellItemWrapper from "./components/Sell";
import BuyItemWrapper from "./components/Buy";
import Item from "./components/item";
import MyItemsWrapper from "./components/myitems";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }
  componentDidMount() {
    const user = getCurrentUser();
    //console.log(user);
    if (user) this.setState({ user });
  }
  render() {
    return (
      <div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Topbar user={this.state.user} />
        <Switch>
          <Route exact path="/" component={Home} />
          <ProtectedRoute path="/organize" component={Organize} />
          <ProtectedRoute path="/organizeform" component={OrganizeForm} />
          <Route path="/browse" component={Browse} />
          <Route path="/tournament" component={Tournament} />
          <ProtectedRoute
            path="/mytournaments"
            component={MyTournamentsWrapper}
          />
          <ProtectedRoute path="/mymatches" component={MyMatchesWrapper} />
          <ProtectedRoute
            path="/pendingtournaments"
            component={PendingTournamentsWrapper}
          />
          <ProtectedRoute path="/users" component={UsersWrapper} />
          <Route path="/signup" component={SignupWrapper} />
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
          <Route path="/forgot" component={Forgot} />
          <ProtectedRoute exact path="/item" component={Item} />
          <ProtectedRoute exact path="/buyitem" component={BuyItemWrapper} />
          <ProtectedRoute exact path="/sellitem" component={SellItemWrapper} />
          <ProtectedRoute exact path="/myitem" component={MyItemsWrapper} />
        </Switch>
      </div>
    );
  }
}

export default App;

import React, { Component } from "react";
import { TextInput, Button, RadioGroup } from "react-materialize";
import { Link } from "react-router-dom";
import { login } from "../auth/authentication";
import BeatLoader from "react-spinners/BeatLoader";
import "../css/common.css";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        email: "",
        password: "",
        isAdmin: false
      },
      isLoading: false,
    };
  }

  handleTextChange = (e) => {
    const user = { ...this.state.user };

    const field = e.target.name;
    console.log(user)
    if (field === "isAdmin")
      user[field] = e.target.value === 'true' ? true : false
    else
      user[field] = e.target.value;

    this.setState({
      user: user,
    });
  };

  submitForm = async () => {
    this.setState({ isLoading: true });
    try {
      await login(this.state.user);

      window.location = "/";
    } catch (error) {
      console.log(error);
    }
    this.setState({ isLoading: false });
  };

  render() {
    let { user } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-12 center">
            <img
              className="mt-4 pt-4"
              src="images/logo.svg"
              alt="logo"
              width="250px"
            />
          </div>
          <div className="col-md-6 offset-md-3">
            <div className="section">
              <div className="section-header">
                <div className="section-title-box blue">
                  <div className="section-title">
                    <h1>Login</h1>
                  </div>
                </div>
              </div>
              <div className="section-body">
                {console.log(user.isAdmin)}
                <RadioGroup
                  label=""
                  radioClassNames="blue-text mt-4 "
                  name="isAdmin"
                  value={user.isAdmin}
                  onChange={(e) => this.handleTextChange(e)}
                  options={[
                    {
                      label: "User",
                      value: false,
                    },
                    {
                      label: "Admin",
                      value: true,
                    },
                  ]}
                  withGap
                />
                <TextInput
                  value={user.email}
                  label="Email"
                  name="email"
                  onChange={(e) => this.handleTextChange(e)}
                />

                <TextInput
                  type="password"
                  value={user.password}
                  label="Password"
                  name="password"
                  onChange={(e) => this.handleTextChange(e)}
                />
              </div>
              <div className="section-footer">
                <Button
                  className="blue darken-1 white-text"
                  onClick={() => this.submitForm()}
                >
                  Login
                </Button>
                <BeatLoader
                  size={10}
                  color={"#123abc"}
                  loading={this.state.isLoading}
                />
                <Link to="/forgot" className="d-block mt-3">
                  Forgot Password
                </Link>
                <Link to="/signup" className="d-block mt-3">
                  Dont have a account? Signup
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;

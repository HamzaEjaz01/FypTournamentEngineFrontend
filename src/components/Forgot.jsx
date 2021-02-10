import React, { Component } from 'react';
import { Button, TextInput } from 'react-materialize';
import { BeatLoader } from 'react-spinners';
import { passwordRecovery } from '../redux/actionCreaters/userActionCreator';

class Forgot extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            email : "",
            isLoading: "",
         };
    }

    submitForm = async () => {
        this.setState({ isLoading: true });
        try {
          await passwordRecovery(this.state.email);

          window.location = "/login"
    
        } catch (error) {
          console.log(error);
        }
        this.setState({ isLoading: false });
      };

    render() {
        const {email} = this.state;
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
                    <h2>Password Recovery</h2>
                  </div>
                </div>
              </div>
              <div className="section-body">
                <p className="grey-text mt-4 ml-2 text-darken-2">Please enter your email, your password will be send to your email.</p>
                <TextInput
                  value={email}
                  label="Email"
                  name="email" 
                  onChange={(e) => this.setState({email : e.target.value})}
                />

              </div>
              <div className="section-footer">
                <Button
                  className="blue darken-1 white-text"
                  onClick={() => this.submitForm()}
                >
                  Send Password
                </Button>
                <BeatLoader
                  size={10}
                  color={"#123abc"}
                  loading={this.state.isLoading}
                />
                
              </div>
            </div>
          </div>
        </div>
      </div>
        );
    }
}

export default Forgot;
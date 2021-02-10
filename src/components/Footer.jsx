import React, { Component } from "react";
import { TextInput, Textarea, Button } from "react-materialize";
import axios from "axios";
import { toast } from "react-toastify";

const apiEndPoint = process.env.REACT_APP_API_URL + "/contact/";

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contact: {
        email: "",
        name: "",
        description: "",
      },
    };
  }
  handleTextChange = (e) => {
    const contact = { ...this.state.contact };
    const field = e.target.name;
    //console.log(contact);
    contact[field] = e.target.value;
    this.setState({
      contact: contact,
    });
  };
  submitForm = async () => {
    try {
      //console.log(this.state.contact);
      const { data } = await axios.post(apiEndPoint, this.state.contact);
      toast.dark(data);
    } catch (error) {
      toast.dark(error.response.data);
    }
    this.setState({
      contact: {
        email: "",
        name: "",
        description: "",
      },
    });
  };
  render() {
    const { contact } = this.state;
    return (
      <>
        <div className="container-fluid grey darken-4">
          <div className="row">
            <div className="col-sm-12 col-md-6  " style={{ marginTop: "25px" }}>
              <h5 className="white-text">Developers</h5>

              <h6 className="mt-4 ml-4 white-text">Hamza Ejaz</h6>
              <h6 className="ml-4 white-text">Abdullah Rauf</h6>
              <h6 className="ml-4 white-text">Abdul Quyyum</h6>

              <p className="grey-text text-lighten-4 mt-4">
                Toornament is the property of Webedia, all rights reserved. All
                games and associated assets are the property of their respective
                owners.
              </p>
            </div>
            <div
              className="col-sm-12 col-md-6"
              style={{
                marginTop: "25px",
                paddingLeft: "10%",
                paddingRight: "10%",
              }}
            >
              <h5 className="white-text center">Quick Contact</h5>
              <TextInput
                inputClassName="white-text"
                value={contact.email}
                label="Enter Email"
                name="email"
                onChange={(e) => this.handleTextChange(e)}
              />
              <TextInput
                inputClassName="white-text"
                value={contact.name}
                label="Enter Name"
                name="name"
                onChange={(e) => this.handleTextChange(e)}
              />
              <Textarea
                className="white-text"
                value={contact.description}
                label="Enter Message Here"
                name="description"
                onChange={(e) => this.handleTextChange(e)}
              />
              {/* <div className="row"> */}
              {/* <div col-sm-6 style={{ marginLeft: "170px" }}> */}
              <Button
                node="button"
                className="blue white-text ml-3"
                waves="light"
                //center={true}
                onClick={() => this.submitForm()}
              >
                Submit
              </Button>
              {/* </div> */}
              {/* </div> */}
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 mt-2 mt-sm-2 text-center text-white">
              <p>
                <u>
                  <a href="https://second-mern-stack.herokuapp.com/">
                    Developed By TournamentEngine Developers
                  </a>
                </u>
              </p>
              <p className="h6">
                © All right Reversed.
                <a
                  className="text-green ml-2"
                  href="https://second-mern-stack.herokuapp.com/"
                  //target="_blank"
                >
                  IT centers
                </a>
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Footer;

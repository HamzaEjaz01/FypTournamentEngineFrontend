import React, { Component } from "react";
import { TextInput, Button } from "react-materialize";
import BeatLoader from "react-spinners/BeatLoader";
import SimpleReactValidator from "simple-react-validator";
//import { addUser } from "../redux/actionCreaters/userActionCreator";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import "../css/common.css";
import { addUser, updateUser } from "../redux/actionCreaters/userActionCreator";

class Signup extends Component {
  getUserState = () => {
    return this.props.location.user
      ? this.props.location.user
      : {
          status: "unblock",
          name: "",
          email: "",
          phone: "",
          password: "",
          isAdmin: false,
        };
  };

  constructor(props) {
    super(props);
    this.state = {
      user: this.getUserState(),
      isLoading: false,
    };
  }

  validator = new SimpleReactValidator({ autoForceUpdate: this });
  handleTextChange = (e) => {
    const user = { ...this.state.user };

    const field = e.target.name;

    user[field] = e.target.value;
    console.log(e.target.value);
    this.setState({
      user: user,
    });
  };
  validateForm = (e) => {
    this.validator.showMessageFor(e.target.name);
  };
  submitForm = async () => {
    this.setState({ isLoading: true });

    if (this.validator.allValid()) {
      try {
        await this.props.addUser(this.state.user);
        //console.log(addUser);
        toast.dark("Account Created Successfully");
        this.props.history.replace("/login");
      } catch (error) {
        console.log(error);
      }
    }
    this.setState({ isLoading: false });
  };
  handleUpdate = () => {
    if (this.validator.allValid()) {
      this.props.updateUser(this.state.user);
      this.setState({
        user: this.getUserState(),
      });
    } else {
      toast.dark("Please fill all the fields correctly");
    }
  };
  render() {
    const update = this.props.location.update || false;
    let { user } = this.state;
    return (
      <div className="container ">
        <div className="row ">
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
                    <h1>Signup</h1>
                  </div>
                </div>
              </div>
              <div className="section-body">
                <TextInput
                  value={user.name}
                  label="Name"
                  name="name"
                  onChange={(e) => this.handleTextChange(e)}
                  onBlur={(e) => this.validateForm(e)}
                />
                {this.validator.message("name", user.name, "required")}
                <TextInput
                  value={user.email}
                  label="Email"
                  name="email"
                  onChange={(e) => this.handleTextChange(e)}
                  onBlur={(e) => this.validateForm(e)}
                />
                {this.validator.message("email", user.email, "required|email")}
                <TextInput
                  type="number"
                  value={user.phone}
                  label="Phone"
                  name="phone"
                  onChange={(e) => this.handleTextChange(e)}
                  onBlur={(e) => this.validateForm(e)}
                />
                {this.validator.message(
                  "phone",
                  user.phone,
                  "required|min:11|max:11|phone"
                )}
                <TextInput
                  type="password"
                  value={user.password}
                  label="Password"
                  name="password"
                  onChange={(e) => this.handleTextChange(e)}
                  onBlur={(e) => this.validateForm(e)}
                />
                {this.validator.message(
                  "password",
                  user.password,
                  "required|min:6"
                )}
              </div>
              <div className="section-footer">
                {update ? (
                  <Button
                    node="button"
                    className="green white-text"
                    waves="light"
                    onClick={() => this.handleUpdate()}
                  >
                    Update
                  </Button>
                ) : (
                  <>
                    <Button
                      className="blue darken-1 white-text"
                      onClick={() => this.submitForm()}
                    >
                      Sign up
                    </Button>

                    <BeatLoader
                      size={10}
                      color={"#123abc"}
                      loading={this.state.isLoading}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  addUser: (user) => addUser(dispatch, user),
  updateUser: (user) => updateUser(dispatch, user),
});

const SignupWrapper = connect(mapStateToProps, mapDispatchToProps)(Signup);
export default SignupWrapper;
// import React, { Component } from "react";
// import { TextInput, Button } from "react-materialize";
// import SimpleReactValidator from "simple-react-validator";
// import BeatLoader from "react-spinners/BeatLoader";
// import { addUser } from "../redux/actionCreaters/userActionCreator";
// import { connect } from "react-redux";
// import "../css/common.css";
// import { toast } from "react-toastify";
// class Signup extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       user: {
//         name: "",
//         email: "",
//         phone: "",
//         password: "",
//         isAdmin: false,
//       },
//       isLoading: false,
//     };
//   }
//   validator = new SimpleReactValidator({ autoForceUpdate: this });
//   handleTextChange = (e) => {
//     const user = { ...this.state.user };

//     const field = e.target.name;

//     user[field] = e.target.value;
//     console.log(e.target.value);
//     this.setState({
//       user: user,
//     });
//   };
//   validateForm = (e) => {
//     this.validator.showMessageFor(e.target.name);
//   };
//   submitForm = async () => {

//     this.setState({ isLoading: true });
//     if (this.validator.allValid()) {
//       try {
//         await this.props.addUser(this.state.user);
//         toast.dark("Account Created Successfully")
//         this.props.history.replace("/login");
//       } catch (error) {
//         console.log(error);
//       }
//     }
//     this.setState({ isLoading: false });
//   };
//   render() {
//     let { user } = this.state;
//     return (
//       <div className="container ">
//         <div className="row ">
//           <div className="col-12 center">
//             <img
//               className="mt-4 pt-4"
//               src="images/logo.svg"
//               alt="logo"
//               width="250px"
//             />
//           </div>
//           <div className="col-md-6 offset-md-3">
//             <div className="section">
//               <div className="section-header">
//                 <div className="section-title-box blue">
//                   <div className="section-title">
//                     <h1>Signup</h1>
//                   </div>
//                 </div>
//               </div>
//               <div className="section-body">
//                 <TextInput
//                   value={user.name}
//                   label="Name"
//                   name="name"
//                   onChange={(e) => this.handleTextChange(e)}
//                   onBlur={(e) => this.validateForm(e)}
//                 />
//                 {this.validator.message("name", user.name, "required")}
//                 <TextInput
//                   value={user.email}
//                   label="Email"
//                   name="email"
//                   onChange={(e) => this.handleTextChange(e)}
//                   onBlur={(e) => this.validateForm(e)}
//                 />
//                 {this.validator.message("email", user.email, "required|email")}
//                 <TextInput
//                   type="number"
//                   value={user.phone}
//                   label="Phone"
//                   name="phone"
//                   onChange={(e) => this.handleTextChange(e)}
//                   onBlur={(e) => this.validateForm(e)}
//                 />
//                 {this.validator.message(
//                   "phone",
//                   user.phone,
//                   "required|min:11|max:11|phone"
//                 )}
//                 <TextInput
//                   type="password"
//                   value={user.password}
//                   label="Password"
//                   name="password"
//                   onChange={(e) => this.handleTextChange(e)}
//                   onBlur={(e) => this.validateForm(e)}
//                 />
//                 {this.validator.message(
//                   "password",
//                   user.password,
//                   "required|min:6"
//                 )}
//               </div>
//               <div className="section-footer">
//                 <Button
//                   className="blue darken-1 white-text"
//                   onClick={() => this.submitForm()}
//                 >
//                   Sign up
//                 </Button>

//                 <BeatLoader
//                   size={10}
//                   color={"#123abc"}
//                   loading={this.state.isLoading}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// const mapStateToProps = (state) => ({});

// const mapDispatchToProps = (dispatch) => ({
//   addUser: (user) => addUser(dispatch, user),
// });

// const SignupWrapper = connect(mapStateToProps, mapDispatchToProps)(Signup);
// export default SignupWrapper;

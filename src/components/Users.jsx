import React, { Component } from "react";
import { TextInput, Table, Button } from "react-materialize";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import {
  fetchUserList,
  block_unblock,
} from "../redux/actionCreaters/userActionCreator";

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
  }

  componentDidMount = async () => {
    await this.props.fetchUserList();
    this.setState({
      users: this.props.users,
    });
  };

  handleSearch = (e) => {
    let users = [...this.props.users];
    //console.log(users);
    //console.log(users.map((user) => user.name.includes(e.target.value)));
    let output = users.filter((user) =>
      user.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    this.setState({
      users: output,
    });
  };

  handleStatusChange = async (user, status) => {
    //console.log(user);
    //console.log(status);
    user.status = status;
    await this.props.block_unblock(user);
    toast.dark(`User ${status}`);
  };
  render() {
    const { users } = this.state;
    //console.log(users);
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
            {/* <UsersTable
              users={users}
              handleStatusChange={this.handleStatusChange}
            /> */}

            <Table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={index}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>
                      <Button
                        className="red white-text"
                        onClick={() => this.handleStatusChange(user, "block")}
                      >
                        Block
                      </Button>
                      <Button
                        className="green  white-text ml-2"
                        onClick={() => this.handleStatusChange(user, "unblock")}
                      >
                        Unblock
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    );
  }
}

// const UsersTable = ({ users, handleStatusChange }) => {

//   return (
//     <Table>
//       <thead>
//         <tr>
//           <th>Name</th>
//           <th>Email</th>
//           <th>Phone</th>
//           <th>Action</th>
//         </tr>
//       </thead>
//       <tbody>
//         {users.map((user, index) => (
//           <tr key={index}>
//             <td>{user.name}</td>
//             <td>{user.email}</td>
//             <td>{user.phone}</td>
//             <td>
//               <Button
//                 className="red white-text"
//                 onClick={() => this.handleStatusChange()}
//               >
//                 Block
//               </Button>
//               <Button
//                 className="green  white-text ml-2"
//                 onClick={() => this.handleStatusChange()}
//               >
//                 Unblock
//               </Button>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </Table>
//   );
// };

const mapStateToProps = (state) => ({
  users: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  fetchUserList: () => fetchUserList(dispatch),
  block_unblock: (user) => block_unblock(dispatch, user),
});

const UsersWrapper = connect(mapStateToProps, mapDispatchToProps)(Users);
export default UsersWrapper;

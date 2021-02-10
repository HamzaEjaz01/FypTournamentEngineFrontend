import React, { Component } from "react";
import { connect } from "react-redux";
import {
  fetchMyItems,
  deleteMyItem,
} from "./../redux/actionCreaters/itemActionCreator";
import { Table, Button } from "react-materialize";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

class MyItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myItems: this.props.items,
    };
  }

  async componentDidMount() {
    await this.props.fetchMyItems();
    this.setState({
      myItems: this.props.items,
    });
  }

  handleDelete = (item) => {
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure you want to delete this Item",
      buttons: [
        {
          label: "Yes",
          onClick: () => this.props.deleteMyItem(item),
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  render() {
    const { myItems } = this.state;
    //console.log(myItems);
    if (myItems.length === 0) {
      return (
        <div className="container">
          <div className="row">
            <div className="col-ms-12">
              <h2 className="m-3 ml-5">My Items</h2>
            </div>
            <div className="col-sm-12">
              <div
                className="p-4 green lighten-5 m-4"
                style={{ border: "1px solid green" }}
              >
                <p className="green-text">
                  You have not Post any Item to sale yet.
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-ms-12">
              <h2 className="m-3">My Items</h2>
            </div>
            <div className="col-sm-12">
              <Table>
                <thead>
                  <tr>
                    <th>Item Name</th>
                    <th>Category</th>
                    <th>Condition</th>
                    <th>Price</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {myItems.length !== 0 &&
                    myItems.map((item, index) => (
                      <tr key={index}>
                        <td> {item.itemname} </td>
                        <td> {item.category} </td>
                        <td> {item.condition} </td>
                        <td> {item.price} </td>
                        <td>
                          <Button
                            className="red  white-text"
                            onClick={() => this.handleDelete(item)}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  items: state.item,
});

const mapDispatchToProps = (dispatch) => ({
  fetchMyItems: () => fetchMyItems(dispatch),
  deleteMyItem: (item) => deleteMyItem(dispatch, item),
});

const MyItemsWrapper = connect(mapStateToProps, mapDispatchToProps)(MyItems);
export default MyItemsWrapper;

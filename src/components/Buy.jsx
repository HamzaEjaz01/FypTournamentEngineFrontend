import React, { Component } from "react";
import { fetchItemsList } from "../redux/actionCreaters/itemActionCreator";
import { connect } from "react-redux";
import { TextInput } from "react-materialize";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

class BuyItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }

  componentDidMount = async () => {
    await this.props.fetchItemsList();
    this.setState({
      items: this.props.items,
    });
  };

  handleSearch = (e) => {
    let items = [...this.props.items];
    //console.log(items);
    //console.log(items.map((item) => item.itemname.includes(e.target.value)));
    let output = items.filter((item) =>
      item.itemname.toLowerCase().includes(e.target.value.toLowerCase())
    );
    this.setState({
      items: output,
    });
  };

  render() {
    const { items } = this.state;
    //console.log(items);
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
          {items.map((item, index) => (
            <div className="col-md-3" key={index}>
              <Card style={{ width: "18rem", height: "20rem fixed" }}>
                {
                  <div>
                    <img
                      alt=""
                      src={item.images[0].imageInfo.base64}
                      height="250px"
                      width="269px"
                    />
                  </div>
                }
                <Card.Body>
                  <Card.Title>
                    <b>{item.price} PKR</b>
                  </Card.Title>
                  <Card.Text>
                    {item.itemname}
                    <br />
                    {item.location}, {item.state}
                  </Card.Text>
                  <Link
                    className="black-text hover"
                    to={{
                      pathname: "/item",
                      item: item,
                    }}
                  >
                    <Button variant="primary"> View </Button>
                  </Link>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  items: state.item,
});

const mapDispatchToProps = (dispatch) => ({
  fetchItemsList: () => fetchItemsList(dispatch),
});

const BuyItemWrapper = connect(mapStateToProps, mapDispatchToProps)(BuyItem);
export default BuyItemWrapper;

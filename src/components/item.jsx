import React, { Component } from "react";
import { Carousel } from "react-responsive-carousel";
import Card from "react-bootstrap/Card";

class Item extends Component {
  constructor(props) {
    super(props);
    if (this.props.location.item == null) window.location = "/buyitem";
  }
  state = {};
  render() {
    const item = this.props.location.item;
    //console.log(item);
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12 center">
            <img
              className="mt-4 mb-4 pt-4 center"
              src="images/logo.svg"
              alt="logo"
              width="250px"
            />
          </div>
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-8">
                <Carousel
                  id="123"
                  className="carousel-style"
                  showThumbs={false}
                  autoPlay
                  showStatus={false}

                  //showArrows={true}
                >
                  {item.images.map((image, index) => (
                    <div key={index}>
                      <img alt="" src={image.imageInfo.base64} height="600px" />
                    </div>
                  ))}
                </Carousel>

                {/* new card */}

                <Card className="" border="primary" style={{ width: "69rem" }}>
                  <Card.Header>
                    <b> Details</b>
                  </Card.Header>
                  <Card.Body>
                    <Card.Title>
                      <b> Condition: </b>
                      {item.condition}
                    </Card.Title>
                    <Card.Text>
                      <b> Description: </b>
                      {item.description}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
              <div className="col-sm-4">
                <Card
                  className="ml-2 mb-5"
                  border="primary"
                  style={{ width: "18rem" }}
                >
                  <Card.Header>
                    <b>{item.category} Category</b>
                  </Card.Header>
                  <Card.Body>
                    <Card.Title>{item.price}PKR</Card.Title>
                    <Card.Text>
                      {item.itemname}
                      <br />
                      {item.location}, {item.state}
                    </Card.Text>
                  </Card.Body>
                </Card>

                {/* new card */}
                <Card
                  className="ml-2 mt-5"
                  border="primary"
                  style={{ width: "18rem" }}
                >
                  <Card.Header>
                    <b> Seller Description</b>
                  </Card.Header>
                  <Card.Body>
                    <Card.Title>
                      <b>Name:</b> {item.sellername}
                    </Card.Title>
                    <Card.Text>
                      <b>Email:</b> {item.selleremail}
                      <br />
                      <b>Phone:</b> {item.sellerphone}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Item;

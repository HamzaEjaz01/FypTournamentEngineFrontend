import React, { Component } from "react";
import "../css/common.css";
import { getCurrentUser } from "./../auth/authentication";
import SimpleReactValidator from "simple-react-validator";
import { TextInput, Select, Textarea, Button } from "react-materialize";
import { toast } from "react-toastify";
import { addItem } from "./../redux/actionCreaters/itemActionCreator";
import { connect } from "react-redux";

class SellItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {
        user_id: getCurrentUser()._id,
        status: "approve",
        itemname: "",
        category: "Games",
        price: "",
        description: "",
        condition: "New",
        images: [],
        state: "Punjab",
        location: "",
        sellername: getCurrentUser().name,
        selleremail: getCurrentUser().email,
        sellerphone: getCurrentUser().phone,
      },
    };
  }

  validator = new SimpleReactValidator({ autoForceUpdate: this });

  validateForm = (e) => {
    this.validator.showMessageFor(e.target.name);
  };

  handleTextChange = (e) => {
    const item = { ...this.state.item };

    const field = e.target.name;

    item[field] = e.target.value;
    //console.log(e.target.value);
    this.setState({
      item: item,
    });
    //console.log(item);
  };

  handleSubmit = async () => {
    //console.log(this.state.item);
    if (this.validator.allValid()) {
      try {
        await this.props.addItem(this.state.item);
        toast.dark("Item Posted Successfully");
        window.location = "/";
      } catch (error) {
        toast.dark("Please fill all the fields correctly");
        console.log("error");
      }
    }
  };

  handleImageSelect = (e) => {
    const images = e.target.files;
    let item = { ...this.state.item };

    for (let i = 0; i < images.length; i++) {
      //Make new file reader
      let reader = new FileReader();

      //Convert the file to base64
      reader.readAsDataURL(images[i]);

      //On reader load something
      reader.onload = () => {
        let imageInfo = {
          name: images[i].name,
          type: images[i].type,
          size: images[i].size,
          base64: reader.result,
        };

        // item.images = imageInfo;
        // this.setState({ item });
        item.images.push({ imageInfo });
        this.setState({ item });
        return;
      };
    }
  };

  render() {
    //console.log(getCurrentUser());
    let { item } = this.state;
    return (
      <>
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

            <div className="section container">
              <div className="section-header">
                <div className="section-title-box blue">
                  <div className="section-title ">
                    <h3>Sell An Item</h3>
                  </div>
                </div>
                <div className="section-body">
                  <div className="container">
                    <div className="row">
                      <div className="col-sm-6">
                        <TextInput
                          value={item.itemname}
                          label="Item Name"
                          name="itemname"
                          onChange={(e) => this.handleTextChange(e)}
                          onBlur={(e) => this.validateForm(e)}
                        />
                        {this.validator.message(
                          "itemname",
                          item.itemname,
                          "required|min:2|max:25"
                        )}
                      </div>
                      <div className="col-sm-6">
                        <Select
                          id="Select-988"
                          label="Condition"
                          multiple={false}
                          onChange={(e) => this.handleTextChange(e)}
                          options={{
                            classes: "",
                          }}
                          value={item.condition}
                          name="condition"
                        >
                          <option value="New">New</option>
                          <option value="Used">Used</option>
                        </Select>
                      </div>
                      <div className="col-sm-6">
                        <Select
                          id="Select-981"
                          label="Category"
                          multiple={false}
                          onChange={(e) => this.handleTextChange(e)}
                          options={{
                            classes: "",
                          }}
                          value={item.category}
                          name="category"
                        >
                          <option value="Sports">Sports</option>
                          <option value="Games">Games</option>
                        </Select>
                      </div>
                      <div className="col-sm-6">
                        <TextInput
                          value={item.price}
                          label="Price"
                          name="price"
                          onChange={(e) => this.handleTextChange(e)}
                          onBlur={(e) => this.validateForm(e)}
                        />
                        {this.validator.message(
                          "price",
                          item.price,
                          "required|numeric|min:1,num"
                        )}
                      </div>
                      <div className="col-sm-6">
                        <Textarea
                          value={item.description}
                          label="Description"
                          name="description"
                          onChange={(e) => this.handleTextChange(e)}
                          onBlur={(e) => this.validateForm(e)}
                        />
                      </div>
                      <div className="col-sm-6">
                        <TextInput
                          type="file"
                          className="blue"
                          label="Images"
                          placeholder="Upload game Image"
                          name="image"
                          multiple
                          onChange={(e) => this.handleImageSelect(e)}
                        />
                      </div>
                      <div
                        className="col-sm-12"
                        style={{
                          display: "flex",
                          width: "350px",
                          height: "200px",
                          //overflow: "hidden",
                          overflow: "auto",
                        }}
                      >
                        {item.images.map((image, index) => (
                          <div className="p-3 center" key={index}>
                            {/* {console.log(image)} */}
                            <img
                              src={image.imageInfo.base64}
                              //minwidth="300px"
                              width="300px"
                              height="200p"
                              alt=""
                            />
                          </div>
                        ))}
                      </div>
                      <div className="col-sm-12">
                        <h5
                          className="ml-3 mr-4 grey-text text-darken-3"
                          style={{ display: "inline-block" }}
                        >
                          Seller Info:
                        </h5>
                      </div>
                      <div className="col-sm-6">
                        <Select
                          id="Select-982"
                          label="State"
                          multiple={false}
                          onChange={(e) => this.handleTextChange(e)}
                          options={{
                            classes: "",
                          }}
                          value={item.state}
                          name="state"
                        >
                          <option value="Punjab">Punjab</option>
                          <option value="KPK">KPK</option>
                          <option value="Sindh">Sindh</option>
                          <option value="Balochistan">Balochistan</option>
                        </Select>
                      </div>
                      <div className="col-sm-6">
                        <TextInput
                          value={item.location}
                          label="Location"
                          name="location"
                          onChange={(e) => this.handleTextChange(e)}
                          onBlur={(e) => this.validateForm(e)}
                        />
                        {this.validator.message(
                          "location",
                          item.location,
                          "required"
                        )}
                      </div>
                      <div className="col-sm-12">
                        <TextInput value={item.sellername} label="Name" />
                      </div>
                      <div className="col-sm-6">
                        <TextInput value={item.selleremail} label="Email" />
                      </div>
                      <div className="col-sm-6">
                        <TextInput value={item.sellerphone} label="Phone" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="section-footer">
                  <Button
                    node="button"
                    className="blue white-text"
                    waves="light"
                    onClick={() => this.handleSubmit()}
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  addItem: (item) => addItem(dispatch, item),
});

const SellItemWrapper = connect(mapStateToProps, mapDispatchToProps)(SellItem);
export default SellItemWrapper;

//export default SellItem;

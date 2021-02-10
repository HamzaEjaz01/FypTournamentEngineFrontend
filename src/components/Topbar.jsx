import React, { Component } from "react";
import { NavItem, Dropdown, Navbar } from "react-materialize";
import { Link } from "react-router-dom";
import "../css/common.css";

class Topbar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let user = this.props.user;
    return (
      <Navbar
        className="black"
        alignLinks="right"
        menuIcon={<i className="fa fa-bars" aria-hidden="true"></i>}
        fixed
        brand={
          <Link className="brand-logo blue-text ml-4" to="./">
            TournamentEngine
          </Link>
        }
        id="topnav"
      >
        {/* for responsive icon */}
        <div className="hide-on-large-only center">
          <img
            className="mt-2 pt-4 mb-4 "
            src="images/logo.svg"
            alt="logo"
            width="150px"
          />
        </div>
        <div className="hide-on-med-and-down">
          <Dropdown
            className="black"
            id="Dropdown_667"
            options={{
              alignment: "left",
            }}
            style={{ minWidth: "200px" }}
            trigger={<NavItem className="mr-0">Shop</NavItem>}
          >
            <Link to="/buyitem" className="white-text">
              Buy Item
            </Link>
            <Link to="/sellitem" className="white-text">
              Sell Item
            </Link>
            <Link to="/myitem" className="white-text">
              My Items
            </Link>
          </Dropdown>
        </div>
        <NavItem href="/#overview">Overview</NavItem>
        <NavItem href="/browse">Browse</NavItem>
        <NavItem href="/organize">Organize</NavItem>
        {user && user.isAdmin && <NavItem href="/users">Users</NavItem>}

        {user ? (
          <div className="hide-on-med-and-down">
            <Dropdown
              className="black"
              id="Dropdown_666"
              options={{
                alignment: "left",
              }}
              style={{ minWidth: "200px" }}
              trigger={<NavItem className="mr-4">{user.name}</NavItem>}
            >
              <Link
                to={{
                  pathname: "/signup",
                  user: user,
                  update: true,
                }}
                className="white-text"
              >
                Profile
              </Link>
              <Link to="/mytournaments" className="white-text">
                My Tournaments
              </Link>
              {user && !user.isAdmin ? (
                <>
                  <Link to="/mymatches" className="white-text">
                    My Matches
                  </Link>
                </>
              ) : (
                <Link to="/pendingtournaments" className="white-text">
                  Pending Tournaments
                </Link>
              )}
              <Link to="/logout" className="white-text">
                Logout
              </Link>
            </Dropdown>
          </div>
        ) : (
          <NavItem href="/login" className="btn blue darken-3 white-text">
            Login
          </NavItem>
        )}
        {/* abdul Qayyum */}
        <NavItem href="/mytournaments" className=" hide-on-large-only">
          My Tournaments
        </NavItem>
        {user && !user.isAdmin ? (
          <NavItem href="/mymatches" className=" hide-on-large-only">
            My Matches
          </NavItem>
        ) : (
          <NavItem href="/pendingtournaments" className=" hide-on-large-only">
            Pending Tournaments
          </NavItem>
        )}
        {user ? (
          <NavItem
            href="/logout"
            className="black white-text mt-2 hide-on-large-only"
          >
            Logout
          </NavItem>
        ) : (
          <span></span>
        )}
        {/* code end here */}
      </Navbar>
    );
  }
}

export default Topbar;

import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import $ from "jquery";
import axios from "axios";
import { BACKEND_URL } from "../helper/constants";
import toastr from "toastr";
import "toastr/build/toastr.min.css";

export default class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.handleClickLogout = this.handleClickLogout.bind(this);
  }

  handleClickLogout() {
    localStorage.removeItem("token");
    localStorage.setItem("isLoggedIn", false);
    this.setState({ toDashboard: true });
  }

  // componentDidMount() {
  //   axios
  //     .get(`${BACKEND_URL}global_settings/get`, {
  //       headers: { Authorization: localStorage.getItem("token") },
  //     })
  //     .then((result) => {
  //       if (result.data.success) {
  //         result.data.data ? this.setState({ logoImg: result.data.data.brand_logo }) : this.setState({ logoImg: "" });
  //       }
  //     });

  //   axios
  //     .get(`${BACKEND_URL}network/get_all`, {
  //       headers: { Authorization: localStorage.getItem("token") },
  //     })
  //     .then((result) => {
  //       if (result.data.success) {
  //         let str = "";
  //         this.setState({ networkCount: result.data.data.length });
  //         result.data.data.map((ele) => {
  //           str += `<li>
  //                 <a className="d-flex align-items-center" href="/networkDashboard?id=${ele.id}">
  //                   <svg
  //                     xmlns="http://www.w3.org/2000/svg"
  //                     width="14"
  //                     height="14"
  //                     viewBox="0 0 24 24"
  //                     fill="none"
  //                     stroke="currentColor"
  //                     strokeWidth="2"
  //                     strokeLinecap="round"
  //                     strokeLinejoin="round"
  //                     className="feather feather-circle"
  //                   >
  //                     <circle cx="12" cy="12" r="10"></circle>
  //                   </svg>
  //                   <span className="menu-item text-truncate" data-i18n="Analytics">
  //                     ${ele.name}
  //                   </span>
  //                 </a>
  //               </li>`;
  //         });
  //         $("#networkListContent").html(str);
  //       }
  //     })
  //     .catch((error) => {
  //       toastr.error(error);
  //     });
  // }

  state = {
    networkCount: 0,
    logoImg: "",
    toDashboard: false,
  };

  clickNetworkItem = () => {
    $("#nav_networkContent").hasClass("open")
      ? $("#nav_networkContent").removeClass("open")
      : $("#nav_networkContent").addClass("open");
  };

  navhide = () => {
    document.getElementsByClassName("main-menu menu-light menu-accordion menu-shadow")[0].style.left = "-260px";
    document.getElementsByClassName("main-menu menu-light menu-accordion menu-shadow")[0].style.top = "0";
    document.getElementsByClassName("app-content content")[0].style.margin = 0;
    document.getElementsByClassName(
      "header-navbar navbar navbar-expand-lg align-items-center floating-nav navbar-light navbar-shadow"
    )[0].style.width = "calc(((100vw - (100vw - 100%)) - 4rem))";
    document.getElementsByClassName("nav navbar-nav d-xl-none")[0].setAttribute("style", "display: flex !important");
  };

  render() {
    if (this.state.toDashboard === true) {
      return <Redirect to="/" />;
    }
    return (
      <div
        className="main-menu menu-fixed menu-light menu-accordion menu-shadow"
        data-scroll-to-active="true"
        style={{ transition: "all 0.3s ease" }}
      >
        <div className="navbar-header">
          <ul className="nav navbar-nav flex-row">
            <li className="nav-item mr-auto">
              <a href="#" className="brand-logo">
                <img
                  src={BACKEND_URL.slice(0, BACKEND_URL.length - 4) + this.state.logoImg}
                  alt="logo image"
                  height="55"
                  width="175"
                />
              </a>
            </li>
            <li className="nav-item nav-toggle">
              <a className="nav-link modern-nav-toggle pr-0" data-toggle="collapse">
                <i className="d-block d-xl-none text-primary toggle-icon font-medium-4" data-feather="x"></i>
                {/* <i
                  className="d-none d-xl-block collapse-toggle-icon font-medium-4 text-primary"
                  data-feather="disc"
                  data-ticon="disc"
                ></i> */}
                <a className="nav-link pr-0" data-toggle="collapse" onClick={this.navhide}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-x d-block d-xl-none text-primary toggle-icon font-medium-4"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-disc d-none collapse-toggle-icon primary font-medium-4 alwaysblock"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                </a>
              </a>
            </li>
          </ul>
        </div>
        <div className="shadow-bottom"></div>
        <div className="main-menu-content">
          <ul className="navigation navigation-main" id="main-menu-navigation" data-menu="menu-navigation">
            <li id="nav_home">
              <a className="d-flex align-items-center" href="/home">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-home"
                  style={{ width: 20, height: 16 }}
                >
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
                <span className="menu-title text-truncate" data-i18n="Dashboard">
                  Dashboard
                </span>
              </a>
            </li>
            <li id="nav_brandSettings">
              <a className="d-flex align-items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-settings"
                  style={{ width: 20, height: 16 }}
                >
                  <circle cx="12" cy="12" r="3"></circle>
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                </svg>
                <span className="menu-title text-truncate" data-i18n="Brand Settings">
                  Settings
                </span>
              </a>
            </li>
            <li id="nav_report">
              <a className="d-flex align-items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-layers"
                  style={{ width: 20, height: 16 }}
                >
                  <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                  <polyline points="2 17 12 22 22 17"></polyline>
                  <polyline points="2 12 12 17 22 12"></polyline>
                </svg>
                <span className="menu-title text-truncate" data-i18n="Reports">
                  Reports
                </span>
              </a>
            </li>
            <li id="nav_feedback">
              <a className="d-flex align-items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-layers"
                  style={{ width: 20, height: 16 }}
                >
                  <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                  <polyline points="2 17 12 22 22 17"></polyline>
                  <polyline points="2 12 12 17 22 12"></polyline>
                </svg>
                <span className="menu-title text-truncate" data-i18n="Send Feedback">
                  Send Feedback
                </span>
              </a>
            </li>

            <li className="navigation-header">
              <span data-i18n="User Interface">Your Account</span>
              <i data-feather="more-horizontal"></i>
            </li>
            <li className="nav-item" id="nav_profile">
              <a className="d-flex align-items-center" href="/profile">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  fill="currentColor"
                  className="bi bi-person"
                  viewBox="0 0 14 14"
                  style={{ width: 20, height: 16 }}
                >
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                </svg>
                <span className="menu-title text-truncate" data-i18n="Settings">
                  Profile
                </span>
              </a>
            </li>
            <li className="nav-item">
              <a className="d-flex align-items-center" onClick={this.handleClickLogout}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  fill="currentColor"
                  className="bi bi-box-arrow-right"
                  viewBox="0 0 14 14"
                  style={{ width: 20, height: 14 }}
                >
                  <path
                    fill="evenodd"
                    d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
                  />
                  <path
                    fill="evenodd"
                    d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
                  />
                </svg>
                <span className="menu-title text-truncate" data-i18n="Logout">
                  Logout
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

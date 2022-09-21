import React, { Component } from "react";
import Header from "../elements/header";
import Sidebar from "../elements/sidebar";
import Footer from "../elements/footer";
import $ from "jquery";
import axios from "axios";
import { BACKEND_URL } from "../helper/constants";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import userImg from "../assets/img/user_image.png";

export default class Profile extends Component {
  componentDidMount() {
    $("#nav_profile").addClass("active");
    this.setAvatar();
    this.setInfo();

    toastr.options = {
      positionClass: "toast-top-right",
      hideDuration: 500,
      timeOut: 3000,
    };
  }

  state = {
    // currentUser: JSON.parse(localStorage.getItem("currentUser")),
    avatar: "",
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  ValidateEmail = (inputText) => {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (inputText.match(mailformat)) {
      return true;
    } else {
      return false;
    }
  };

  setAvatar = () => {
  };

  setInfo = () => {
    
  };

  setPass = () => {
    this.setState({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  handleUserAvatarChange = () => {
    this.setState({ avatar: URL.createObjectURL(document.getElementById("account-upload").files[0]) });
  };

  handleFirstNameChange = (event) => {
    this.setState({ firstName: event.target.value });
  };

  handleLastNameChange = (event) => {
    this.setState({ lastName: event.target.value });
  };

  handleEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };

  handleCompanyChange = (event) => {
    this.setState({ company: event.target.value });
  };

  handleInfoSave = () => {
    let submitFlag = true;

    if (this.state.email == "") {
      toastr.warning("Email is required.");
      submitFlag = false;
    } else {
      if (!this.ValidateEmail(this.state.email)) {
        toastr.warning("Email format is invalid.");
        submitFlag = false;
      }
    }
    if (this.state.lastName == "") {
      toastr.warning("Last Name is required.");
      submitFlag = false;
    }
    if (this.state.firstName == "") {
      toastr.warning("First Name is required.");
      submitFlag = false;
    }

    if (submitFlag) {
      let formData = new FormData();

      $("#account-upload").prop("files")[0] && formData.append("photo", $("#account-upload").prop("files")[0]);
      formData.append("first_name", this.state.firstName);
      formData.append("last_name", this.state.lastName);
      formData.append("email", this.state.email);
      formData.append("company", this.state.company);      
    }
  };

  handleOldPasswordChange = (event) => {
    this.setState({ oldPassword: event.target.value });
  };

  handleNewPasswordChange = (event) => {
    this.setState({ newPassword: event.target.value });
  };

  handleConfirmPasswordChange = (event) => {
    this.setState({ confirmPassword: event.target.value });
  };

  handlePassSave = () => {
    let submitFlag = true;

    if (this.state.confirmPassword == "") {
      toastr.warning("Retype New Password is required.");
      submitFlag = false;
    } else {
      if (this.state.newPassword != "" && this.state.newPassword != this.state.confirmPassword) {
        toastr.warning("Retype New Password does not match.");
        submitFlag = false;
      }
    }
    if (this.state.newPassword == "") {
      toastr.warning("New Password is required.");
      submitFlag = false;
    } else {
      if (this.state.newPassword.length < 8) {
        toastr.warning("The password must be at least 8 characters.");
        submitFlag = false;
      }
    }
    if (this.state.oldPassword == "") {
      toastr.warning("Old Password is required.");
      submitFlag = false;
    }

    if (submitFlag) {
      let data = {
        current_password: this.state.oldPassword,
        password: this.state.newPassword,
        password_confirmation: this.state.confirmPassword,
      };
      
    }
  };

  render() {
    return (
      <div>
        <Header />
        <Sidebar />
        <div className="app-content content">
          <div className="content-overlay"></div>
          <div className="header-navbar-shadow"></div>
          <div className="content-wrapper">
            <div className="content-header row">
              <div className="content-header-left col-md-9 col-12 mb-2">
                <div className="row breadcrumbs-top">
                  <div className="col-12">
                    <h2 className="content-header-title float-left mb-0">Account Settings</h2>
                    <div className="breadcrumb-wrapper">
                      <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                          <a href="/home">Home</a>
                        </li>

                        <li className="breadcrumb-item active"> Account Settings</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="content-body">
              <section id="page-account-settings">
                <div className="row">
                  <div className="col-md-3 mb-2 mb-md-0">
                    <ul className="nav nav-pills flex-column nav-left">
                      <li className="nav-item">
                        <a
                          className="nav-link active"
                          id="account-pill-general"
                          data-toggle="pill"
                          href="#account-vertical-general"
                          aria-expanded="true"
                        >
                          <i data-feather="user" className="font-medium-3 mr-1"></i>
                          <span className="font-weight-bold">General</span>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          id="account-pill-password"
                          data-toggle="pill"
                          href="#account-vertical-password"
                          aria-expanded="false"
                        >
                          <i data-feather="lock" className="font-medium-3 mr-1"></i>
                          <span className="font-weight-bold">Change Password</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="col-md-9">
                    <div className="card">
                      <div className="card-body">
                        <div className="tab-content">
                          <div
                            role="tabpanel"
                            className="tab-pane active"
                            id="account-vertical-general"
                            aria-labelledby="account-pill-general"
                            aria-expanded="true"
                          >
                            <div className="media">
                              <a href="#" className="mr-25">
                                <img
                                  src={userImg}
                                  // src={this.state.avatar}
                                  id="account-upload-img"
                                  className="rounded mr-50"
                                  alt="profile image"
                                  height="80"
                                  width="80"
                                />
                              </a>
                              <div className="media-body mt-75 ml-1">
                                <label htmlFor="account-upload" className="btn btn-sm btn-primary mb-75 mr-75">
                                  Upload
                                </label>
                                <input
                                  type="file"
                                  id="account-upload"
                                  hidden
                                  accept="image/*"
                                  onChange={this.handleUserAvatarChange}
                                />
                                <button className="btn btn-sm btn-outline-secondary mb-75" onClick={this.setAvatar}>
                                  Reset
                                </button>
                                <p>Allowed JPG, GIF or PNG. Max size of 800kB</p>
                              </div>
                            </div>
                            <div className="validate-form mt-2">
                              <div className="row">
                                <div className="col-12 col-sm-6">
                                  <div className="form-group">
                                    <label htmlFor="account-firstName">First Name</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      id="account-firstName"
                                      name="firstname"
                                      placeholder="First Name"
                                      value={this.state.firstName}
                                      onChange={this.handleFirstNameChange}
                                    />
                                  </div>
                                </div>
                                <div className="col-12 col-sm-6">
                                  <div className="form-group">
                                    <label htmlFor="account-lastName">Last Name</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      id="account-lastName"
                                      name="lastName"
                                      placeholder="Last Name"
                                      value={this.state.lastName}
                                      onChange={this.handleLastNameChange}
                                    />
                                  </div>
                                </div>
                                <div className="col-12 col-sm-6">
                                  <div className="form-group">
                                    <label htmlFor="account-e-mail">E-mail</label>
                                    <input
                                      type="email"
                                      className="form-control"
                                      id="account-e-mail"
                                      name="email"
                                      placeholder="Email"
                                      value={this.state.email}
                                      onChange={this.handleEmailChange}
                                    />
                                  </div>
                                </div>
                                <div className="col-12 col-sm-6">
                                  <div className="form-group">
                                    <label htmlFor="account-company">Company</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      id="account-company"
                                      name="company"
                                      placeholder="Company name"
                                      value={this.state.company}
                                      onChange={this.handleCompanyChange}
                                    />
                                  </div>
                                </div>
                                <div className="col-12 mt-75">
                                  <div className="alert alert-warning mb-50" role="alert">
                                    <h4 className="alert-heading">Your email is not confirmed. Please check your inbox.</h4>
                                    <div className="alert-body">
                                      <a href="#" className="alert-link">
                                        Resend confirmation
                                      </a>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-12">
                                  <button className="btn btn-primary mt-2 mr-1" onClick={this.handleInfoSave}>
                                    Save changes
                                  </button>
                                  <button type="reset" className="btn btn-outline-secondary mt-2" onClick={this.setInfo}>
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            className="tab-pane fade"
                            id="account-vertical-password"
                            role="tabpanel"
                            aria-labelledby="account-pill-password"
                            aria-expanded="false"
                          >
                            <div className="validate-form">
                              <div className="row">
                                <div className="col-12 col-sm-6">
                                  <div className="form-group">
                                    <label htmlFor="account-old-password">Old Password</label>
                                    <div className="input-group form-password-toggle input-group-merge">
                                      <input
                                        type="password"
                                        className="form-control"
                                        id="account-old-password"
                                        name="password"
                                        placeholder="Old Password"
                                        value={this.state.oldPassword}
                                        onChange={this.handleOldPasswordChange}
                                      />
                                      <div className="input-group-append">
                                        <div className="input-group-text cursor-pointer">
                                          <i data-feather="eye"></i>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-12 col-sm-6">
                                  <div className="form-group">
                                    <label htmlFor="account-new-password">New Password</label>
                                    <div className="input-group form-password-toggle input-group-merge">
                                      <input
                                        type="password"
                                        id="account-new-password"
                                        name="new-password"
                                        className="form-control"
                                        placeholder="New Password"
                                        value={this.state.newPassword}
                                        onChange={this.handleNewPasswordChange}
                                      />
                                      <div className="input-group-append">
                                        <div className="input-group-text cursor-pointer">
                                          <i data-feather="eye"></i>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-12 col-sm-6">
                                  <div className="form-group">
                                    <label htmlFor="account-retype-new-password">Retype New Password</label>
                                    <div className="input-group form-password-toggle input-group-merge">
                                      <input
                                        type="password"
                                        className="form-control"
                                        id="account-retype-new-password"
                                        name="confirm-new-password"
                                        placeholder="New Password"
                                        value={this.state.confirmPassword}
                                        onChange={this.handleConfirmPasswordChange}
                                      />
                                      <div className="input-group-append">
                                        <div className="input-group-text cursor-pointer">
                                          <i data-feather="eye"></i>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-12">
                                  <button className="btn btn-primary mr-1 mt-1" onClick={this.handlePassSave}>
                                    Save changes
                                  </button>
                                  <button
                                    type="reset"
                                    className="btn btn-outline-secondary mt-1"
                                    id="cancelPass"
                                    onClick={this.setPass}
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>

        <div className="sidenav-overlay"></div>
        <div className="drag-target"></div>
        <Footer />
      </div>
    );
  }
}

import React, { Component } from "react";
import axios from "axios";
import $ from "jquery";
import { Redirect } from "react-router-dom";
import { BACKEND_URL } from "../helper/constants";
import toastr from "toastr";
import "toastr/build/toastr.min.css";

export default class Login extends Component {
  state = {
    email: "",
    password: "",
    redirect: false,
    isLoading: false,
    logoImg: "",
  };

  ValidateEmail = (inputText) => {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (inputText.match(mailformat)) {
      return true;
    } else {
      return false;
    }
  };

  handleEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };

  handlePwdChange = (event) => {
    this.setState({ password: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    let submitFlag = true;

    if (this.state.password == "") {
      toastr.warning("Password is required.");
      submitFlag = false;
    }
    if (this.state.email == "") {
      toastr.warning("Email is required.");
      submitFlag = false;
    } else {
      if (!this.ValidateEmail(this.state.email)) {
        toastr.warning("Email format is invalid.");
        submitFlag = false;
      }
    }

    if (submitFlag) {
      this.setState({ isLoading: true });

      localStorage.setItem("token", "token_________");
      this.setState({ redirect: true, isLoading: false });
      localStorage.setItem("isLoggedIn", true);      
    }
  };

  componentDidMount() {
    localStorage.getItem("token") && localStorage.getItem("token") != "" && (window.location.href = "/home");

    axios.get(`${BACKEND_URL}global_settings/get`, {}).then((result) => {
      if (result.data.success) {
        // result.data.data && result.data.data.brand_name && $("title").html(result.data.data.brand_name);
        result.data.data &&
          // result.data.data.brand_name &&
          // $("#brand_name").html("Welcome to " + result.data.data.brand_name + " ! 👋");
          result.data.data &&
          result.data.data.brand_logo &&
          this.setState({ logoImg: result.data.data.brand_logo });
        result.data.data &&
          result.data.data.favicon &&
          (document.getElementById("favicon").href = BACKEND_URL.slice(0, BACKEND_URL.length - 4) + result.data.data.favicon);
      }
    });

    toastr.options = {
      positionClass: "toast-top-right",
      hideDuration: 500,
      timeOut: 3000,
    };
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/home" />;
    }
  };

  render() {
    const isLoading = this.state.isLoading;
    return (
      <div className="app-content">
        <div className="content-overlay"></div>
        <div className="header-navbar-shadow"></div>
        <div className="content-wrapper">
          <div className="content-header row"></div>
          <div className="content-body">
            <div className="auth-wrapper auth-v1 px-2">
              <div className="auth-inner py-2">
                <div className="card mb-0">
                  <div className="card-body">
                    <a href="#" className="brand-logo">
                      {/* <img
                        src={BACKEND_URL.slice(0, BACKEND_URL.length - 4) + this.state.logoImg}
                        alt="logo image"
                        height="auto"
                        width="150"
                      /> */}
                    </a>

                    <h4 className="card-title mb-1">
                      <div id="brand_name">Welcome ! 👋</div>
                    </h4>
                    <p className="card-text mb-2">Please sign-in to your account to get access</p>

                    <form className="auth-login-form mt-2" onSubmit={this.handleSubmit}>
                      <div className="form-group">
                        <label htmlFor="login-email" className="form-label">
                          Email
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="inputEmail"
                          name="email"
                          onChange={this.handleEmailChange}
                          placeholder="john@example.com"
                          aria-describedby="login-email"
                          tabIndex="1"
                          autoFocus
                        />
                      </div>

                      <div className="form-group">
                        <div className="d-flex justify-content-between">
                          <label htmlFor="login-password">Password</label>
                          <a href="#">
                            <small>Forgot Password?</small>
                          </a>
                        </div>
                        <div className="input-group input-group-merge form-password-toggle">
                          <input
                            type="password"
                            className="form-control form-control-merge"
                            id="inputPassword"
                            name="password"
                            onChange={this.handlePwdChange}
                            tabIndex="2"
                            placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                            aria-describedby="login-password"
                          />
                          <div className="input-group-append">
                            <span className="input-group-text cursor-pointer">
                              <i data-feather="eye"></i>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="custom-control custom-checkbox">
                          <input className="custom-control-input" type="checkbox" id="remember-me" tabIndex="3" />
                          <label className="custom-control-label" htmlFor="remember-me">
                            {" "}
                            Remember Me{" "}
                          </label>
                        </div>
                      </div>
                      <button className="btn btn-success btn-block" type="submit" disabled={this.state.isLoading ? true : false}>
                        Sign in &nbsp;
                        {isLoading ? (
                          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        ) : (
                          <span></span>
                        )}
                      </button>
                    </form>

                    <p className="text-center mt-2">
                      <span>New on our platform?</span>
                      <a href="/register">
                        <span>Create an account</span>
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {this.renderRedirect()}
      </div>
    );
  }
}

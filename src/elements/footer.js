import React, { Component } from "react";
import $ from "jquery";
import heartImg from "../assets/img/red-heart.png";

export default class Footer extends Component {
  componentDidMount() {
    $("footer").css("margin-left", "260px");
    $(".app-content").css("min-height", "calc(100vh - 3.51rem)");
  }

  render() {
    return (
      <div>
        <footer className="footer footer-static footer-light">
          <p className="clearfix mb-0">
            <span className="float-md-left d-block d-md-inline-block mt-25">
              COPYRIGHT &copy; 2022
              <span className="d-none d-sm-inline-block">. All rights Reserved</span>
            </span>
            <span className="float-md-right d-none d-md-block">
              Hand-crafted & Made with &nbsp;
              <img src={heartImg} height="13" width="13" />
            </span>
          </p>
        </footer>
        <button className="btn btn-primary btn-icon scroll-top" type="button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-arrow-up-short"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5z"
            />
          </svg>
        </button>
      </div>
    );
  }
}

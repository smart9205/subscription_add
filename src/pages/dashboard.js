import React, { Component } from "react";
import Header from "../elements/header";
import Sidebar from "../elements/sidebar";
import Footer from "../elements/footer";
import $ from "jquery";
import axios from "axios";
import { BACKEND_URL } from "../helper/constants";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import ReactApexChart from "react-apexcharts";

export class Dashboard extends Component {
  componentDidMount() {
    $("#nav_home").addClass("active");    
  }

  state = {
    networkInfo: {},
    wifiRouterListUrl: "",
    total_wifi_routers: 0,
    total_wifi_router_online: 0,
    total_wifi_router_not_online: 0,
    total_wifi_router_not_online_week: 0,
    positions: [],
    series: [
      {
        name: "series1",
        data: [31, 40, 28, 51, 42, 109, 100],
      },
      {
        name: "series2",
        data: [11, 32, 45, 32, 34, 52, 41],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "area",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        type: "datetime",
        categories: [
          "2022-09-19T00:00:00.000Z",
          "2022-09-19T01:30:00.000Z",
          "2022-09-19T02:30:00.000Z",
          "2022-09-19T03:30:00.000Z",
          "2022-09-19T04:30:00.000Z",
          "2022-09-19T05:30:00.000Z",
          "2022-09-19T06:30:00.000Z",
        ],
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
    },
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
            <div className="content-body">home</div>
          </div>
        </div>

        <div className="sidenav-overlay"></div>
        <div className="drag-target"></div>
        <Footer />
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyAiz0i0qL2hwQz12Luq9LrLA-xBfJVFz40",
})(Dashboard);

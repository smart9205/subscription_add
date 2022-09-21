import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import TitleComponent from "../pages/title";
import $ from "jquery";
import axios from "axios";
import { BACKEND_URL } from "../helper/constants";
import userImg from "../assets/img/user_image.png";

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.handleClickLogout = this.handleClickLogout.bind(this);
  }

  state = {
    // avatar: BACKEND_URL.slice(0, BACKEND_URL.length - 4) + JSON.parse(localStorage.getItem("currentUser")).photo,
    // name:
    //   JSON.parse(localStorage.getItem("currentUser")).first_name +
    //   " " +
    //   JSON.parse(localStorage.getItem("currentUser")).last_name,
    // email: JSON.parse(localStorage.getItem("currentUser")).email,
    toDashboard: false,
    title: "",
  };

  componentDidMount() {
    !localStorage.getItem("token") && this.setState({ toDashboard: true });

    // axios
    //   .get(`${BACKEND_URL}global_settings/get`, {
    //     headers: { Authorization: localStorage.getItem("token") },
    //   })
    //   .then((result) => {
    //     if (result.data.success) {
    //       result.data.data && result.data.data.brand_name
    //         ? this.setState({ title: result.data.data.brand_name })
    //         : this.setState({ title: "" });
    //       result.data.data &&
    //         result.data.data.favicon &&
    //         (document.getElementById("favicon").href = BACKEND_URL.slice(0, BACKEND_URL.length - 4) + result.data.data.favicon);
    //     }
    //   });

    $(document).on("click", ".menu-toggle, .modern-nav-toggle", function (e) {
      e.preventDefault();

      // $(".sidenav-overlay").hasClass("show") ? $(".sidenav-overlay").removeClass("show") : $(".sidenav-overlay").addClass("show");
    });

    // $.app.menu = {
    //   expanded: null,
    //   collapsed: null,
    //   hidden: null,
    //   container: null,
    //   horizontalMenu: false,

    //   manualScroller: {
    //     obj: null,

    //     // init: function () {
    //     //   var scroll_theme = $(".main-menu").hasClass("menu-dark") ? "light" : "dark";
    //     //   if (!$.app.menu.is_touch_device()) {
    //     //     this.obj = new PerfectScrollbar(".main-menu-content", {
    //     //       suppressScrollX: true,
    //     //       wheelPropagation: false,
    //     //     });
    //     //   } else {
    //     //     $(".main-menu").addClass("menu-native-scroll");
    //     //   }
    //     // },

    //     update: function () {
    //       // if (this.obj) {
    //       // Scroll to currently active menu on page load if data-scroll-to-active is true
    //       if ($(".main-menu").data("scroll-to-active") === true) {
    //         var activeEl, menu, activeElHeight;
    //         activeEl = document.querySelector(".main-menu-content li.active");
    //         menu = document.querySelector(".main-menu-content");
    //         if ($("body").hasClass("menu-collapsed")) {
    //           if ($(".main-menu-content li.sidebar-group-active").length) {
    //             activeEl = document.querySelector(".main-menu-content li.sidebar-group-active");
    //           }
    //         }
    //         if (activeEl) {
    //           activeElHeight = activeEl.getBoundingClientRect().top + menu.scrollTop;
    //         }

    //         // If active element's top position is less than 2/3 (66%) of menu height than do not scroll
    //         if (activeElHeight > parseInt((menu.clientHeight * 2) / 3)) {
    //           var start = menu.scrollTop,
    //             change = activeElHeight - start - parseInt(menu.clientHeight / 2);
    //         }
    //         setTimeout(function () {
    //           $.app.menu.container.stop().animate(
    //             {
    //               scrollTop: change,
    //             },
    //             300
    //           );
    //           $(".main-menu").data("scroll-to-active", "false");
    //         }, 300);
    //       }
    //       // this.obj.update();
    //       // }
    //     },

    //     enable: function () {
    //       if (!$(".main-menu-content").hasClass("ps")) {
    //         this.init();
    //       }
    //     },

    //     disable: function () {
    //       if (this.obj) {
    //         this.obj.destroy();
    //       }
    //     },

    //     updateHeight: function () {
    //       if (
    //         ($("body").data("menu") == "vertical-menu" ||
    //           $("body").data("menu") == "vertical-menu-modern" ||
    //           $("body").data("menu") == "vertical-overlay-menu") &&
    //         $(".main-menu").hasClass("menu-fixed")
    //       ) {
    //         $(".main-menu-content").css(
    //           "height",
    //           $(window).height() -
    //             $(".header-navbar").height() -
    //             $(".main-menu-header").outerHeight() -
    //             $(".main-menu-footer").outerHeight()
    //         );
    //         this.update();
    //       }
    //     },
    //   },

    //   init: function (compactMenu) {
    //     if ($(".main-menu-content").length > 0) {
    //       this.container = $(".main-menu-content");

    //       var menuObj = this;

    //       this.change(compactMenu);
    //     }
    //   },

    //   change: function (compactMenu) {
    //     var currentBreakpoint = Unison.fetch.now(); // Current Breakpoint

    //     this.reset();

    //     var menuType = $("body").data("menu");

    //     if (currentBreakpoint) {
    //       switch (currentBreakpoint.name) {
    //         case "xl":
    //           if (menuType === "vertical-overlay-menu") {
    //             this.hide();
    //           } else {
    //             if (compactMenu === true) this.collapse(compactMenu);
    //             else this.expand();
    //           }
    //           break;
    //         case "lg":
    //           if (menuType === "vertical-overlay-menu" || menuType === "vertical-menu-modern" || menuType === "horizontal-menu") {
    //             this.hide();
    //           } else {
    //             this.collapse();
    //           }
    //           break;
    //         case "md":
    //         case "sm":
    //           this.hide();
    //           break;
    //         case "xs":
    //           this.hide();
    //           break;
    //       }
    //     }

    //     // On the small and extra small screen make them overlay menu
    //     if (menuType === "vertical-menu" || menuType === "vertical-menu-modern") {
    //       this.toOverlayMenu(currentBreakpoint.name, menuType);
    //     }

    //     if ($("body").is(".horizontal-layout") && !$("body").hasClass(".horizontal-menu-demo")) {
    //       this.changeMenu(currentBreakpoint.name);

    //       $(".menu-toggle").removeClass("is-active");
    //     }

    //     // Dropdown submenu on large screen on hover htmlFor Large screen only
    //     // ---------------------------------------------------------------
    //     if (currentBreakpoint.name == "xl") {
    //       $('body[data-open="hover"] .main-menu-content .dropdown') // Use selector $('body[data-open="hover"] .header-navbar .dropdown') htmlFor menu and navbar DD open on hover
    //         .on("mouseenter", function () {
    //           if (!$(this).hasClass("show")) {
    //             $(this).addClass("show");
    //           } else {
    //             $(this).removeClass("show");
    //           }
    //         })
    //         .on("mouseleave", function (event) {
    //           $(this).removeClass("show");
    //         });
    //       /* ? Uncomment to enable all DD open on hover
    //     $('body[data-open="hover"] .dropdown a').on('click', function (e) {
    //       if (menuType == 'horizontal-menu') {
    //         var $this = $(this);
    //         if ($this.hasClass('dropdown-toggle')) {
    //           return false;
    //         }
    //       }
    //     });
    //     */
    //     }

    //     // Added data attribute brand-center htmlFor navbar-brand-center

    //     if (currentBreakpoint.name == "sm" || currentBreakpoint.name == "xs") {
    //       $(".header-navbar[data-nav=brand-center]").removeClass("navbar-brand-center");
    //     } else {
    //       $(".header-navbar[data-nav=brand-center]").addClass("navbar-brand-center");
    //     }
    //     // On screen width change, current active menu in horizontal
    //     if (currentBreakpoint.name == "xl" && menuType == "horizontal-menu") {
    //       $(".main-menu-content").find("li.active").parents("li").addClass("sidebar-group-active active");
    //     }

    //     if (currentBreakpoint.name !== "xl" && menuType == "horizontal-menu") {
    //       $("#navbar-type").toggleClass("d-none d-xl-block");
    //     }

    //     // Dropdown submenu on small screen on click
    //     // --------------------------------------------------
    //     $("ul.dropdown-menu [data-toggle=dropdown]").on("click", function (event) {
    //       if ($(this).siblings("ul.dropdown-menu").length > 0) {
    //         event.preventDefault();
    //       }
    //       event.stopPropagation();
    //       $(this).parent().siblings().removeClass("show");
    //       $(this).parent().toggleClass("show");
    //     });

    //     // Horizontal layout submenu drawer scrollbar
    //     if (menuType == "horizontal-menu") {
    //       $("li.dropdown-submenu").on("mouseenter", function () {
    //         if (!$(this).parent(".dropdown").hasClass("show")) {
    //           $(this).removeClass("openLeft");
    //         }
    //         var dd = $(this).find(".dropdown-menu");
    //         if (dd) {
    //           var pageHeight = $(window).height(),
    //             // ddTop = dd.offset().top,
    //             ddTop = $(this).position().top,
    //             ddLeft = dd.offset().left,
    //             ddWidth = dd.width(),
    //             ddHeight = dd.height();
    //           if (pageHeight - ddTop - ddHeight - 28 < 1) {
    //             var maxHeight = pageHeight - ddTop - 170;
    //             $(this)
    //               .find(".dropdown-menu")
    //               .css({
    //                 "max-height": maxHeight + "px",
    //                 "overflow-y": "auto",
    //                 "overflow-x": "hidden",
    //               });
    //             var menu_content = new PerfectScrollbar("li.dropdown-submenu.show .dropdown-menu", {
    //               wheelPropagation: false,
    //             });
    //           }
    //           // Add class to horizontal sub menu if screen width is small
    //           if (ddLeft + ddWidth - (window.innerWidth - 16) >= 0) {
    //             $(this).addClass("openLeft");
    //           }
    //         }
    //       });
    //       $(".theme-layouts").find(".semi-dark").hide();
    //     }

    //     // Horizontal Fixed Nav Sticky hight issue on small screens
    //     // if (menuType == 'horizontal-menu') {
    //     //   if (currentBreakpoint.name == 'sm' || currentBreakpoint.name == 'xs') {
    //     //     if ($(".menu-fixed").length) {
    //     //       $(".menu-fixed").unstick();
    //     //     }
    //     //   }
    //     //   else {
    //     //     if ($(".navbar-fixed").length) {
    //     //       $(".navbar-fixed").sticky();
    //     //     }
    //     //   }
    //     // }
    //   },

    //   transit: function (callback1, callback2) {
    //     var menuObj = this;
    //     $("body").addClass("changing-menu");

    //     callback1.call(menuObj);

    //     if ($("body").hasClass("vertical-layout")) {
    //       if ($("body").hasClass("menu-open") || $("body").hasClass("menu-expanded")) {
    //         $(".menu-toggle").addClass("is-active");

    //         // Show menu header search when menu is normally visible
    //         if ($("body").data("menu") === "vertical-menu") {
    //           if ($(".main-menu-header")) {
    //             $(".main-menu-header").show();
    //           }
    //         }
    //       } else {
    //         $(".menu-toggle").removeClass("is-active");

    //         // Hide menu header search when only menu icons are visible
    //         if ($("body").data("menu") === "vertical-menu") {
    //           if ($(".main-menu-header")) {
    //             $(".main-menu-header").hide();
    //           }
    //         }
    //       }
    //     }

    //     setTimeout(function () {
    //       callback2.call(menuObj);
    //       $("body").removeClass("changing-menu");

    //       menuObj.update();
    //     }, 500);
    //   },

    //   open: function () {
    //     this.transit(
    //       function () {
    //         $("body").removeClass("menu-hide menu-collapsed").addClass("menu-open");
    //         this.hidden = false;
    //         this.expanded = true;

    //         if ($("body").hasClass("vertical-overlay-menu")) {
    //           $(".sidenav-overlay").addClass("show");
    //           // $('.sidenav-overlay').removeClass('d-none').addClass('d-block');
    //           // $('body').css('overflow', 'hidden');
    //         }
    //       },
    //       function () {
    //         if (!$(".main-menu").hasClass("menu-native-scroll") && $(".main-menu").hasClass("menu-fixed")) {
    //           this.manualScroller.enable();
    //           $(".main-menu-content").css(
    //             "height",
    //             $(window).height() -
    //               $(".header-navbar").height() -
    //               $(".main-menu-header").outerHeight() -
    //               $(".main-menu-footer").outerHeight()
    //           );
    //           // this.manualScroller.update();
    //         }

    //         if (!$("body").hasClass("vertical-overlay-menu")) {
    //           $(".sidenav-overlay").removeClass("show");
    //           // $('.sidenav-overlay').removeClass('d-block d-none');
    //           // $('body').css('overflow', 'auto');
    //         }
    //       }
    //     );
    //   },

    //   hide: function () {
    //     this.transit(
    //       function () {
    //         $("body").removeClass("menu-open menu-expanded").addClass("menu-hide");
    //         this.hidden = true;
    //         this.expanded = false;

    //         if ($("body").hasClass("vertical-overlay-menu")) {
    //           $(".sidenav-overlay").removeClass("show");
    //           // $('.sidenav-overlay').removeClass('d-block').addClass('d-none');
    //           // $('body').css('overflow', 'auto');
    //         }
    //       },
    //       function () {
    //         if (!$(".main-menu").hasClass("menu-native-scroll") && $(".main-menu").hasClass("menu-fixed")) {
    //           this.manualScroller.enable();
    //         }

    //         if (!$("body").hasClass("vertical-overlay-menu")) {
    //           $(".sidenav-overlay").removeClass("show");
    //           // $('.sidenav-overlay').removeClass('d-block d-none');
    //           // $('body').css('overflow', 'auto');
    //         }
    //       }
    //     );
    //   },

    //   expand: function () {
    //     if (this.expanded === false) {
    //       if ($("body").data("menu") == "vertical-menu-modern") {
    //         $(".modern-nav-toggle")
    //           .find(".collapse-toggle-icon")
    //           .replaceWith(
    //             feather.icons["disc"].toSvg({ class: "d-none d-xl-block collapse-toggle-icon primary font-medium-4" })
    //           );
    //       }
    //       this.transit(
    //         function () {
    //           $("body").removeClass("menu-collapsed").addClass("menu-expanded");
    //           this.collapsed = false;
    //           this.expanded = true;
    //           $(".sidenav-overlay").removeClass("show");

    //           // $('.sidenav-overlay').removeClass('d-block d-none');
    //         },
    //         function () {
    //           if ($(".main-menu").hasClass("menu-native-scroll") || $("body").data("menu") == "horizontal-menu") {
    //             this.manualScroller.disable();
    //           } else {
    //             if ($(".main-menu").hasClass("menu-fixed")) this.manualScroller.enable();
    //           }

    //           if (
    //             ($("body").data("menu") == "vertical-menu" || $("body").data("menu") == "vertical-menu-modern") &&
    //             $(".main-menu").hasClass("menu-fixed")
    //           ) {
    //             $(".main-menu-content").css(
    //               "height",
    //               $(window).height() -
    //                 $(".header-navbar").height() -
    //                 $(".main-menu-header").outerHeight() -
    //                 $(".main-menu-footer").outerHeight()
    //             );
    //             // this.manualScroller.update();
    //           }
    //         }
    //       );
    //     }
    //   },

    //   collapse: function () {
    //     if (this.collapsed === false) {
    //       if ($("body").data("menu") == "vertical-menu-modern") {
    //         $(".modern-nav-toggle")
    //           .find(".collapse-toggle-icon")
    //           .replaceWith(
    //             feather.icons["circle"].toSvg({
    //               class: "d-none d-xl-block collapse-toggle-icon primary font-medium-4",
    //             })
    //           );
    //       }
    //       this.transit(
    //         function () {
    //           $("body").removeClass("menu-expanded").addClass("menu-collapsed");
    //           this.collapsed = true;
    //           this.expanded = false;

    //           $(".content-overlay").removeClass("d-block d-none");
    //         },
    //         function () {
    //           if ($("body").data("menu") == "horizontal-menu" && $("body").hasClass("vertical-overlay-menu")) {
    //             if ($(".main-menu").hasClass("menu-fixed")) this.manualScroller.enable();
    //           }
    //           if (
    //             ($("body").data("menu") == "vertical-menu" || $("body").data("menu") == "vertical-menu-modern") &&
    //             $(".main-menu").hasClass("menu-fixed")
    //           ) {
    //             $(".main-menu-content").css("height", $(window).height() - $(".header-navbar").height());
    //             // this.manualScroller.update();
    //           }
    //           if ($("body").data("menu") == "vertical-menu-modern") {
    //             if ($(".main-menu").hasClass("menu-fixed")) this.manualScroller.enable();
    //           }
    //         }
    //       );
    //     }
    //   },

    //   toOverlayMenu: function (screen, menuType) {
    //     var menu = $("body").data("menu");
    //     if (menuType == "vertical-menu-modern") {
    //       if (screen == "lg" || screen == "md" || screen == "sm" || screen == "xs") {
    //         if ($("body").hasClass(menu)) {
    //           $("body").removeClass(menu).addClass("vertical-overlay-menu");
    //         }
    //       } else {
    //         if ($("body").hasClass("vertical-overlay-menu")) {
    //           $("body").removeClass("vertical-overlay-menu").addClass(menu);
    //         }
    //       }
    //     } else {
    //       if (screen == "sm" || screen == "xs") {
    //         if ($("body").hasClass(menu)) {
    //           $("body").removeClass(menu).addClass("vertical-overlay-menu");
    //         }
    //       } else {
    //         if ($("body").hasClass("vertical-overlay-menu")) {
    //           $("body").removeClass("vertical-overlay-menu").addClass(menu);
    //         }
    //       }
    //     }
    //   },

    //   changeMenu: function (screen) {
    //     // Replace menu html
    //     $('div[data-menu="menu-wrapper"]').html("");
    //     $('div[data-menu="menu-wrapper"]').html(menuWrapper_el);

    //     var menuWrapper = $('div[data-menu="menu-wrapper"]'),
    //       menuContainer = $('div[data-menu="menu-container"]'),
    //       menuNavigation = $('ul[data-menu="menu-navigation"]'),
    //       /*megaMenu           = $('li[data-menu="megamenu"]'),
    //     megaMenuCol        = $('li[data-mega-col]'),*/
    //       dropdownMenu = $('li[data-menu="dropdown"]'),
    //       dropdownSubMenu = $('li[data-menu="dropdown-submenu"]');

    //     if (screen === "xl") {
    //       // Change body classes
    //       $("body").removeClass("vertical-layout vertical-overlay-menu fixed-navbar").addClass($("body").data("menu"));

    //       // Remove navbar-fix-top class on large screens
    //       $("nav.header-navbar").removeClass("fixed-top");

    //       // Change menu wrapper, menu container, menu navigation classes
    //       menuWrapper.removeClass().addClass(menuWrapperClasses);

    //       $("a.dropdown-item.nav-has-children").on("click", function () {
    //         event.preventDefault();
    //         event.stopPropagation();
    //       });
    //       $("a.dropdown-item.nav-has-parent").on("click", function () {
    //         event.preventDefault();
    //         event.stopPropagation();
    //       });
    //     } else {
    //       // Change body classes
    //       $("body").removeClass($("body").data("menu")).addClass("vertical-layout vertical-overlay-menu fixed-navbar");

    //       // Add navbar-fix-top class on small screens
    //       $("nav.header-navbar").addClass("fixed-top");

    //       // Change menu wrapper, menu container, menu navigation classes
    //       menuWrapper.removeClass().addClass("main-menu menu-light menu-fixed menu-shadow");
    //       // menuContainer.removeClass().addClass('main-menu-content');
    //       menuNavigation.removeClass().addClass("navigation navigation-main");

    //       // If Dropdown Menu
    //       dropdownMenu.removeClass("dropdown").addClass("has-sub");
    //       dropdownMenu.find("a").removeClass("dropdown-toggle nav-link");
    //       dropdownMenu.children("ul").find("a").removeClass("dropdown-item");
    //       dropdownMenu.find("ul").removeClass("dropdown-menu");
    //       dropdownSubMenu.removeClass().addClass("has-sub");

    //       $.app.nav.init();

    //       // Dropdown submenu on small screen on click
    //       // --------------------------------------------------
    //       $("ul.dropdown-menu [data-toggle=dropdown]").on("click", function (event) {
    //         event.preventDefault();
    //         event.stopPropagation();
    //         $(this).parent().siblings().removeClass("open");
    //         $(this).parent().toggleClass("open");
    //       });

    //       $(".main-menu-content").find("li.active").parents("li").addClass("sidebar-group-active");

    //       $(".main-menu-content").find("li.active").closest("li.nav-item").addClass("open");
    //     }

    //     if (feather) {
    //       feather.replace({ width: 14, height: 14 });
    //     }
    //   },

    //   toggle: function () {
    //     var currentBreakpoint = Unison.fetch.now(); // Current Breakpoint
    //     var collapsed = this.collapsed;
    //     var expanded = this.expanded;
    //     var hidden = this.hidden;
    //     var menu = $("body").data("menu");

    //     switch (currentBreakpoint.name) {
    //       case "xl":
    //         if (expanded === true) {
    //           if (menu == "vertical-overlay-menu") {
    //             this.hide();
    //           } else {
    //             this.collapse();
    //           }
    //         } else {
    //           if (menu == "vertical-overlay-menu") {
    //             this.open();
    //           } else {
    //             this.expand();
    //           }
    //         }
    //         break;
    //       case "lg":
    //         if (expanded === true) {
    //           if (menu == "vertical-overlay-menu" || menu == "vertical-menu-modern" || menu == "horizontal-menu") {
    //             this.hide();
    //           } else {
    //             this.collapse();
    //           }
    //         } else {
    //           if (menu == "vertical-overlay-menu" || menu == "vertical-menu-modern" || menu == "horizontal-menu") {
    //             this.open();
    //           } else {
    //             this.expand();
    //           }
    //         }
    //         break;
    //       case "md":
    //       case "sm":
    //         if (hidden === true) {
    //           this.open();
    //         } else {
    //           this.hide();
    //         }
    //         break;
    //       case "xs":
    //         if (hidden === true) {
    //           this.open();
    //         } else {
    //           this.hide();
    //         }
    //         break;
    //     }
    //   },

    //   update: function () {
    //     this.manualScroller.update();
    //   },

    //   reset: function () {
    //     this.expanded = false;
    //     this.collapsed = false;
    //     this.hidden = false;
    //     $("body").removeClass("menu-hide menu-open menu-collapsed menu-expanded");
    //   },
    // };
  }

  handleClickLogout() {
    localStorage.removeItem("token");
    localStorage.setItem("isLoggedIn", false);
    this.setState({ toDashboard: true });
  }

  navshow = () => {
    // alert("Hello");
    document.getElementsByClassName("main-menu menu-light menu-accordion menu-shadow")[0].style.left = 0;
    document.getElementsByClassName("app-content content")[0].style.marginLeft = "260px";
    document.getElementsByClassName(
      "header-navbar navbar navbar-expand-lg align-items-center floating-nav navbar-light navbar-shadow"
    )[0].style.width = "calc(100vw - (100vw - 100%) - calc(2rem * 2) - 260px)";
    document.getElementsByClassName("nav navbar-nav d-xl-none")[0].setAttribute("style", "display: none");
  };

  render() {
    if (this.state.toDashboard === true) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <TitleComponent title={this.state.title} />
        <nav className="header-navbar navbar navbar-expand-lg align-items-center floating-nav navbar-light navbar-shadow">
          <div className="navbar-container d-flex content">
            <div className="bookmark-wrapper d-flex align-items-center">
              <ul className="nav navbar-nav d-xl-none" onClick={this.navshow}>
                <li className="nav-item">
                  <a className="nav-link menu-toggle" href="#">
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
                      className="feather feather-menu ficon"
                    >
                      <line x1="3" y1="12" x2="21" y2="12"></line>
                      <line x1="3" y1="6" x2="21" y2="6"></line>
                      <line x1="3" y1="18" x2="21" y2="18"></line>
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
            <ul className="nav navbar-nav align-items-center ml-auto">
              <li className="nav-item dropdown dropdown-user">
                <a
                  className="nav-link dropdown-toggle dropdown-user-link"
                  id="dropdown-user"
                  href="#"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <div className="user-nav d-sm-flex d-none">
                    <span className="user-status">Global Currency</span>
                  </div>
                </a>
                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdown-user">
                  <a className="dropdown-item">USD</a>
                  <a className="dropdown-item">EUR</a>
                  <a className="dropdown-item">...</a>
                </div>
              </li>
              <li className="nav-item dropdown dropdown-user">
                <a
                  className="nav-link dropdown-toggle dropdown-user-link"
                  id="dropdown-user"
                  href="#"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <div className="user-nav d-sm-flex d-none">
                    <span className="user-status">Categories</span>
                  </div>
                </a>
                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdown-user">
                  <a className="dropdown-item">Subscription 1</a>
                  <a className="dropdown-item">Subscription 2</a>
                  <a className="dropdown-item">Subscription 3</a>
                  <a className="dropdown-item">...</a>
                </div>
              </li>
              <li className="nav-item dropdown dropdown-user">
                <a
                  className="nav-link dropdown-toggle dropdown-user-link"
                  id="dropdown-user"
                  href="#"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <div className="user-nav d-sm-flex d-none">
                    <span className="user-status">Payment Methods</span>
                  </div>
                </a>
                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdown-user">
                  <a className="dropdown-item">Paypal</a>
                  <a className="dropdown-item">Credit Card</a>
                  <a className="dropdown-item">...</a>
                </div>
              </li>
              <li className="nav-item d-none d-lg-block">
                <a className="nav-link nav-link-style">
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
                    className="feather feather-moon ficon"
                  >
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                  </svg>
                </a>
              </li>
              <li className="nav-item dropdown dropdown-user">
                <a
                  className="nav-link dropdown-toggle dropdown-user-link"
                  id="dropdown-user"
                  href="#"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <div className="user-nav d-sm-flex d-none">
                    <span className="user-name font-weight-bolder">{this.state.name}</span>
                    <span className="user-status">{this.state.email}</span>
                  </div>
                  <span className="avatar">
                    <img
                      className="round"
                      // src={JSON.parse(localStorage.getItem("currentUser")).photo ? this.state.avatar : userImg}
                      src={userImg}
                      alt="avatar"
                      height="40"
                      width="40"
                    />
                    <span className="avatar-status-online"></span>
                  </span>
                </a>
                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdown-user">
                  <a className="dropdown-item" href="/profile">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      fill="currentColor"
                      className="bi bi-person"
                      viewBox="0 0 14 14"
                      style={{ width: 30, height: 14 }}
                    >
                      <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                    </svg>{" "}
                    Profile
                  </a>
                  <a className="dropdown-item" onClick={this.handleClickLogout}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      fill="currentColor"
                      className="bi bi-box-arrow-right"
                      viewBox="0 0 14 14"
                      style={{ width: 30, height: 12 }}
                    >
                      <path
                        fill="evenodd"
                        d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
                      />
                      <path
                        fill="evenodd"
                        d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
                      />
                    </svg>{" "}
                    Logout
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </nav>
        <ul className="main-search-list-defaultlist d-none">
          <li className="d-flex align-items-center">
            <a href="#">
              <h6 className="section-label mt-75 mb-0">Files</h6>
            </a>
          </li>
          <li className="auto-suggestion">
            <a className="d-flex align-items-center justify-content-between w-100" href="app-file-manager.html">
              <div className="d-flex">
                <div className="mr-75">
                  <img src="/app-assets/images/icons/xls.png" alt="png" height="32" />
                </div>
                <div className="search-data">
                  <p className="search-data-title mb-0">Two new item submitted</p>
                  <small className="text-muted">Marketing Manager</small>
                </div>
              </div>
              <small className="search-data-size mr-50 text-muted">&apos;17kb</small>
            </a>
          </li>
          <li className="auto-suggestion">
            <a className="d-flex align-items-center justify-content-between w-100" href="app-file-manager.html">
              <div className="d-flex">
                <div className="mr-75">
                  <img src="/app-assets/images/icons/jpg.png" alt="png" height="32" />
                </div>
                <div className="search-data">
                  <p className="search-data-title mb-0">52 JPG file Generated</p>
                  <small className="text-muted">FontEnd Developer</small>
                </div>
              </div>
              <small className="search-data-size mr-50 text-muted">&apos;11kb</small>
            </a>
          </li>
          <li className="auto-suggestion">
            <a className="d-flex align-items-center justify-content-between w-100" href="app-file-manager.html">
              <div className="d-flex">
                <div className="mr-75">
                  <img src="/app-assets/images/icons/pdf.png" alt="png" height="32" />
                </div>
                <div className="search-data">
                  <p className="search-data-title mb-0">25 PDF File Uploaded</p>
                  <small className="text-muted">Digital Marketing Manager</small>
                </div>
              </div>
              <small className="search-data-size mr-50 text-muted">&apos;150kb</small>
            </a>
          </li>
          <li className="auto-suggestion">
            <a className="d-flex align-items-center justify-content-between w-100" href="app-file-manager.html">
              <div className="d-flex">
                <div className="mr-75">
                  <img src="/app-assets/images/icons/doc.png" alt="png" height="32" />
                </div>
                <div className="search-data">
                  <p className="search-data-title mb-0">Anna_Strong.doc</p>
                  <small className="text-muted">Web Designer</small>
                </div>
              </div>
              <small className="search-data-size mr-50 text-muted">&apos;256kb</small>
            </a>
          </li>
          <li className="d-flex align-items-center">
            <a href="#">
              <h6 className="section-label mt-75 mb-0">Members</h6>
            </a>
          </li>
          <li className="auto-suggestion">
            <a className="d-flex align-items-center justify-content-between py-50 w-100" href="app-user-view.html">
              <div className="d-flex align-items-center">
                <div className="avatar mr-75">
                  <img src="/app-assets/images/portrait/small/avatar-s-8.jpg" alt="png" height="32" />
                </div>
                <div className="search-data">
                  <p className="search-data-title mb-0">John Doe</p>
                  <small className="text-muted">UI designer</small>
                </div>
              </div>
            </a>
          </li>
          <li className="auto-suggestion">
            <a className="d-flex align-items-center justify-content-between py-50 w-100" href="app-user-view.html">
              <div className="d-flex align-items-center">
                <div className="avatar mr-75">
                  <img src="/app-assets/images/portrait/small/avatar-s-1.jpg" alt="png" height="32" />
                </div>
                <div className="search-data">
                  <p className="search-data-title mb-0">Michal Clark</p>
                  <small className="text-muted">FontEnd Developer</small>
                </div>
              </div>
            </a>
          </li>
          <li className="auto-suggestion">
            <a className="d-flex align-items-center justify-content-between py-50 w-100" href="app-user-view.html">
              <div className="d-flex align-items-center">
                <div className="avatar mr-75">
                  <img src="/app-assets/images/portrait/small/avatar-s-14.jpg" alt="png" height="32" />
                </div>
                <div className="search-data">
                  <p className="search-data-title mb-0">Milena Gibson</p>
                  <small className="text-muted">Digital Marketing Manager</small>
                </div>
              </div>
            </a>
          </li>
          <li className="auto-suggestion">
            <a className="d-flex align-items-center justify-content-between py-50 w-100" href="app-user-view.html">
              <div className="d-flex align-items-center">
                <div className="avatar mr-75">
                  <img src="/app-assets/images/portrait/small/avatar-s-6.jpg" alt="png" height="32" />
                </div>
                <div className="search-data">
                  <p className="search-data-title mb-0">Anna Strong</p>
                  <small className="text-muted">Web Designer</small>
                </div>
              </div>
            </a>
          </li>
        </ul>
        <ul className="main-search-list-defaultlist-other-list d-none">
          <li className="auto-suggestion justify-content-between">
            <a className="d-flex align-items-center justify-content-between w-100 py-50">
              <div className="d-flex justify-content-start">
                <span className="mr-75" data-feather="alert-circle"></span>
                <span>No results found.</span>
              </div>
            </a>
          </li>
        </ul>
      </div>
    );
  }
}

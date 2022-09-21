import Helmet from "react-helmet";
import React from "react";

const TitleComponent = ({ title }) => {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{title ? title : ""}</title>
    </Helmet>
  );
};

export default TitleComponent;

import React from "react";
import FooterList from "../FooterList";

const footerLogo = [
  {
    id: 1,
    text: "Portfolio",
    size: "medium",
    bold: true,
  },
];

function FooterLogo() {
  return <FooterList list={footerLogo} />;
}

export default FooterLogo;

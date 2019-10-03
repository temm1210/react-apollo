import React from "react";
import FooterList from "../FooterList";

const footerCopyRight = [
  {
    id: 1,
    text: "Copyright © 2019 송택우",
    size: "verySmall",
  },
];

function FooterCopyRight() {
  return <FooterList list={footerCopyRight} />;
}

export default FooterCopyRight;

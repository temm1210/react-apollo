import React from "react";
import FooterList from "../FooterList";

const footerContent = [
  {
    id: 1,
    text: "YarnWorkspace",
  },
  {
    id: 2,
    text: "React",
  },
  {
    id: 3,
    text: "StyledComponent",
  },
  {
    id: 4,
    text: "Apollo",
  },
  {
    id: 5,
    text: "GraphQL",
  },
  {
    id: 6,
    text: "Express",
  },
  {
    id: 7,
    text: "MySql",
  },
  {
    id: 8,
    text: "Kafka",
  },
];

function FooterContent() {
  return <FooterList list={footerContent} />;
}

export default FooterContent;

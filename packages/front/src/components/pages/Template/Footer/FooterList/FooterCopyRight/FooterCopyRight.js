import React from "react";
import FooterList from "../FooterList";

const footerCopyRight = [
  {
    id: 1,
    text: "Copyright © 2019",
    size: "verySmall",
  },
  {
    id: 2,
    text:
      "송택우(웹,모바일 - React, React-Native, MySql, Docker, Express, Kafka)",
    size: "verySmall",
  },
  {
    id: 3,
    text: "박현준(DB,파이프라인 - MySql, Redis,Kafka)",
    size: "verySmall",
  },
  {
    id: 4,
    text: "이아연(UI/UX디자인 - React, UI/UX, CSS, HTML)",
    size: "verySmall",
  },
  {
    id: 5,
    text: "김민주(UI/UX디자인 - React, React-Native, UI/UX, CSS, HTML,Sketch)",
    size: "verySmall",
  },
  {
    id: 6,
    text: "박희진(기획 - 기획, 설계, Sketch, UI/UX)",
    size: "verySmall",
  },
  {
    id: 7,
    text: "이성근(튜닝,운영 - Express튜닝, MySql튜닝,Docker, Kubernetes,Kafka)",
    size: "verySmall",
  },
];

function FooterCopyRight() {
  return <FooterList list={footerCopyRight} />;
}

export default FooterCopyRight;

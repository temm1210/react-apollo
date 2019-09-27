import { createGlobalStyle, css } from "styled-components";

// theme
export const theme = {
  Button: {
    green: "#22d47b",
    blue: "#007bff", // "#6195FF",
    red: "#e81050",
  },
  FontSize: {
    verySmall: 14,
    small: 16,
    medium: 20,
    large: 24,
    big: 30,
  },
  FontColor: {
    transBlack: "rgba(0, 0, 0, 0.6)",
  },
};

// reset css
export const GlobalStyle = createGlobalStyle`
  body {
    @import url('https://fonts.googleapis.com/css?family=Old+Standard+TT|Questrial|Poppins|Noto+Sans|Noto+Sans+KR&display=swap');
    background-color:white;
    padding:0;
    margin:0;
    font-family: 'Poppins','Noto Sans','Noto Sans KR', sans-serif;
    box-sizing:border-box;
    border: 0;
	  font-size: 100%;
    width: 100%;
    height: 100%;
  }
  article, aside, details, figcaption, figure, 
  footer, header, hgroup, menu, nav, section, span {
    display: block;
  }
  ul,li {
    list-style: none;
  }
  button {
    border: none;
    outline: none;
    cursor: pointer;
    background-color:transparent;
  }
  a {
    text-decoration: none;
    color: inherit;
    cursor: pointer;
  }
  *:focus {
    outline: none;
  }
`;

// for media query
const sizes = {
  mobileS: 320,
  mobileM: 375,
  mobileL: 500,
  tablet: 768,
  laptop: 1024,
  laptopL: 1440,
  desktop: 1860,
};

export const media = Object.keys(sizes).reduce((acc, device) => {
  acc[device] = (...args) => css`
    @media (max-width: ${sizes[device]}px) {
      ${css(...args)};
    }
  `;
  return acc;
}, {});

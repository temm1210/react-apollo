/* eslint-disable react/no-danger */
import React from "react";
import PropTypes from "prop-types";

function Html({ content, tags, styled, state }) {
  const styles = styled.replace(/(\/\*[^*]*\*\/)/g, "");

  const head = `
        <meta charset="utf-8" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <link rel="manifest" href="/manifest.json" />
        <title>React App</title>
        ${tags.styles}
        ${tags.links}
        ${styles}
    `;

  console.log("tags:", tags);

  return (
    <html lang="en">
      <head dangerouslySetInnerHTML={{ __html: head }} />
      <body>
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <div id="root" dangerouslySetInnerHTML={{ __html: content }} />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__APOLLO_STATE__=${JSON.stringify(state).replace(
              /</g,
              "\\u003c",
            )}`,
          }}
        />
        <script />
      </body>
    </html>
  );
}

Html.propTypes = {
  content: PropTypes.string.isRequired,
  tags: PropTypes.object.isRequired,
  styled: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
};

export default PropTypes;

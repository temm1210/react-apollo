import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Editor from "components/Editor";

function ReadOnlyEditor({ id, value }) {
  useEffect(() => {
    document.getElementById(`${id}`).style.height = "100%";
    document.getElementById(`${id}`).style.backgroundColor = "white";
    document.querySelector(`#${id} > .ql-toolbar`).style.opacity = "0";
    document.querySelector(".ql-editor").style.overflow = "unset";
    document.querySelector(
      `#${id} .ql-toolbar.ql-snow + .ql-container.ql-snow`,
    ).style.height = "100%";
  });
  return <Editor id={id} value={value} readOnly />;
}

ReadOnlyEditor.defaultProps = {
  value: "",
};

ReadOnlyEditor.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string,
};

export default ReadOnlyEditor;

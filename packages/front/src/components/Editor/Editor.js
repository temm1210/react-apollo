import React, { useRef, useEffect } from "react";
import ReactQuill, { Quill } from "react-quill";
import PropTypes from "prop-types";
import ImageResize from "quill-image-resize-module";
import ImageUpload from "./modules/ImageUpload";

import "react-quill/dist/quill.snow.css";
import "./Editor.css";

Quill.register("modules/imageUpload", ImageUpload);
Quill.register("modules/imageResize", ImageResize);

// Editor 툴바
const toolbar = [
  // [{ header: [1, 2, false, 3] }],
  [{ size: ["small", false, "large", "huge"] }],
  [{ color: [] }, { background: [] }],
  [{ list: "ordered" }, { list: "bullet" }, { align: [] }],
  ["bold", "underline", "strike", "blockquote"],
  ["link", "image", "code-block"],
  ["clean"],
];

// Editor 이미지 업로드 로직
const imageUpload = {
  url: "http://localhost:4000/upload", // server url. If the url is empty then the base64 returns
  method: "POST", // change query method, default 'POST'
  name: "editorImage", // custom form name
  withCredentials: false, // withCredentials
  // headers: {}, // add custom headers, example { token: 'your-token'}
  // personalize successful callback and call next function to insert new url to the editor
  callbackOK: ({ url }, next) => {
    next(url);
  },
  // personalize failed callback
  callbackKO: serverError => {
    throw new Error("Image upload failed::::", serverError);
  },
};

function Editor({ id, value, focus, readOnly, onChange }) {
  const myEditor = useRef(null);

  useEffect(() => {
    if (focus) myEditor.current.focus();

    const element = document.querySelector(".ql-container");
    console.log("element.scrollTop:", element.scrollTop);
  });

  return (
    <ReactQuill
      id={id}
      className="myEditor"
      style={{
        height: "70vh",
        width: "100%",
        margin: "0 auto",
        paddingBottom: "2rem",
        lineHeight: "1.58",
      }}
      ref={myEditor}
      value={value}
      readOnly={readOnly}
      onChange={onChange}
      modules={{
        toolbar,
        imageUpload,
        imageResize: {
          displaySize: true,
        },
      }}
    />
  );
}

Editor.defaultProps = {
  id: "myEditor",
  value: "",
  readOnly: false,
  onChange: null,
  focus: false,
};

Editor.propTypes = {
  focus: PropTypes.bool,
  id: PropTypes.string,
  value: PropTypes.string,
  readOnly: PropTypes.bool,
  onChange: PropTypes.func,
};

export default Editor;

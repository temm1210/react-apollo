/* eslint-disable */

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

function Editor({ id, value, focus, readOnly, placeholder, onChange }) {
  const myEditor = useRef(null);

  useEffect(() => {
    if (focus) myEditor.current.focus();

    const element = document.querySelector(".ql-container");
    console.log("element.scrollTop:", element.scrollTop);
  });

  const handleKeyDown = e => {
    if (e.keyCode === 13) {
      const element = document.querySelector(".ql-editor");
      console.log("element.scrollTop:", element.scroll);

      // element.scrollTo(0, scrollY);
      // const scrollY = document.querySelector(".ql-container").scrollTop;
      // console.log("scrollY:", scrollY);
      // document.querySelector(".ql-container").scrollTo(0, scrollY);
      // document.querySelector(".ql-editor").scrollTo(0, 200000);
    }
  };

  return (
    <ReactQuill
      id={id}
      className="myEditor"
      placeholder={placeholder}
      style={{
        height: "70vh",
        width: "100%",
        margin: "0 auto",
        paddingBottom: "2rem",
        // maxWidth: "900px",
        lineHeight: "1.58",
      }}
      // onKeyDown={handleKeyDown}
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
  placeholder:
    "내용을 입력하세요. 제목은 Submit버튼을 클릭후 작성할 수 있습니다.",
  onChange: null,
  focus: false,
};

Editor.propTypes = {
  focus: PropTypes.bool,
  id: PropTypes.string,
  value: PropTypes.string,
  readOnly: PropTypes.bool,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
};

export default Editor;

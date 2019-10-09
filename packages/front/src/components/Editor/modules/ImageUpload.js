/**
 * Custom module for quilljs to allow user to drag images from their file system into the editor
 * and paste images from clipboard (Works on Chrome, Firefox, Edge, not on Safari)
 * @see https://quilljs.com/blog/building-a-custom-module/
 */

export default class ImageUpload {
  /**
   * Instantiate the module given a quill instance and any options
   * @param {Quill} quill
   * @param {Object} options
   */
  constructor(quill, options = {}) {
    // save the quill reference
    this.quill = quill;
    // save options
    this.options = options;
    // listen for drop and paste events
    this.quill.getModule("toolbar").addHandler("image", this.selectLocalImage);
  }

  /**
   * Select local image
   */
  selectLocalImage = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.click();

    // Listen upload local image and save to server
    input.onchange = () => {
      const file = input.files[0];

      // file type is only image.
      if (/^image\//.test(file.type)) {
        this.sendToServer(file);
      } else {
        console.warn("You could only upload images.");
      }
    };
  };

  /**
   * Send to server
   * @param {File} file
   */
  sendToServer = file => {
    // Handle custom upload
    const url = this.options.url;
    const name = this.options.name || "image";
    const headers = this.options.headers || {};
    const callbackOK = this.options.callbackOK;
    const method = this.options.method || "POST";
    const callbackKO = this.options.callbackKO;

    const fd = new FormData();
    fd.append(name, file);

    const xhr = new XMLHttpRequest();
    // init http query
    xhr.open(method, url, true);
    // add custom headers
    for (const index in headers) {
      xhr.setRequestHeader(index, headers[index]);
    }

    // listen callback
    xhr.onload = () => {
      if (xhr.status === 200) {
        callbackOK(JSON.parse(xhr.responseText), this.insert);
      } else {
        callbackKO({
          code: xhr.status,
          type: xhr.statusText,
          body: xhr.responseText,
        });
      }
    };

    xhr.send(fd);
  };

  /**
   * Insert the image into the document at the current cursor position
   * @param {String} dataUrl  The base64-encoded image URI
   */
  insert = dataUrl => {
    if (typeof document !== "undefined") {
      // eslint-disable-next-line global-require
      const { Quill } = require("react-quill");
      const Delta = Quill.import("delta");
      const imgElement = document.createElement("img");

      imgElement.setAttribute("src", dataUrl);

      this.quill.updateContents(
        new Delta()
          .retain(this.quill.getSelection().index)
          .insert({ image: dataUrl })
          .insert("\n"),
        //   new Delta({ insert: { image: dataUrl } }, { insert: "  " }),
      );

      this.quill.setSelection({
        index: this.quill.getSelection().index + 2,
        length: 0,
      });

      setTimeout(() => {
        document.querySelector(".ql-container").scrollTo(0, 200000);
      }, 300);
    }
    // this.quill.insertEmbed(range.index, "image", dataUrl, "user");
    // this.quill.setContents([{ insert: "\n" }]);
  };
}

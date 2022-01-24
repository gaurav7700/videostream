import React, { useState } from "react";

import axios from "axios";
const Upload = () => {
  const [file, setFile] = useState("");
  const [title, setTitle] = useState("");
  const [publishername, setPublishername] = useState("");
  const [video, setVideo] = useState("");

  const d = new Date().toString().slice(0, 15);

  const post = () => {
    if (file || title) {
      const data = new FormData();
      data.append("text", title);
      data.append("publishername", publishername);
      data.append("file", file);
      data.append("date", d);
   

      axios
        .post("/uploadvideo", data)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="submitform">
      <input
        className="posttext"
        type="text"
        name="text"
        placeholder="Publisher Name"
        value={publishername}
        onChange={(e) => {
          setPublishername(e.target.value);
        }}
      />
      <input
        className="posttext"
        type="text"
        name="text"
        placeholder="Video Title"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <input
        type="file"
        accept="video/*"
        className="imageinput"
        placeholder="Video"
        multiple={false}
        onChange={(e) => {
          setFile(e.target.files[0]);
        }}
      />
   
      <button className="button" onClick={post}>
        Post
      </button>
    </div>
  );
};

export default Upload;

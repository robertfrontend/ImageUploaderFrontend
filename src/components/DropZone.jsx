import React, { useCallback, useState, createRef } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import Dropzone from "react-dropzone";
import image_assets from "../assets/image.svg";

function MyDropzone(props) {
  const [image, setImage] = useState(null);

  const hableOnDrop = (data) => {
    setImage(data);

    props.postImage(data);
  };

  const dropzoneRef = createRef();
  const openDialog = () => {
    if (dropzoneRef.current) {
      dropzoneRef.current.open();
    }
  };

  return (
    <Content>
      <ContentDrop>
        <Dropzone
          onDrop={(acceptedFiles) => hableOnDrop(acceptedFiles)}
          ref={dropzoneRef}
        >
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <img src={image_assets} alt="" />
                <p>
                  {image
                    ? "Imagen agregada correctamente"
                    : "Drag & Drop your image here"}
                </p>
              </div>
            </section>
          )}
        </Dropzone>
      </ContentDrop>
      <div className="or">
        <button type="button" onClick={openDialog}>
          Choose a file
        </button>
      </div>
    </Content>
  );
}

const Content = styled.div`
  width: 100%;
  min-height: inherit;
  .or {
    padding-top: 1em;
    p {
      padding-bottom: 1em;
    }
  }
  button {
    margin-top: 0.2em;
    padding: 10px 2em;
    background: #2f80ed;
    border-radius: 8px;
    border-style: none;
    color: white;
    font-weight: 400;
  }
`;

const ContentDrop = styled.div`
  width: 100%;
  min-height: inherit;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  border: 2px dashed #97bef4;
  box-sizing: border-box;
  border-radius: 12px;
  background-color: #979ba024;
`;

export default MyDropzone;

import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import image from "./assets/image.svg";
import MyDropzone from "./components/DropZone";

function App() {
  const [loader, setLoader] = useState(false);
  const [complete, setComplete] = useState(false);
  const [newimage, setNewImage] = useState(false);

  const [linkcopy, setLinkCopy] = useState(false);

  const postImage = async (files) => {
    console.log(image[0], "enviado imagen");
    setLoader(true);

    try {
      let form_data = new FormData();
      if (files[0]) {
        form_data.append("file", files[0]);
      }

      const response = await axios.post(
        "https://imageuploaderrobertfrontend.herokuapp.com/upload_image",
        form_data
      );

      const new_image = response.data.data;

      setNewImage(new_image);

      setLoader(false);
      setComplete(true);
    } catch (error) {
      alert("Ha ocurrido un error al subir la imagen");
      setComplete(false);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(newimage);
    setLinkCopy(true);
  };

  const handleBack = () => {
    setComplete(false);
    setNewImage(false);
    setLinkCopy(false);
  };

  return (
    <AppComponent>
      <Card loader>
        {!complete ? (
          <>
            {!loader ? (
              <>
                <header>
                  <h3>Upload your image</h3>
                  <p>File should be Jpeg, Png,...</p>
                </header>
                <div className="content">
                  <MyDropzone postImage={postImage} />
                </div>
              </>
            ) : (
              <ContentLoading>
                <p>Uploading...</p>
                <div className="lds-roller">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </ContentLoading>
            )}
          </>
        ) : (
          <ContentComplete>
            <span className="material-icons md-36">check_circle</span>
            <h3>Uploaded Successfully!</h3>
            <img src={newimage} alt="" />
            <div className="copylink">
              <input
                type="text"
                disabled
                value={newimage}
                style={{ width: "100%" }}
                className="myInput"
              />
              <button type="button" onClick={() => handleCopyLink()}>
                CopyLink
              </button>
            </div>
            {linkcopy && (
              <p style={{ marginTop: "1em" }}>
                Link copiado satisfactoriamente!{" "}
                <span
                  className="material-icons md-18"
                  style={{ color: "rgba(79, 79, 79, 1);" }}
                >
                  content_copy
                </span>
              </p>
            )}
            <a href="#" onClick={() => handleBack()}>
              Volver
            </a>
          </ContentComplete>
        )}
      </Card>
    </AppComponent>
  );
}

const AppComponent = styled.div`
  width: 100%;
  min-height: 120vh;
  background: #acacac45;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: rgba(79, 79, 79, 1);
`;

const Card = styled.div`
  width: 402px;
  /* min-height: 469px; */
  min-height: ${(props) => (props.loader ? "10vh" : "469px")};
  background-color: white;
  border-radius: 12px;
  padding: ${(props) => (props.loader ? "1em" : "0.2em 2em")};
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  header {
    text-align: center;
    padding-top: 1em;
    padding-bottom: 1em;
    h3 {
      font-weight: 500;
      font-size: 1.5em;
      color: rgba(79, 79, 79, 1);
      padding-bottom: 1em;
    }
  }
  .content {
    width: 100%;
    min-height: 250px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 2em 0;
    img {
      width: 114px;
      padding-bottom: 2em;
    }
    p {
      color: rgba(189, 189, 189, 1);
    }
  }
`;

const ContentLoading = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  p {
    font-weight: 500;
    color: rgba(79, 79, 79, 1) !important;
  }
`;

const ContentComplete = styled.div`
  text-align: center;
  width: 100%;
  span {
    padding-top: 0.5em;
    color: rgba(33, 150, 83, 1);
  }
  h3 {
    font-weight: 500;
    padding-bottom: 2em;
  }
  img {
    width: 200px;
  }
  .url {
    padding-top: 1em;
  }
  button {
    margin-top: 0.2em;
    padding: 10px 2em;
    background: #2f80ed;
    border-radius: 8px;
    border-style: none;
    color: white;
    font-weight: 400;
    position: absolute;
    right: 0.2em;
  }
  .copylink {
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    input {
      width: 100%;
      padding: 15px 0em;
      padding-right: 10em;
      padding-left: 0.3em;
      background: #f6f8fb;
      border: 1px solid #e0e0e0;
      box-sizing: border-box;
      border-radius: 8px;
    }
  }
  a {
    text-decoration: none;
    margin-top: 0.5em;
    display: block;
    color: #2f80ed;
  }
`;

export default App;

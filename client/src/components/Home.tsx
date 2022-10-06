import React, { useState, ChangeEvent, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { uploadService } from "../services/upload.servise";
import { useDropzone, FileRejection, DropEvent } from "react-dropzone";
import logo from "../image/image_drag.svg";

export type HomeProps = {
  image: string;
};

const Home: React.FC<HomeProps> = (props) => {
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState("");

  const [isFetching, setIsFetching] = useState(true);

  const onDrop = useCallback(
    (
      acceptedFiles: File[],
      fileRejections: FileRejection[],
      event: DropEvent
    ) => {
      console.log("prueba");
    },
    []
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  console.log(isDragActive);
  const handleImUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    console.log("prueba");
    const form = new FormData();

    const files = event.target.files;

    if (files != null) {
      console.log(files[0]);
      form.append("image", files[0]);
    }

    try {
      const response = await uploadService(form);
      setImageUrl(response.data.imageUrl);
      setIsFetching(false);
    } catch (error) {
      navigate("lo siento no se pudo cargar la imagen");
    }

    if (isFetching === true) {
      return <h3 className="uploading"> uploading...</h3>;
    }
  };

  return (
    <form className="container">
      <h1 className="upload-title">Upload your image</h1>
      <h6 className="file-should">File should Jpej, Png...</h6>
      
      <div className="drag-drop" {...getRootProps()}  >
          <img src={logo} width={100}/>
          
          <input {...getInputProps()}  />
          {
        isDragActive ?
          <p className="drag-drop-text">Drop the files here ...</p> :
          <p className="drag-drop-text">Drag 'n' drop some files here, or click to select files</p>
      }
      </div>
        <h6 className="file-should">Or</h6>
      <div id="div-file">
        <p id="text">Choose a file</p>
        <input id="btn" type="file" onChange={handleImUpload} />
      </div>

      {imageUrl == null ? (<img className="image-selector" src={imageUrl} alt="image" width={80} /> ) : null }

     
    </form>
  );
};

export default Home;

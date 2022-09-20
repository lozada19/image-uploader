import React, { useEffect, useState, MouseEvent, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { uploadService } from "../services/upload.servise";

export type HomeProps = {
  img: string;
};

const Home: React.FC<HomeProps> = (props) => {
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState("");

  const handleImUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    console.log("prueba");
    const form = new FormData();

    const files = event.target.files;

    if (files != null) {
      console.log(files[0]);
      form.append("img", files[0]);
    }

    try {
      const response = await uploadService(form);
      setImageUrl(response.data.imageUrl);
    } catch (error) {
      navigate("lo siento no se pudo cargar la imagen");
    }
  };

  return (
    <div>
      <form>
        <label>Imagen</label>
        <input type="file" onChange={handleImUpload} />
        <img className="image-selector" src={imageUrl} alt="image" width={80} />
        
      </form>
    </div>
  );
};

export default Home;

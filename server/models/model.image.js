const { Schema, model } = require("mongoose");


const imageSchema = new Schema(
    {
      image: String,
    },
  );
  
  const ImageModel = model("Image", imageSchema);
  
  module.exports =  ImageModel;
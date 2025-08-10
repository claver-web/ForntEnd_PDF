import FileUpload from "./fileUpload";
import { TextInput } from "./labelNames";
import React, { useRef, useState, useEffect } from "react";

function Card() {
  const formRef = useRef(null);

  const [uploadedImage, setUploadedImage] = useState(null);
  const [sizeOfImage, setSizeofImage] = useState({})

  const [isSize, setIsSize] = useState(false)
  const [download, setDownload] = useState(false)

  const handleImageUpload = (imageURL) => {

    const imgURLer = URL.createObjectURL(imageURL)
    setUploadedImage(imgURLer);

    const img = new Image();
    img.onload = function () {
      setSizeofImage({
        height: img.height,
        width: img.width,

        name: imageURL.name,
        size: imageURL.size,
        type: imageURL.type
      });
      setIsSize(true);

      // Cleanup
      URL.revokeObjectURL(imgURLer);
    };
    img.src = imgURLer
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);

    const data = {};
    for (let [key, value] of formData.entries()) {
      data[key] = value;
    }

    console.log(data)

    const response = await fetch('https://project-pdf-8ve3.onrender.com/edit_image/', {
      method: "POST",
      body: formData
    })
    .then(response => response.blob())
    .then(blob => {
      const url = window.URL.createObjectURL(blob);
      setUploadedImage(url)
      // handleImageUpload(blob)
      setDownload(true)
    })
    
  };

  return (
    <article className="lg:max-w-full bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
      
      <div className="lg:flex lg:justify-between items-center p-2"> 
        <div className="text-center">
          <img src={uploadedImage} className="w-fit h-fit object-center" />
          <br />

          {download && 
            <div className="text-center">
              <a href={uploadedImage} download={getResizedFileName(sizeOfImage.name)}> Download </a>
            </div>
          }

          {isSize && 
          <div>
            <h2>Current File Info:</h2>
            <div className="bg-black p-4">
              <h3> Dimentios: {sizeOfImage.height} x {sizeOfImage.width}</h3>
              <h3>Size: {sizeOfImage.size / 1024} KB</h3>
              <h3>FileType: {sizeOfImage.type}</h3>
              <h3>FileName: {sizeOfImage.name}</h3>
            </div>
          </div>
          }
        </div>

        <div className="p-4 text-center">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Welcome to title
          </h2>

          <div className="p-3 bg-black">
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              encType="multipart/form-data"
              className="space-y-4"
            >
              {/* File upload (with name for FormData) */}
              <FileUpload 
              onUpload={handleImageUpload}
              />

              {/* Text inputs (with name props) */}
              <TextInput
                id="height"
                name="height"
                label="Height"
                type="text"
                placeholder="Enter the height in px"
              />

              <TextInput
                id="width"
                name="width"
                label="Width"
                type="text"
                placeholder="Enter the width in px"
              />

              <button
                type="submit"
                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-500">

                Convert

              </button>
              </form>
            </div>
          </div>
      </div>
    </article>
  );
}

export default Card;


function getResizedFileName(picPath) {
    // Get just the filename, remove any query strings
    let dotIndex = picPath.lastIndexOf('.');
    let baseName = dotIndex !== -1 ? picPath.substring(0, dotIndex) : picPath;
    return baseName + "_resized.jpg";
}
import './App.css';
import React, { useState, useRef } from "react";
import { storage } from "./firebase";
import { ref, uploadBytes} from "firebase/storage";
import { Camera } from "react-camera-pro";
import { v4 } from "uuid";

const Component = () => {
  function base64ToFile(base64String, fileName) {
    // Remove the data:image/<file-type>;base64, prefix
    const base64Data = base64String.replace(/^data:image\/\w+;base64,/, '');
  
    // Convert the base64 string to binary data
    const binaryData = atob(base64Data);
  
    // Create an ArrayBuffer from the binary data
    const buffer = new ArrayBuffer(binaryData.length);
    const view = new Uint8Array(buffer);
    for (let i = 0; i < binaryData.length; i++) {
      view[i] = binaryData.charCodeAt(i);
    }
  
    // Create a Blob from the ArrayBuffer
    const blob = new Blob([buffer], { type: 'image/jpeg' }); // Change the 'image/jpeg' to the appropriate file type
  
    // Create a File from the Blob
    const file = new File([blob], fileName, { type: blob.type });
  
    return file;
  }

  const camera = useRef(null);
  const [image, setImage] = useState(null);

  const uploadImage = () =>{
    // if (image==null) return;
    setImage(camera.current.takePhoto())
    // Speicherort
    const imageRef = ref(storage,`test1/${ v4() }`);
    
    uploadBytes(imageRef,base64ToFile(image,"picture")).then(()=>{
      alert("Bild hochgeladen")
    });
  }

  return (
    <div>
      <Camera ref={camera} aspectRatio={1/1}/>
      <button onClick={uploadImage}>Take photo</button>
      <button onClick={()=> camera.current.switchCamera()}>Switch Camera</button>
    </div>
  );
}

export default Component;

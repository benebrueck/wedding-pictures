import './App.css';
import React, { useState, useRef } from "react";
import { storage } from "./firebase";
import { ref, uploadBytes} from "firebase/storage";
import { Camera } from "react-camera-pro";
// import { v1 } from "uuid";
import { format } from "date-fns"
import { wait } from '@testing-library/user-event/dist/utils';

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
    setImage(camera.current.takePhoto()).then(() => {
      console.log("Picture taken");
      alert("Foto gemacht")
    });
    // Speicherort
    
    const time = format(new Date(),'ddMMyyhhmmss')
    
    const rand = Math.floor(1000 + 9000 * Math.random());
    const fileend = ".jpeg"
    const imageRef = ref(storage,`test1/${ time + rand + fileend}`);
    uploadBytes(imageRef,base64ToFile(image,"bild"))
  }

  return (
    <div>
      <Camera ref={camera} aspectRatio={9/16}/>
      <button onClick={uploadImage} className='dot'></button>
      <button onClick={()=> camera.current.switchCamera()} className='img'></button>
    </div>
  );
}

export default Component;  
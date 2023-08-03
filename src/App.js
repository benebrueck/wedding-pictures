import './App.css';
import React, { useState, useRef, useEffect} from "react";
import { storage } from "./firebase";
import { ref, uploadBytes} from "firebase/storage";
import { Camera} from "react-camera-pro";
import { format } from "date-fns"

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
  const [numberOfCameras, setNumberOfCameras] = useState(0);
  const [imagetaken, setImagetaken] = useState(false)
  const [ready,setReady] = useState(false);

  const uploadImage = () =>{
    if (camera.current){
      const foto = camera.current.takePhoto();
      setImage(foto);
      setImagetaken(true);
      // Speicherort
      const filename = format(new Date(),'yy.MM.dd hh:mm:ss:SSS') + ".jpeg"
      const imageRef = ref(storage,`test1/${filename}`);
      uploadBytes(imageRef,base64ToFile(foto,"bild"));
    }
  }

  return (
    <div>
      <Camera ref={camera} facingMode='environment' numberOfCamerasCallback={setNumberOfCameras}/>
      <button className='dot' onClick={uploadImage}></button>
      <button hidden = {numberOfCameras<=1} onClick={()=> camera.current.switchCamera()} className='switch'></button>
      <img hidden={imagetaken==false} className="photo" src={image} alt="Foto"></img>
      <a hidden = {true} href="https://www.flaticon.com/de/kostenlose-icons/hochzeit" title="hochzeit Icons">Hochzeit Icons erstellt von xnimrodx - Flaticon</a>
    </div>
  );
}

export default Component;
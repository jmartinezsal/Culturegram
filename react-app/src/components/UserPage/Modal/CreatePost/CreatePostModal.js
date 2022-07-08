import { useState } from "react";
import ImageUploader from "../../../Tools/ImageUploader";


function CreatePostModal(){
  const [content, setContent] = useState('');
  const [images, setImages ] = useState([])

  return (
    <div className="post-modal">
      <p className="modal-header">Create new post and show us your culture!</p>
      <ImageUploader images={images} setImages={setImages} type="post" />
    </div>
  )
}

export default CreatePostModal;

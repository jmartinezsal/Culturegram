import ImageUploader from "../../../Tools/ImageUploader";


function ModalUploader({ images, setImages, Continue }) {

  return (
    <div className="post-modal">
      <div className="modal-header">
        <p>Create new post and show us your culture!</p>
        <p className="modal-right-btn btn" onClick={Continue}
        style={images.length === 0 ?{visibility: "hidden"} : undefined} >Next</p>
      </div>
      <ImageUploader images={images} setImages={setImages} type="post" />
    </div>

  )
}

export default ModalUploader;

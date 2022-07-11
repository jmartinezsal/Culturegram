import { useState, useEffect } from "react";
import ImageUploading from "react-images-uploading";
import { ImFilePicture } from 'react-icons/im';

const ImageUploader = ({ images, setImages, type }) => {
  const [errors, setErrors] = useState([])

	useEffect(() =>{
		let errors= [];
		if(images.length === 0) errors.push("You must at least have one and a max of five images for a post.")
		setErrors(errors)
	 }, [images])

	const onChange = (imageList) => {
		setImages(imageList);
	};

	return (
		<div className="image-uploader" >

			<ImageUploading
				multiple
				value={images}
				onChange={onChange}
				maxNumber={type === "post" ? 5 : 1}
				dataURLKey="data_url"
			>
				{({
					onImageUpload,
					onImageRemoveAll,
					onImageUpdate,
					onImageRemove,
					imageList,
					isDragging,
					dragProps,
				}) => (
					// write your building UI
					<div className="upload-image-wrapper">
						<ImFilePicture />
						<h3>Drag photos and videos here </h3>
						<div className='error'>
							{
								errors.length > 0 &&
								errors.map((error, idx) => (
								<p key={idx}>{error}</p>
								))
							}
						</div>
						<div className="btn-wrapper">
							{images.length < 5 &&
							(
								<button
								className="image-uploader-btn"
								style={isDragging ? { opacity: ".8" } : undefined}
								// style={images.length <=5 ? {display: "none" : undefined}}
								onClick={onImageUpload}
								{...dragProps}
								>
								Drag and Drop images here
							</button>
								)}
							<button className="image-remove-btn" onClick={onImageRemoveAll}>Remove all images</button>
						</div>
						<div className="upload-image-container">
							{imageList.map((image, index) => (
								<div key={index} className="image-item">
									<img src={image["data_url"]} alt="" width="100" />
									<div className="image-item-btn-wrapper">
										<button className="image-btn" onClick={() => onImageUpdate(index)}>Update</button>
										<button className="image-btn image-remove-btn" onClick={() => onImageRemove(index)}>Remove</button>
									</div>
								</div>
							))}
						</div>
					</div>
				)}
			</ImageUploading>
		</div>
	);
};

export default ImageUploader;

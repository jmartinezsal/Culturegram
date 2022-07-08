import ImageUploading from "react-images-uploading";
import { ImFilePicture } from 'react-icons/im';

const ImageUploader = ({ images, setImages, type }) => {

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
					imageList,
					onImageUpload,
					onImageRemoveAll,
					onImageUpdate,
					onImageRemove,
					isDragging,
					dragProps,
				}) => (
					// write your building UI
					<div className="upload-image-wrapper">
						<ImFilePicture />
						<h3>Drag photos and videos here </h3>
						<div className="btn-wrapper">

							<button
								className="image-uploader-btn"
								{...dragProps}
								style={isDragging ? { opacity: ".9" } : undefined}
								onClick={onImageUpload}
							>
								Drag and Drop images here
							</button>
							<button className="image-remove-btn" onClick={onImageRemoveAll}>Remove all images</button>
						</div>
						<div className="upload-image-container">
						{imageList.map((image, index) => (
							<div key={index} className="image-item">
								<img src={image["data_url"]} alt="" width="100" />
								<div className="image-item-btn-wrapper">
									{/* <button className="image-btn" onClick={() => onImageUpdate(index)}>Update</button> */}
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

import { useState } from "react";
import ModalSubmit from "./ModalSubmit";
import ModalUploader from "./ModalUploader";


function CreatePostModal({setCreateModal}) {
  const [images, setImages] = useState([])
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => {
    setCurrentStep(currentStep + 1)
  }
  const prevStep = () => {
    setCurrentStep(currentStep - 1)
  }

  const Continue = e => {
    e.preventDefault();
    nextStep();
  }

  const Previous = e => {
    e.preventDefault();
    prevStep();
  }


  switch (currentStep) {
    case 1: {
      return (
        <ModalUploader images={images} setImages={setImages} Continue={Continue} />
      )
    }
    case 2: {
      return (
        <ModalSubmit images={images} Previous={Previous} setCreateModal={setCreateModal}/>
      )
    }
    default:
  }
}

export default CreatePostModal;

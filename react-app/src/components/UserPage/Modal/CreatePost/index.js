import { useState } from "react";
import { VscDiffAdded } from 'react-icons/vsc';

import { Modal } from "../../../../context/Modal";
import CreatePostModal from "./CreatePostModal";

function CreatePostButton() {
  const [createModal, setCreateModal] = useState(true);


  return (
    <>
      <VscDiffAdded className='nav-icons' onClick={() => setCreateModal(true)}/>
      {createModal &&
      <Modal onClose={() => setCreateModal(false)}>
        <CreatePostModal setModal={setCreateModal} />
      </Modal>
      }

    </>

  )
}


export default CreatePostButton;

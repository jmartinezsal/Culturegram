import { useState } from "react";
import { VscDiffAdded } from 'react-icons/vsc';

import { Modal } from "../../../../context/Modal";
import CreatePostModal from "./CreatePostModal";

function CreatePostButton() {
  const [createModal, setCreateModal] = useState(false);


  return (
    <>
      <VscDiffAdded className='nav-icons' onClick={() => setCreateModal(true)}/>
      {createModal &&
      <Modal onClose={() => setCreateModal(false)}>
        <CreatePostModal setCreateModal={setCreateModal} />
      </Modal>
      }

    </>

  )
}


export default CreatePostButton;

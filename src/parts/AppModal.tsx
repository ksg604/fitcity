import { ReactElement } from "react";
import Modal from "react-modal";
import { setModalIsOpen } from '../features/modal/modalSlice';
import { useAppSelector } from '../hooks';

export default function AppModal({children} : {children : ReactElement}) {

  const modalIsOpen = useAppSelector(state => state.modal.isOpen);

  const afterOpen = () => {
    // Callback after opening modal
  }

  const closeModal = () => {
    setModalIsOpen(false)
  }

  return (
    <Modal
      isOpen={modalIsOpen}
      onAfterOpen={afterOpen}
      onRequestClose={closeModal}
      contentLabel="Example Modal">
      {children}
    </Modal>
  )
}
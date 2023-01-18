import Modal, { Styles } from "react-modal";
import { setModalIsOpen } from '../features/modal/modalSlice';
import { useAppSelector, useAppDispatch } from '../hooks';
import styles from "./AppModal.module.css";

type modalProps = {
  title: string, 
  body: string, 
  onYes: () => Promise<void>
}

export default function AppModal({title, body, onYes} : modalProps) {

  const dispatch = useAppDispatch();
  const modalIsOpen = useAppSelector(state => state.modal.isOpen);
  const modalStyle : Styles = { content: {
    position: "absolute", 
    display: "flex", 
    flexDirection: "column",
    alignItems: "center",
    top: "12vh",
    right: "5%",
    left: "5%",
    marginTop: "auto",
    marginBottom: "auto",
    maxHeight: "fit-content",
    width: "90%"
  }};

  const afterOpen = () => {
    // Callback after opening modal
  }

  const closeModal = () => {
    dispatch(setModalIsOpen(false));
  }

  return (
    <Modal
      className={styles["AppModal"]}
      overlayClassName={styles["overlay"]}
      isOpen={modalIsOpen}
      onAfterOpen={afterOpen}
      onRequestClose={closeModal}
      contentLabel="Example Modal"
      >
      <h2>{title}</h2>
      <p className={styles["modal-body"]}>{body}</p>
      <div className={styles["btn-row"]}>
        <button className={`btn ${styles["modal-btn"]}`} onClick={onYes}>Yes</button>
        <button className={`btn ${styles["modal-btn"]}`} onClick={closeModal}>Cancel</button>
      </div>
    </Modal>
  )
}
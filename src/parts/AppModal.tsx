import Modal from "react-modal";
import { setModalIsOpen } from '../features/modal/modalSlice';
import { useAppSelector, useAppDispatch } from '../hooks';
import styles from "./AppModal.module.css";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type modalProps = {
  title?: string, 
  body: any, 
  onYes?: () => any, 
  hasXBtn?: boolean,
  hasCancelBtn?: boolean
}

export default function AppModal({title, body, onYes, hasXBtn, hasCancelBtn} : modalProps) {

  const dispatch = useAppDispatch();
  const modalIsOpen = useAppSelector(state => state.modal.isOpen);

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
      appElement={document.getElementById("App") as HTMLElement}
      >
      {hasXBtn && 
        <span className={styles["close-row"]}>
          <FontAwesomeIcon className={styles["close-btn"]} icon={faX} size="xl" onClick={closeModal} color="black"/>
        </span>}
      {title && <h2>{title}</h2>}
      <div className={styles["modal-body"]}>{body}</div>
      <div className={styles["btn-row"]}>
        {onYes && <button className={`btn ${styles["modal-btn"]}`} onClick={onYes}>Yes</button>}
        {hasCancelBtn && 
          <button className={`btn ${styles["modal-btn"]}`} onClick={closeModal}>Cancel</button>
        }
      </div>
    </Modal>
  )
}
import styles from "./styles.module.css";

type ModalProps = {
  text: string;
  onModalClose: ()=> void;
};

const Modal = ({ text, onModalClose }: ModalProps) => {
  return (
    <div className={styles.main}>
      {text}
      <button onClick={()=>onModalClose()}>X</button>
    </div>
  );
};

export default Modal;

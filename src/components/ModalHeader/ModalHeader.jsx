import SharedButton from '../../commons/sharedButton/SharedButton';
import style from './modalHeader.module.scss'


function ModalHeader({ closeModalHandler, logoutConfirmHandler }) {

  return (
    <div className={style.backdrop}>
      <div className={style.modal}>
        <button onClick={closeModalHandler} className={style.modalCloseButton} />
        <span className={style.modalText}>Are you sure?</span>
        <div className={style.modalButtonWrapper}>
          <SharedButton onClick={logoutConfirmHandler} active={true}>YES</SharedButton>
          <SharedButton type='button' onClick={closeModalHandler}>NO</SharedButton>
        </div>
      </div>
    </div>
  );
}

export default ModalHeader;

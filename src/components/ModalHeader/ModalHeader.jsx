import { ModalContext } from 'context/ ModalContext';
import React, { useContext } from 'react';
import css from './modalHeader.module.scss';

export const ModalHeader = () => {
  const [isOpen, setIsOpen] = useContext(ModalContext);

  const handleClose = () => {
    setIsOpen(false);
  };
  return isOpen ? (
    <div className={css.modalHeaderBackDrop}>
      <div className={css.modalHeader}>
        <button className={css.closeButton} onClick={handleClose}></button>
        <p className={css.modalHeaderQuestion}>Are you sure?</p>
        <button>YES</button>
        <button>NO</button>
      </div>
    </div>
  ) : null;
};

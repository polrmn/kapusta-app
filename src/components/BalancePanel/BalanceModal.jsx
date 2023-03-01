import React from "react";
import { createPortal } from "react-dom";
import style from './BalanceModal.module.scss';

export default function Modal({ onClose }) {
    React.useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.code === `Escape`) {
                onClose();
            };
        };
        window.addEventListener(`keydown`, handleKeyDown);
        return (() => {
            window.removeEventListener(`keydown`, handleKeyDown);
        });
    }, [onClose]);

    const handleBackdropClick = (e) => {
        const { target, currentTarget } = e;
        e.stopPropagation();
        if (target === currentTarget) {
            onClose();
        }
    };

    return createPortal(
        <div className={style.overlay} onClick={handleBackdropClick}>
            <div className={style.modal}>
                pisn
                {/* {children} */}
            </div>
        </div>, document.querySelector(`#modal`)
    );
};
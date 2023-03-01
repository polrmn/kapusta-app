import React from "react";
import './BalanceModal.css';

const Modal = ({ children, active, setActive }) => {

    return (
        <div className={active ? "overlay active" : "overlay"} onClick={() => setActive(false)}>
            <div className={active ? "modal active" : "modal"} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default Modal;

   // React.useEffect(() => {
    //     const handleKeyDown = (e) => {
    //         if (e.code === `Escape`) {
    //             onClose();
    //         };
    //     };
    //     window.addEventListener(`keydown`, handleKeyDown);
    //     return (() => {
    //         window.removeEventListener(`keydown`, handleKeyDown);
    //     });
    // }, [onClose]);

    // const handleBackdropClick = (e) => {
    //     const { target, currentTarget } = e;
    //     e.stopPropagation();
    //     if (target === currentTarget) {
    //         onClose();
    //     }
    // };
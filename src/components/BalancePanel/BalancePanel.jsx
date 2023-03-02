import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addBalance } from 'redux/transaction/transactionOperations';
// import { selectBalance } from 'redux/transaction/transactionSelectors';
// import { Link } from "react-router-dom";
import Modal from './BalanceModal';
import style from './BalancePanel.module.scss';

function BalancePanel() {
  const [balance, setBalance] = React.useState(0);
  const [showModal, setShowModal] = React.useState(false);
  const dispatch = useDispatch();

  // const filterBalance = useSelector(selectBalance);
  
  // const onClickConfirm = (e) => {
  //   e.preventDefault();
  //   const data = { balance, id: nanoid() };
  //   if (filterBalance.find((user) => user.balance === balance)) {
  //     alert(`${balance} is already exist.`);
  //   }
  //   else {
  //       const balance = {
  //           id: nanoid(),
  //           name,
  //           balance,
  //       };
  //   }
  //   dispatch(addBalance(data))
  //   resetInput();
  // };
  const onClickConfirm = (e) => {
    e.preventDefault();
    const data = {
      newBalance: balance,
    };
    dispatch(addBalance(data));
    resetInput();
  };

  const resetInput = () => {
    setBalance(0);
  };
  
  const runModal = () => {
    setShowModal((prev) => !prev);
  };

  const balanceChange = (e) => {
    const { balance, value } = e.target;
    if (balance === "balance") {
      setBalance(value);
    } else {
      alert(`Something happen (-_-)`);
    }
  };

  return (
    <section className={style.balance}>
          <button type="button" className={style.balanceBtnBack}>to transaction</button>
          <div className={style.balanceReports}>
              <a href="#">Reports</a>
          </div>
          <div className={style.balanceInnerBlock}>
              <p className={style.balancePara}>Balance:</p>
              <p className={style.balanceProp}></p>
        <button onClick={() => (onClickConfirm())} className={style.balanceBtn}>Confirm</button>
        <div id="modal"></div>
        {showModal && (
                <Modal onClose={runModal}>
                  <label>
                    <p className={style.balancePara}>Balance:</p>
                    <input
                      className={style.balanceFormInput}
                      type="text"
                      name="balance"
                      value={balance}
                      onChange={balanceChange}
                      // required
                    />
                  </label>
                  <button className={style.balanceBtn} type="submit" onClick={() => (onClickConfirm())}>Confirm</button>
                </Modal>
            )}
      </div>
      {/* <form className={style.balanceForm} onSubmit={onSubmit}>
            <h2 className={style.balanceFormTitle}>Balance:</h2>
            <label>
                <p>Balance:</p>
                <input
                    className={style.balanceFormInput}
                    type="text"
                    name="balance"
                    onChange={balanceChange}
                    value={}
                    required
                />
            </label>
            <button className={style.balanceBtn} type="submit" onClick={() => (onClickConfirm())}>Confirm</button>
        </form> */}
    </section>
  )
};

export default BalancePanel;

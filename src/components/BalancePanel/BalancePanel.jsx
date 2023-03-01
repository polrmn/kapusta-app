import React from 'react';
import { useDispatch } from 'react-redux';
import { addBalance } from 'redux/user/userOperations';
// import { selectBalance } from 'redux/transaction/transactionSelectors';
import Modal from './BalanceModal';
import style from './BalancePanel.module.scss';

function BalancePanel() {
  const [balance, setBalance] = React.useState(0);
  const [showModal, setShowModal] = React.useState(false);
  const dispatch = useDispatch();

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
  
  // const runModal = () => {
  //   setShowModal((prev) => !prev);
  // };

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
      <div className={style.balanceBack}>
        <button type="button" className={style.balanceBtnBack}>to transaction</button>
      </div>
      <div className={style.balanceReports}>
        <button type='button' className={style.balanceBtnReport}>Reports</button>
      </div>
      <div className={style.balanceInnerBlock}>
        <p className={style.balancePara}>Balance:</p>
        <div className={style.balanceAdd}>
          <p className={style.balanceProp}>9000 coins</p>
          <button onClick={() => (setShowModal(true))} className={style.balanceBtnAdd}>Add balance</button>
        </div>
        <Modal active={showModal} setActive={setShowModal}>
          <form action="" className={style.balanceForm}>
            <label>
              <p className={style.balanceModalPara}>Balance:</p>
              <input
                className={style.balanceModalInput}
                type="text"
                name="balance"
                value={balance}
                onChange={balanceChange}
              />
            </label>
            <button className={style.balanceModalBtn} type="submit" onClick={() => (onClickConfirm())}>Confirm</button>
          </form>
        </Modal>
        {/* {showModal && (
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
            )} */}
      </div>
    </section>
  )
};

export default BalancePanel;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAccessToken } from 'redux/auth/authSelectors';
import { addBalance } from 'redux/user/userOperations';
import { setAuthHeader } from 'services/http/http';
// import { updateBalanceAPI } from 'services/transactionService';
// import { selectBalance } from 'redux/transaction/transactionSelectors';
import Modal from './BalanceModal';
// import { privateAPI } from '../../services/http/http'
import style from './BalancePanel.module.scss';

function BalancePanel() {
  const [balance, setBalance] = React.useState(0);
  const [showModal, setShowModal] = React.useState(false);
  const dispatch = useDispatch();

  const token = useSelector(getAccessToken);
  useEffect(() => {
    if (token) {
      setAuthHeader(token);
    }
    // dispatch(updateBalanceAPI());
  }, [dispatch]);

  const onClickConfirm = (e) => {
    e.preventDefault();
    const data = {
      newBalance: balance,
    };
    // console.log(privateAPI.defaults.headers.common)
    dispatch(addBalance(data));
    resetInput();
    setShowModal(false);
  };

  const resetInput = () => {
    setBalance(0);
  };
  
  // const runModal = () => {
  //   setShowModal((prev) => !prev);
  // };

  const balanceChange = (e) => {
    const { value } = e.target;
    // if (balance === "balance") {
      setBalance(value);
    // } else {
    //   alert(`Something happen (-_-)`);
    // }
  };

  return (
    <section className={style.balance}>
      <div className={style.balanceBack}>
        <button type="button" className={style.balanceBtnBack}>to transaction</button>
        {/* <button type="button" className={style.balanceBtnMain}>Main page</button> */}
      </div>
      <div className={style.balanceReports}>
        <button type='button' className={style.balanceBtnReport}>Reports</button>
      </div>
      {/* <div className={style.balanceCal}>
        <p className={style.balanceCalPara}>Current period:</p>
        <div className={style.balanceCalInner}>
          <button type='button' className={style.balanceCalDec}></button>
          <p className={style.balanceCalProp}>November 2019</p>
          <button type='button' className={style.balanceCalInc}></button>
        </div>
      </div> */}
      <div className={style.balanceInnerBlock}>
        <p className={style.balancePara}>Balance:</p>
        <div className={style.balanceAdd}>
          <p className={style.balanceProp}>{balance} coins</p>
          <button onClick={() => (setShowModal(true))} className={style.balanceBtnAdd}>Add balance</button>
        </div>
        <Modal active={showModal} setActive={setShowModal}>
          <form action="" onSubmit={onClickConfirm} className={style.balanceForm}>
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
            <button className={style.balanceModalBtn} type="submit">Confirm</button>
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

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addBalance } from 'redux/user/userOperations';
import { getBalance } from 'redux/user/userSelectors';
import { privateAPI } from 'services/http/http';
// import { updateBalanceAPI } from 'services/transactionService';
// import { selectBalance } from 'redux/transaction/transactionSelectors';
import Modal from './BalanceModal';
// import { privateAPI } from '../../services/http/http'
import style from './BalancePanel.module.scss';

function BalancePanel() {
  const [balance, setBalance] = React.useState(0);
  const [showModal, setShowModal] = React.useState(false);
  const dispatch = useDispatch();
  const balAnce = useSelector(getBalance)


  const onClickConfirm = (e) => {
    e.preventDefault();
    const data = {
      newBalance: balance,
    };
    console.log(privateAPI.defaults.headers.common)
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
        <button type="button" className={style.balanceBtnBack}>
          <a className={style.balanceLinkBack} href="/kapusta">
            to transaction
          </a>
        </button>
      </div>
      {/* <div className={style.balanceMain}>
        <button type="button" className={style.balanceBtnMain}>
          <a className={style.balanceLinkMain} href="/kapusta">Main page</a>
        </button>
      </div> */}
      <div className={style.balanceReports}>
        <button type="button" className={style.balanceBtnReport}>
          {/* <a className={style.balanceLinkReport} href="/kapusta">
            Reports
          </a> */}
          <Link className={style.balanceLinkReport} to="/reports">
            Report
          </Link>
        </button>
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
          <p className={style.balanceProp}>{balAnce} coins</p>
          <button
            onClick={() => setShowModal(true)}
            className={style.balanceBtnAdd}
          >
            Add balance
          </button>
        </div>
        <Modal active={showModal} setActive={setShowModal}>
          <form
            action=""
            onSubmit={onClickConfirm}
            className={style.balanceForm}
          >
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
            <button className={style.balanceModalBtn} type="submit">
              Confirm
            </button>
          </form>
        </Modal>
      </div>
    </section>
  );
};

export default BalancePanel;

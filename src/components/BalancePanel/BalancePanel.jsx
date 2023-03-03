import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { addBalance } from 'redux/user/userOperations';
import { getBalance } from 'redux/user/userSelectors';
// import { privateAPI } from 'services/http/http';
// import { updateBalanceAPI } from 'services/transactionService';
// import { selectBalance } from 'redux/transaction/transactionSelectors';
import Modal from './BalanceModal';
// import { privateAPI } from '../../services/http/http'
import style from './BalancePanel.module.scss';

function BalancePanel() {
  const [balance, setBalance] = React.useState(0);
  const [showModal, setShowModal] = React.useState(false);
  const dispatch = useDispatch();
  const balAnce = useSelector(getBalance);
  const location = useLocation();

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

  const balanceChange = (e) => {
    const { value } = e.target;
    // if (balance === "balance") {
      setBalance(value);
    // } else {
    //   alert(`Something happen (-_-)`);
    // }
  };

  return (
    <>
      {location.pathname === "/reports" && (
        <section className={style.balance}>
          <div className={style.balanceMain}>
            <Link className={style.balanceLinkMain} to="/">Main page</Link>
          </div>
          <div className={style.balanceOuterBlock}>
            <div className={style.balanceCal}>
              <p className={style.balanceCalPara}>Current period:</p>
              <div className={style.balanceCalInner}>
                <button type='button' className={style.balanceCalDec}></button>
                <p className={style.balanceCalProp}>March 2023</p>
                <button type='button' className={style.balanceCalInc}></button>
              </div>
            </div>
            <div className={style.balanceInnerBlock}>
              <p className={style.balancePara}>Balance:</p>
              <div className={style.balanceAdd}>
                <p className={style.balanceProp}>{balAnce} UAH</p>
                <button
                  onClick={() => setShowModal(true)}
                  className={style.balanceBtnAdd}
                >
                  Add balance
                </button>
              </div>
            </div>
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
        </section>
      )}
      {location.pathname === "/expenses" && (
        <section className={style.balanceExpenses}>
          <div className={style.balanceBack}>
            <Link className={style.balanceLinkBack} to="/">to transaction</Link>
          </div>
          <div className={style.balanceExpensesOuterBlock}>
            <div className={style.balanceExpensesReports}>
              <Link className={style.balanceExpensesLinkReport} to="/reports">Reports</Link>
            </div>
            <div className={style.balanceExpensesInnerBlock}>
              <p className={style.balanceExpensesPara}>Balance:</p>
              <div className={style.balanceExpensesAdd}>
                <p className={style.balanceExpensesProp}>{balAnce} UAH</p>
                <button
                  onClick={() => setShowModal(true)}
                  className={style.balanceExpensesBtnAdd}
                >
                  Add balance
                </button>
              </div>
            </div>
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
        </section>
      )}
      {/* <section className={style.balance}>
        <div className={style.balanceBack}>
          <button type="button" className={style.balanceBtnBack}>
            <Link className={style.balanceLinkBack} to="/">to transaction</Link>
          </button>
        </div>
        <div className={style.balanceMain}>
          <button type="button" className={style.balanceBtnMain}>
            <Link className={style.balanceLinkMain} to="/">Main page</Link>
          </button>
        </div>
        <div className={style.balanceReports}>
          <button type="button" className={style.balanceBtnReport}>
            <Link className={style.balanceLinkReport} to="/reports">
              Reports
            </Link>
          </button>
        </div>
        <div className={style.balanceCal}>
          <p className={style.balanceCalPara}>Current period:</p>
          <div className={style.balanceCalInner}>
            <button type='button' className={style.balanceCalDec}></button>
            <p className={style.balanceCalProp}>November 2019</p>
            <button type='button' className={style.balanceCalInc}></button>
          </div>
        </div>
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
      </section> */}
    </>
  );
};

export default BalancePanel;

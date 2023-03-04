import React, { useEffect } from 'react';
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
import { CurrentPeriod } from '../CurrentPeriod/CurrentPeriod';
import { getUserThunk } from 'redux/auth/authOperations';
import { getUserBalance } from 'redux/auth/authSelectors';

function BalancePanel() {
  const [balance, setBalance] = React.useState("");
  const [showModal, setShowModal] = React.useState(false);
  const dispatch = useDispatch();
  const balAnce = useSelector(getUserBalance);
  const location = useLocation();
  const newBalance = useSelector(getBalance);

  useEffect(() => {
    dispatch(getUserThunk());
  }, [dispatch, newBalance]);

  const onClickConfirm = e => {
    e.preventDefault();
    const data = {
      newBalance: balance,
    };
    // console.log(privateAPI.defaults.headers.common)
    const updateBalance = async () => {
      await dispatch(addBalance(data));
      await dispatch(getUserThunk());
    }
    updateBalance();    
    resetInput();
    setShowModal(false);
  };

  const resetInput = () => {
    setBalance("");
  };

  const balanceChange = e => {
    const { value } = e.target;
    // if (balance === "balance") {
    setBalance(value);
    // } else {
    //   alert(`Something happen (-_-)`);
    // }
  };

  return (
    <>
      {location.pathname === '/reports' && (
        <section className={style.balance}>
          <div className={style.balanceMain}>
            <Link className={style.balanceLinkMain} to="/">
              Main page
            </Link>
          </div>
          <div className={style.balanceOuterBlock}>
            <div className={style.balanceCal}>
              <CurrentPeriod />
              {/* <p className={style.balanceCalPara}>Current period:</p>
              <div className={style.balanceCalInner}>
                <button type='button' className={style.balanceCalDec}></button>
                <p className={style.balanceCalProp}>March 2023</p>
                <button type='button' className={style.balanceCalInc}></button>
              </div> */}
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
      {(location.pathname === '/income' ||
        location.pathname === '/') && (
          <section className={style.balanceExpenses}>
            {/* <div className={style.balanceIncomeBack}>
            <Link className={style.balanceIncomeLinkBack} to="/">
              to transaction
            </Link>
          </div> */}
            <div className={style.balanceExpensesOuterBlock}>
              <div className={style.balanceIncomeReports}>
                <Link className={style.balanceIncomeLinkReport} to="/reports">
                  Reports
                </Link>
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
      {location.pathname === '/expenses' && (
        <section className={style.balanceExpenses}>
          {/* <div className={style.balanceBack}>
            <Link className={style.balanceLinkBack} to="/">
              to transaction
            </Link>
          </div> */}
          <div className={style.balanceExpensesOuterBlock}>
            <div className={style.balanceExpensesReports}>
              <Link className={style.balanceExpensesLinkReport} to="/reports">
                Reports
              </Link>
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
    </>
  );
}

export default BalancePanel;

import { Calendar } from 'components/Calendar/Calendar';
import React, { useEffect, useState } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { useDispatch, useSelector } from 'react-redux';
import { getAccessToken, getUserBalance } from '../../redux/auth/authSelectors';
import {
  selectCategory,
  selectTransactions,
} from 'redux/transaction/transactionSelectors';
import {
  getExpenseCategoriesThunk,
  addExpenseTransactionThunk,
  delateTransactionThunk,
  getExpenseTransactionsByThunk,
} from '../../redux/transaction/transactionOperations';
import { setAuthHeader } from '../../services/http/http';
import useMediaQuery from '@mui/material/useMediaQuery';

import scss from './Expenses.module.scss';
import SharedButton from './../../commons/sharedButton/SharedButton';
import Summury from '../Summary/Summary';
import { selectTransactionsExpenses } from '../../redux/transaction/transactionSelectors';
import { getBalance } from '../../redux/user/userSelectors';
import { addBalance } from 'redux/user/userOperations';
import { NavLink } from 'react-router-dom';
export const Expenses = () => {
  const isScreenTablet = useMediaQuery(
    '(min-width: 768px) and (max-width: 1279.9px)'
  );
  const isScreenDesktop = useMediaQuery('(min-width: 1280px)');
  const isScreenMobile = useMediaQuery('(max-width: 767.9px)');

  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');

  const dispatch = useDispatch();
  const token = useSelector(getAccessToken);
  const categoriesArray = useSelector(selectCategory);
  const transactionsArrayExpenses = useSelector(selectTransactionsExpenses);
  const balanceCurrent = useSelector(getUserBalance);
  const [isOpenModal, setIsOpenModal] = useState(false);
  // useEffect(() => {
  //   // if (token) {
  //   //   setAuthHeader(token);
  //   // }

  //   // dispatch(getExpenseCategoriesThunk());
  //   dispatch(getExpenseTransactionsByThunk());
  // }, [dispatch]);

  const handleSubmit = e => {
    e.preventDefault();
    if (!amount) return alert('ffff');
    // if (balanceCurrent < amount) {
    if (balanceCurrent - amount <= 1) {
      alert('недостатньо коштів');
      return;
    }
    dispatch(
      addExpenseTransactionThunk({
        description,
        amount: Number(amount),
        category,
        date,
      })
    );
    const newBalance = balanceCurrent - amount;
    dispatch(addBalance({ newBalance }));
  };

  const handleClear = () => {
    setDescription('');
    setAmount('');
    setCategory('');
    setDate('');
  };
  const delateContact = (id, amount) => {
    dispatch(delateTransactionThunk(id));
    const newBalance = balanceCurrent + amount;
    dispatch(addBalance({ newBalance }));
  };

  /*date with calendar */
  const handleDate = date => {
    setDate(date);
  };

  const actions = {
    description: setDescription,
    amount: value => {
      console.log(value.charAt(0));
      if (value.charAt(0) === '0' || value.charAt(0) === '-') {
        Notify.failure('Amount must be greater than 0');
        return;
      }
      setAmount(value);
    },
    category: setCategory,
    date: setDate,
  };

  const handleChange = e => {
    const { name, value } = e.target;
    actions[name](value);
  };
  const handleOpenModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  return (
    <section>
      {isScreenMobile ? (
        <div className={scss.wrapper}>
          <div className={scss.calendar}>
            <Calendar onClick={handleDate} />
          </div>
          <ul className={scss.transactionList}>
            {transactionsArrayExpenses &&
              transactionsArrayExpenses.map(
                ({ _id, date, description, category, amount }) => (
                  <li key={_id} className={scss.transactionItem}>
                    <div className={scss.descriptionWrapper}>
                      <p className={scss.description}>{description}</p>
                      <div className={scss.infoWrapper}>
                        <p className={scss.date}>{date}</p>
                        <p className={scss.category}>{category}</p>
                      </div>
                    </div>
                    <div className={scss.amountWrapper}>
                      <p className={`${scss.amount} ${scss.amountExpenses}`}>
                        -{amount}.00 UAH.
                      </p>
                    </div>
                    <button
                      className={scss.btnDelate}
                      type="button"
                      onClick={() => {
                        delateContact(_id);
                      }}
                    >
                      <div className={scss.iconDelate}></div>
                    </button>
                  </li>
                )
              )}
          </ul>
          <nav className={scss.mobileNav}>
            <NavLink className={scss.mobileNavLink} to="/espense">
              Expense
            </NavLink>
            <NavLink className={scss.mobileNavLink} to="/income">
              Income
            </NavLink>
          </nav>
          <div className={scss.bntOpenModal} onClick={handleOpenModal}>
            <div className={scss.btnArrowLeft} />
            <p className={scss.btnText}>To transaction</p>
          </div>
          {isOpenModal && (
            <div className={scss.modal}>
              <form onSubmit={handleSubmit} className={scss.sectionForm}>
                <div className={scss.sectionInputs}>
                  <input
                    name="description"
                    value={description}
                    placeholder="Product description"
                    type="text"
                    className={scss.inputDescription}
                    onChange={handleChange}
                  />
                  <select
                    name="category"
                    value={category}
                    onChange={handleChange}
                    className={scss.inputSelect}
                  >
                    <option value="category">Product category</option>
                    {categoriesArray.map(item => (
                      <option
                        className={scss.selectOption}
                        key={item}
                        value={item}
                      >
                        {item}
                      </option>
                    ))}
                  </select>
                  <div className={scss.inputWrapper}>
                    <input
                      name="amount"
                      value={amount}
                      placeholder="0.00"
                      type="number"
                      className={scss.inputCount}
                      onChange={handleChange}
                    />
                    <div className={scss.calc} />
                  </div>
                </div>
                <div className={scss.buttonsWrapper}>
                  <SharedButton active={true} type="submit">
                    Input
                  </SharedButton>
                  <SharedButton type="button" onClick={handleClear}>
                    Clear
                  </SharedButton>
                </div>
              </form>
              <div className={scss.btnCloseModal} onClick={handleOpenModal} />
            </div>
          )}
        </div>
      ) : (
        <>
          <div className={scss.section}>
            <form onSubmit={handleSubmit} className={scss.sectionForm}>
              <div className={scss.sectionInputs}>
                <div className={scss.calendar}>
                  <Calendar onClick={handleDate} />
                </div>
                <input
                  name="description"
                  value={description}
                  placeholder="Product description"
                  type="text"
                  className={scss.inputDescription}
                  onChange={handleChange}
                />
                <select
                  name="category"
                  value={category}
                  onChange={handleChange}
                  className={scss.inputSelect}
                >
                  <option value="category">Product category</option>
                  {categoriesArray.map(item => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
                <div className={scss.inputWrapper}>
                  <input
                    name="amount"
                    value={amount}
                    placeholder="0.00"
                    type="number"
                    className={scss.inputCount}
                    onChange={handleChange}
                  />
                  <div className={scss.calc} />
                </div>
              </div>
              <div className={scss.buttonsWrapper}>
                <SharedButton active={true} type="submit">
                  Input
                </SharedButton>
                <SharedButton type="button" onClick={handleClear}>
                  Clear
                </SharedButton>
              </div>
            </form>

            <div className={scss.containerAll}>
              <div className={scss.tableContainer}>
                <table className={scss.table}>
                  <thead className={scss.tableHead}>
                    <tr>
                      <th className={`${scss.tableHeadTitle} ${scss.date} `}>
                        Date
                      </th>
                      <th
                        className={`${scss.tableHeadTitle} ${scss.description} `}
                      >
                        Description
                      </th>
                      <th
                        className={`${scss.tableHeadTitle} ${scss.category} `}
                      >
                        Category
                      </th>
                      <th className={`${scss.tableHeadTitle} ${scss.amount} `}>
                        Sum
                      </th>
                      <th
                        className={`${scss.tableHeadTitle} ${scss.btnWrapper} `}
                      ></th>
                    </tr>
                  </thead>

                  <tbody className={scss.tableBody}>
                    {transactionsArrayExpenses &&
                      transactionsArrayExpenses.map(
                        ({ _id, date, description, category, amount }) => (
                          <tr key={_id} className={scss.tableRow}>
                            <td className={scss.date}>{date}</td>
                            <td className={scss.description}>{description}</td>
                            <td className={scss.category}>{category}</td>
                            <td
                              className={`${scss.amount} ${scss.amountExpenses}`}
                            >
                              - {amount}.00 UAH.
                            </td>
                            <td className={scss.btnWrapper}>
                              <button
                                className={scss.btnDelate}
                                type="button"
                                onClick={() => {
                                  delateContact(_id);
                                }}
                              >
                                <div className={scss.iconDelate}></div>
                              </button>
                            </td>
                          </tr>
                        )
                      )}
                  </tbody>
                </table>

                {isScreenDesktop && <Summury />}
              </div>
            </div>
          </div>
          {isScreenTablet && <Summury />}
        </>
      )}
    </section>
  );
};

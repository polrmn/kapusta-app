import { Calendar } from 'components/Calendar/Calendar';
import React, { useEffect, useState } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { useDispatch, useSelector } from 'react-redux';
import { getAccessToken } from '../../redux/auth/authSelectors';
import {
  selectCategory,
  selectTransactions,
} from 'redux/transaction/transactionSelectors';
import {
  getExpenseCategoriesThunk,
  addExpenseTransactionThunk,
  delateTransactionThunk,
} from '../../redux/transaction/transactionOperations';
import { setAuthHeader } from '../../services/http/http';
import useMediaQuery from '@mui/material/useMediaQuery';
import scss from './Expenses.module.scss';
import { ReactComponent as ReactCalc } from '../../images/iconsForm/calc.svg';
import SharedButton from './../../commons/sharedButton/SharedButton';
import { Summury } from 'components/Summary/Summary';
export const Expenses = () => {
  const isScreenMoreTablet = useMediaQuery('(min-width: 768px)');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');

  const dispatch = useDispatch();
  const token = useSelector(getAccessToken);
  const categoriesArray = useSelector(selectCategory);
  const transactionsArray = useSelector(selectTransactions);

  useEffect(() => {
    if (token) {
      setAuthHeader(token);
    }
    dispatch(getExpenseCategoriesThunk());
  }, [dispatch]);

  const handleSubmit = e => {
    e.preventDefault();
    if (!amount) return alert('ffff');
    dispatch(
      addExpenseTransactionThunk({
        description,
        amount: Number(amount),
        category,
        date,
      })
    );
  };

  const handleClear = () => {
    setDescription('');
    setAmount('');
    setCategory('');
    setDate('');
  };
  const delateContact = id => dispatch(delateTransactionThunk(id));

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

  return (
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
            {/* <ReactCalc width="20" height="20" display="block" /> */}
            {/* <div className={scss.inputWrapper}>
              <input
                name="amount"
                value={amount}
                placeholder="0.00"
                type="number"
                className={scss.inputCount}
                onChange={handleChange}
              />
              
              <div className={scss.calc}></div>
            </div> */}
            <div className={scss.testWrapper}>
              <input type="number" placeholder="0.00" />
              <div />
            </div>
          </div>
          <div className={scss.buttonsWrapper}>
            <SharedButton active={true} type="submit">
              Input
            </SharedButton>
            <SharedButton type="button" onClick={handleClear}>
              Clear
            </SharedButton>
            {/* <button className={scss.buttonOrange} type="submit">
              Input
            </button>
            <button
              className={scss.buttonWhite}
              type="button"
              onClick={handleClear}
            >
              Clear
            </button> */}
          </div>
        </form>

        <div>
          <div className={scss.bodyTable}>
            <table className={scss.main}>
              <thead className={scss.theadTable}>
                <tr>
                  <th className={`${scss.th} ${scss.thData}`}>Date</th>
                  <th className={`${scss.th} ${scss.thDesc}`}>Description</th>
                  <th className={`${scss.th} ${scss.thCateg}`}>Category</th>
                  <th className={`${scss.th} ${scss.thSum}`}>Sum</th>
                  <th className={`${scss.th} ${scss.thIcon}`}></th>
                </tr>
              </thead>
            </table>
            <div className={scss.bodyTableScroll}>
              <table className={`${scss.main} ${scss.mainTbody}`}>
                <tbody className={scss.tbodyTable}>
                  {transactionsArray &&
                    transactionsArray.map(
                      ({
                        transaction: {
                          _id,
                          date,
                          description,
                          category,
                          amount,
                        },
                      }) => (
                        <tr key={_id} className={scss.td}>
                          <td className={scss.thData}>{date}</td>
                          <td className={scss.tdDesc}>{description}</td>
                          <td className={scss.thCateg}>{category}</td>
                          <td className={scss.tdSum}>{amount}</td>
                          <td className={scss.thIcon}>
                            <button
                              className={scss.deleteBtn}
                              type="button"
                              onClick={() => {
                                delateContact(_id);
                              }}
                            >
                              delate
                            </button>
                          </td>
                        </tr>
                      )
                    )}
                </tbody>
              </table>
            </div>
          </div>
          <div className={scss.summery}>
            <Summury />
          </div>
        </div>
      </div>
    </>
  );
};

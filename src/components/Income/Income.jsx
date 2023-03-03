import { Calendar } from 'components/Calendar/Calendar';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { getAccessToken } from '../../redux/auth/authSelectors';
import {
  selectCategory,
  selectTransactions,
} from 'redux/transaction/transactionSelectors';
import {
  getIncomeCategoriesThunk,
  addIncomeTransactionThunk,
  delateTransactionThunk,
} from '../../redux/transaction/transactionOperations';
import { setAuthHeader } from '../../services/http/http';
import scss from './Income.module.scss';

export const Income = () => {
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
    dispatch(getIncomeCategoriesThunk());
  }, [dispatch]);

  const handleSubmit = e => {
    e.preventDefault();
    if (!amount) return alert('ffff');
    dispatch(
      addIncomeTransactionThunk({
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
        <div>
          <div className={scss.calendar}>
            <Calendar onClick={handleDate} />
          </div>

          <form onSubmit={handleSubmit} className={scss.form}>
            <input
              name="description"
              value={description}
              placeholder="Product description"
              type="text"
              className={scss.formContainer__description}
              onChange={handleChange}
            />
            <select
              name="category"
              value={category}
              onChange={handleChange}
              className={scss.formContainer__select}
            >
              <option value="category">Product category</option>
              {categoriesArray.map(item => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <input
              name="amount"
              value={amount}
              placeholder="0.00"
              type="number"
              className={scss.formContainer__calculator}
              onChange={handleChange}
            />
            <div className={scss.buttons}>
              <button type="submit">Input</button>
              <button type="button" onClick={handleClear}>
                Clear
              </button>
            </div>
          </form>
        </div>
        <div>
          <div className={scss.table}>
            <table className={scss.transaction}>
              <thead>
                <tr className={scss.titleList}>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Category</th>
                  <th>Sum</th>
                  <th></th>
                </tr>
              </thead>

              <tbody className={scss.container}>
                {transactionsArray &&
                  transactionsArray.map(
                    ({
                      transaction: { _id, date, description, category, amount },
                    }) => (
                      <tr key={_id} className={scss.listRow}>
                        <td className={scss.listColumn}>{date}</td>
                        <td className={scss.listColumn}>{description}</td>
                        <td className={scss.listColumn}>{category}</td>
                        <td className={scss.listColumn}>{amount}</td>
                        <td className={scss.listColumn}>
                          <button
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
          <div className={scss.summery}></div>
        </div>
      </div>
    </>
  );
};

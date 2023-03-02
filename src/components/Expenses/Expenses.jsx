import { Calendar } from 'components/Calendar/Calendar';
import React, { useEffect, useReducer } from 'react';
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
import scss from './Expenses.module.scss';

const initialState = {
  description: '',
  amount: '',
  category: '',
  date: '',
};
function formReducer(state, action) {
  switch (action.type) {
    case 'description':
      return { ...state, description: action.payload };
    case 'amount':
      return { ...state, amount: action.payload };
    case 'category':
      return { ...state, category: action.payload };
    case 'date':
      return { ...state, date: action.payload };
    case 'reset':
      return initialState;
    default:
      return state;
  }
}

export const Expenses = () => {
  const dispatch = useDispatch();
  const token = useSelector(getAccessToken);
  const categoriesArray = useSelector(selectCategory);
  const transactionsArray = useSelector(selectTransactions);
  //console.log(categoriesArray);
  //console.log(transactionsArray);

  useEffect(() => {
    if (token) {
      setAuthHeader(token);
    }
    dispatch(getExpenseCategoriesThunk());
  }, [dispatch]);

  //const balance = useSelector(selectBalance);
  //amountarray useselector

  const [state, dispatchData] = useReducer(formReducer, initialState);

  const handleSubmit = e => {
    e.preventDefault();
    const balanse = 1000;
    if (balanse > state.amount) {
      dispatch(addExpenseTransactionThunk(state));
      //console.log(state);
    } else {
      console.log('недостатньо коштів');
    }
  };
  const handleClear = () => {
    dispatchData({ type: 'reset' });
  };
  const delateContact = id => dispatch(delateTransactionThunk(id));

  /*date with calendar */
  const handleDate = date => {
    dispatchData({ type: 'date', payload: date });
  };

  const handleChangeSelect = event => {
    const { value } = event.target;
    dispatchData({ type: 'category', payload: value });
  };
  const handleChange = e => {
    const { name, value } = e.target;
    dispatchData({ type: name, payload: value });
  };

  const { description, amount, category } = state;
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
              onChange={handleChangeSelect}
              className={scss.formContainer__select}
            >
              <option value="category">Product category</option>
              {categoriesArray.map(item => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
              {/* <option value="category">...list.map...</option> */}
              {/* <button type="button" onClick={()=>{delateContact()}}>delate</button> */}
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
                {transactionsArray.map(
                  ({
                    transaction: { _id, date, description, category, amount },
                  }) => (
                    <tr key={_id} className={scss.listRow}>
                      <td className={scss.listColumn}>{date}</td>
                      <td className={scss.listColumn}>{description}</td>
                      <td className={scss.listColumn}>{category}</td>
                      <td className={scss.listColumn}>{amount}</td>
                      <td className={scss.listColumn}>IconDel</td>
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

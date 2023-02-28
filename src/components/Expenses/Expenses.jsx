import { Calendar } from 'components/Calendar/Calendar';
import React, { useReducer } from 'react';
import { useDispatch } from 'react-redux';
import scss from './Expenses.module.scss';

export const Expenses = () => {
  const initialState = {
    description: '',
    amount: '',
    category: '',
    date: '',
  };

  function formReducer(state, action) {
    switch (action.type) {
      case 'email':
        return { ...state, description: action.payload };
      case 'password':
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

  const dispatch = useDispatch();
  const [state, dispatchData] = useReducer(formReducer, initialState);

  /*date with calendar */
  const handleDate = date => {
    dispatchData({ type: 'date', payload: date });
  };
  const handleSubmit = e => {
    e.preventDefault();
    //dispatch(transactionThunk(state));
  };
  const handleClear = () => {
    dispatchData({ type: 'reset' });
  };
  const handleChange = event => {
    const { value } = event.target;
    //dispatch(selectThunk(value));
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
            />
            <select
              name="category"
              value={category}
              onChange={handleChange}
              className={scss.formContainer__select}
            >
              <option value="category" selected>
                Product category
              </option>
              <option value="category">...list.map...</option>
            </select>

            <input
              name="amount"
              value={amount}
              placeholder="0.00"
              type="number"
              className={scss.formContainer__calculator}
            />
          </form>
          <div className={scss.buttons}>
            <button type="submit">Input</button>
            <button type="submit" onClick={handleClear}>
              Clear
            </button>
          </div>
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
                <td className={scss.listColumn}>IconDel</td>
                {/* {items.map(({ _id, date, description, category, amount }) => (
                  <tr key={_id} className={scss.listRow}>
                    <td className={scss.listColumn}>{date}</td>
                    <td className={scss.listColumn}>{description}</td>
                    <td className={scss.listColumn}>{category}</td>
                    <td className={scss.listColumn}>{amount}</td>
                    <td className={scss.listColumn}>IconDel</td>
                  </tr>
                ))} */}
              </tbody>
            </table>
          </div>
          <div className={scss.summery}></div>
        </div>
      </div>
    </>
  );
};

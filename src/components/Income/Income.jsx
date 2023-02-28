import React, { useState } from 'react';
import s from './Product.module.scss';

export const Expenses = () => {
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  const handleInput = () => {};
  const handleClear = () => {};
  return (
    <form>
      <div className={s.formContainer}>
        <input
          name="description"
          value="description"
          placeholder="Product description"
          type="text"
          className={s.formContainer__description}
        />
        <select name="select" className={s.formContainer__select}>
          <option value="category" selected>
            Product category
          </option>
          <option value="category">Product category</option>
        </select>

        <input
          name="price"
          value="price"
          placeholder="0.00"
          className={s.formContainer__calculator}
        />
      </div>
      <div>
        <button onClick={handleInput}>Input</button>
        <button onClick={() => handleClear()}>Clear</button>
      </div>
    </form>
  );
};

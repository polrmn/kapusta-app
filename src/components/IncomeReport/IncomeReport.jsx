import { useEffect } from 'react';
import css from './incomeReport.module.scss';
import { useDispatch, useSelector } from 'react-redux';
// import { getAccessToken } from 'redux/auth/authSelectors';
import { setDate } from 'redux/dateSlice';
import { selectDate, selectIsLoading } from 'redux/selectors';
import {
  getIncomeCategoriesThunk,
  getTransactionsThunk,
} from 'redux/transaction/transactionOperations';
import {
  selectIncomeCategories,
  selectIncomes,
} from 'redux/transaction/transactionSelectors';
import { ReactComponent as ReportSalary } from '../../images/svg-reports/salary.svg';
import { ReactComponent as ReportIncome } from '../../images/svg-reports/income.svg';

import { setCategoryFilter } from 'redux/categoryFilter/categoryFilterSlice';
import { setReportType } from 'redux/reportType/reportTypeSlice';

const refs = {
  selectedCategory: null,
};

export const IncomeReport = () => {
  const reportDate = useSelector(selectDate);
  const incomes = useSelector(selectIncomes);
  const categories = useSelector(selectIncomeCategories);
  const dispatch = useDispatch();
  // const persistedToken = useSelector(getAccessToken);
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    // setAuthHeader(persistedToken);

    if (reportDate) {
      dispatch(getTransactionsThunk(reportDate));
      dispatch(getIncomeCategoriesThunk());
    } else {
      dispatch(setDate('2023-03'));
    }
  }, [reportDate, dispatch]);

  const filteredCategories = categories.filter(
    category => incomes.incomesData[category]
  );

  const getSvg = category => {
    switch (category) {
      case '3/П':
        return <ReportSalary />;

      default:
        return <ReportIncome />;
    }
  };

  const handleCategoryClick = event => {
    if (refs.selectedCategory) {
      refs.selectedCategory.classList.remove(css.activeCategory);

      if (refs.selectedCategory === event.currentTarget) {
        dispatch(setCategoryFilter(''));
        refs.selectedCategory = null;
        return;
      }
    }

    dispatch(setCategoryFilter(event.currentTarget.dataset['category']));

    event.currentTarget.classList.add(css.activeCategory);
    refs.selectedCategory = event.currentTarget;
  };

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <>
      <div className={css.box}>
        <div className={css.category__navigate}>
          <button
            className={css.btn}
            type="button"
            onClick={() => {
              dispatch(setReportType('expense'));
            }}
          >
            {'<'}
          </button>
          <h3 className={css.title}>Incomes</h3>
          <button
            className={css.btn}
            type="button"
            onClick={() => {
              dispatch(setReportType('expense'));
            }}
          >
            {'>'}
          </button>
        </div>
        {incomes.incomeTotal > 0 && (
          <ul className={css.container}>
            {filteredCategories.map(category => (
              <li
                className={css.category}
                key={category}
                data-category={category}
                onClick={handleCategoryClick}
              >
                <p className={css.text}>
                  {incomes.incomesData[category].total}
                </p>
                {getSvg(category)}
                <p className={css.text}>{category}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

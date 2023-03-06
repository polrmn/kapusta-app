import css from './incomeReport.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoading } from 'redux/selectors';
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
  const isLoading = useSelector(selectIsLoading);
  const incomes = useSelector(selectIncomes);
  const categories = useSelector(selectIncomeCategories);

  const dispatch = useDispatch();
  
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

  console.log('Income:', incomes);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <>
      <div className={css.box}>
        <div className={css.category__navigate}>
          <button
            className={css.bntLeft}
            type="button"
            onClick={() => {
              dispatch(setReportType('expense'));
            }}
          >
          </button>
          <h3 className={css.title}>Incomes</h3>
          <button
            className={css.btnRight}
            type="button"
            onClick={() => {
              dispatch(setReportType('expense'));
            }}
          >
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
                  {incomes.incomesData[category].total.toFixed(2)}
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

import { useEffect } from 'react';
import css from './expensesReport.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setDate } from 'redux/dateSlice';
import { selectDate, selectIsLoading } from 'redux/selectors';
import {
  getExpenseCategoriesThunk,
  getTransactionsThunk,
} from 'redux/transaction/transactionOperations';
import {
  selectCategory,
  selectExpenses,
} from 'redux/transaction/transactionSelectors';
import { ReactComponent as ReportAlcohol } from '../../images/svg-reports/alcohol.svg';
import { ReactComponent as ReportProducts } from '../../images/svg-reports/products.svg';
import { ReactComponent as ReportCommunal } from '../../images/svg-reports/communal.svg';
import { ReactComponent as ReportEducation } from '../../images/svg-reports/education.svg';
import { ReactComponent as ReportEntertainment } from '../../images/svg-reports/entertainment.svg';
import { ReactComponent as ReportHealth } from '../../images/svg-reports/health.svg';
import { ReactComponent as ReportHousing } from '../../images/svg-reports/housing.svg';
import { ReactComponent as ReportSports } from '../../images/svg-reports/sports.svg';
import { ReactComponent as ReportTechnique } from '../../images/svg-reports/technique.svg';
import { ReactComponent as ReportTransport } from '../../images/svg-reports/transport.svg';
import { ReactComponent as ReportOther } from '../../images/svg-reports/other.svg';
import { setCategoryFilter } from 'redux/categoryFilter/categoryFilterSlice';
import { setReportType } from 'redux/reportType/reportTypeSlice';

const refs = {
  selectedCategory: null,
};

export const ExpensesReport = () => {
  const reportDate = useSelector(selectDate);
  const expenses = useSelector(selectExpenses);
  const categories = useSelector(selectCategory);
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    if (reportDate) {
      dispatch(getTransactionsThunk(reportDate));
      dispatch(getExpenseCategoriesThunk());
    } else {
      dispatch(setDate('2023-03'));
    }
  }, [reportDate, dispatch]);

  const filteredCategories = () => {
    return categories?.filter(category => expenses?.expensesData[category]);
  };

  const getSvg = category => {
    switch (category) {
      case 'Продукты':
        return <ReportProducts />;

      case 'Алкоголь':
        return <ReportAlcohol />;

      case 'Коммуналка и связь':
        return <ReportCommunal />;

      case 'Образование':
        return <ReportEducation />;

      case 'Здоровье':
        return <ReportHealth />;

      case 'Всё для дома':
        return <ReportHousing />;

      case 'Спорт и хобби':
        return <ReportSports />;

      case 'Развлечения':
        return <ReportEntertainment />;

      case 'Техника':
        return <ReportTechnique />;

      case 'Транспорт':
        return <ReportTransport />;

      case 'Прочее':
      default:
        return <ReportOther />;
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
              dispatch(setReportType('income'));
            }}
          >
            {'<'}
          </button>
          <h3 className={css.title}>Expenses</h3>
          <button
            className={css.btn}
            type="button"
            onClick={() => {
              dispatch(setReportType('income'));
            }}
          >
            {'>'}
          </button>
        </div>
        {expenses.expenseTotal > 0 && (
          <ul className={css.container}>
            {filteredCategories().map(category => (
              <li
                className={css.category}
                key={category}
                data-category={category}
                onClick={handleCategoryClick}
              >
                <p className={css.text}>
                  {expenses.expensesData[category].total.toFixed(2)}
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

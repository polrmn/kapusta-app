import styles from './Button.module.scss' 
import classNames from 'classnames';

const Button = ({active, content}) => {


    return (
      <button
        className={classNames(
          styles.button,
          active && styles.buttonActive 
        )}
      >
        {content}
      </button>
    );
}
 
export default Button;
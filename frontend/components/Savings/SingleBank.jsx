import { FaBuilding } from 'react-icons/fa'; // This is a commonly used icon for banks
import classes from './SingleBank.module.css';

export default function SingleBank({ savings }) {
  return (
    <div className={classes.container}>
      <FaBuilding className={classes.img} />
      <div className={classes.box1}>
        <div className={classes.name}>
          {savings.BankName}
        </div>
      </div>
      <div className={classes.box2}>
        <div className={classes.price}>
          {savings.Currency} {savings.Balance}
        </div>
      </div>
    </div>
  );
}

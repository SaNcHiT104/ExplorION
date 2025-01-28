import classes from "./Transaction.module.css";
import SingleTransaction from "./SingleTransaction";
import { motion } from "framer-motion";
const transactions = [
  {
    id: 1,
    name: "Walmart",
    amount: -68.0,
    date: "Dec 25 - 11:41 AM",
    type: "expense",
  },
];

const Transaction = () => {
  return (
    <motion.div
      className={classes.container}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className={classes.header}>
        <div className={classes.heading}>Transaction history</div>
        {/* <motion.button className={classes.btn} whileHover={{scale:1.1}}>
            Add More
        </motion.button> */}
      </div>
      <motion.div
        className={classes.boxWithtransaction}
        initial={{ opacity: 0,  }}
        animate={{ opacity: 2 }}
        transition={{ duration: 0.4 }}
      >
        <SingleTransaction />
      </motion.div>
    </motion.div>
  );
};

export default Transaction;

import classes from './DashBoard.module.css';
import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import Header from '../UI/Header';
import { NavLink } from 'react-router-dom';
export default function DashBoard() {
  const [currency, setCurrency] = useState("Dollar");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Handle clicks outside dropdown to close it
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  const [money,changeMoney] = useState(12902.72);
  const [symbol,changeSymbol]=useState('$')
  const handleCurrencyChange = (newCurrency) => {
    setCurrency(newCurrency);
    if(newCurrency==="Euros"){
      const newmoneyInEuros = (12902.72*1.0438634).toFixed(2)
      changeMoney(newmoneyInEuros);
      changeSymbol('€')
    }
    else if(newCurrency==="Indian Rupees"){
      const newMoney = (12902.72*86.531716).toFixed(2)
      changeMoney(newMoney)
      changeSymbol('₹')
    }
    else{
      changeMoney(12902.72)
      changeSymbol('$')
    }
    setShowDropdown(false);
  };

  return (
    <motion.div
      className={classes.body}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Header />
      <div className={classes.dashboardContainer}>
        {/* <div className={classes.header}>
          Welcome Sanchit !
        </div> */}
        <div className={classes.centerSection}>
          <div className={classes.balances}>Total Balance</div>

          <div className={classes.expensesAmount}>
            <div className={classes.currencyContainer} ref={dropdownRef}>
              <button
                className={classes.moreAccountBtn}
                onClick={() => setShowDropdown(!showDropdown)}
              >
                {currency}
              </button>
              {showDropdown && (
                <div className={classes.currencyDropdown}>
                  <div
                    className={classes.dropdownItem}
                    onClick={() => handleCurrencyChange("Dollar")}
                  >
                    Dollar
                  </div>
                  <div
                    className={classes.dropdownItem}
                    onClick={() => handleCurrencyChange("Indian Rupees")}
                  >
                    Indian Rupees
                  </div>
                  <div
                    className={classes.dropdownItem}
                    onClick={() => handleCurrencyChange("Euros")}
                  >
                    Euros
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className={classes.totalAmount}>{symbol}{money}</div>
        <div className={classes.accountDetail}>****7263</div>

        <div className={classes.buttonsSection}>
          <motion.button className={`${classes.actionBtn} ${classes.receiveBtn}`} whileHover={{ scale: 1.1 }}>
            Receive
          </motion.button>
          <motion.button className={`${classes.actionBtn} ${classes.sendBtn}`} whileHover={{ scale: 1.1 }}>
            Send
          </motion.button>
          <motion.button className={`${classes.actionBtn} ${classes.moreBtn}`} whileHover={{ scale: 1.1 }}>
            ...
          </motion.button>
        </div>
      </div>

      <div className={classes.title}>Your Accounts</div>

      <div className={classes.squareOptionsContainer}>
        <NavLink to={'/user/savings'}><motion.button className={classes.squareButton} whileHover={{ scale: 1.1 }}>Savings</motion.button></NavLink>
        <motion.button className={classes.squareButton} whileHover={{ scale: 1.1 }}>Checkings</motion.button>
        <motion.button className={classes.squareButton} whileHover={{ scale: 1.1 }}>Liability</motion.button>
        <motion.button className={classes.squareButton} whileHover={{ scale: 1.1 }}>Investments</motion.button>
      </div>
    </motion.div>
  );
}

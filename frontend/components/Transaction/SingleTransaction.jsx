import React from "react";
import classes from "./SingleTransaction.module.css";
import img from "../../assets/Homepage/mainpage2.png"; // Ensure the correct path to the image
import { motion } from "framer-motion";

const SingleTransaction = ({ transaction }) => {
    const { 
        amount: Amount, 
        name: Category, 
        id: AccountID, 
        Currency: Currency, 
        date: Date,
        type: type
      } = transaction;
      
      // To split the 'Date' into Date and Time components
      const [DatePart, Time] = Date.split(", ");
      const sign = type === "debit" ? "-" : "+";
      console.log(Amount, Category, AccountID, Currency, DatePart, Time);

  return (
    <div className={classes.container}>
      <img src={img} alt={Category} className={classes.img} />
      <div className={classes.box1}>
        <div className={classes.name}>{Category || "Unknown"}</div>
        <div className={classes.lowername}>
          <div className={classes.date}>{DatePart || "N/A"}</div>
          <div className={classes.time}>{Time || "N/A"}</div>
        </div>
      </div>
      <div className={classes.box2}>
        <div className={classes.price}>
          {sign || ""}
          {Currency || "$"}
          {Amount || "0.00"}
        </div>
      </div>
    </div>
  );
};

export default SingleTransaction;
/*
import img from '../../assets/Homepage/mainpage2.png'
import classes from './SingleTransaction.module.css'
export default function SingleTransaction({key,transaction}){
    return <div className={classes.container}>
        <img src={img} className={classes.img} />
        <div className={classes.box1}>
            <div className={classes.name}>
                Investment
            </div>
            <div className={classes.lowername}>
                <div className={classes.date}>
                    Dec 25
                </div>
                <div className={classes.time}>
                    11:41 AM
                </div>
            </div>
        </div>
        <div className={classes.box2}>
                <div className={classes.price}>
                    $61.47
                </div>
        </div>
    </div>
}*/
import React from "react";
import styles from "./footer.module.css";
import { NavLink } from "react-router-dom";
import {motion} from 'framer-motion'
const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
      <NavLink
            to={'/user/homePage'}
            className={({ isActive }) =>
              isActive ? styles.active : undefined
            }
          > 
        <motion.button className={styles.footerButton} whileHover={{scale:1.1}}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={styles.footerIcon}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 10.5l8.25-7.5 8.25 7.5M21 10.5v9.75a1.5 1.5 0 01-1.5 1.5h-3.75a1.5 1.5 0 01-1.5-1.5v-4.5a1.5 1.5 0 00-1.5-1.5h-3a1.5 1.5 0 00-1.5 1.5v4.5a1.5 1.5 0 01-1.5 1.5H4.5a1.5 1.5 0 01-1.5-1.5V10.5z"
            />
          </svg>
          <span>Home</span>
        </motion.button>
        </NavLink>
        <NavLink
            to={'/user/transaction'}
            className={({ isActive }) =>
              isActive ? styles.active : undefined
            }
          > 
        <button className={styles.footerButton}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={styles.footerIcon}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 8.25v7.5m3.75-3.75h-7.5m13.5 0a9.75 9.75 0 11-19.5 0 9.75 9.75 0 0119.5 0z"
            />
          </svg>
          <span>Transaction</span>
        </button>
        </NavLink>
        <button className={styles.footerButton}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={styles.footerIcon}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25V9m9 12.75V19.5a2.25 2.25 0 00-2.25-2.25h-7.5A2.25 2.25 0 005.25 19.5v2.25m10.5-6.75a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span>Profile</span>
        </button>
      </div>
    </footer>
  );
};
export default Footer;

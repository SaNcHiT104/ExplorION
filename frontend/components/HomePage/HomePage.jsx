import classes from './HomePage.module.css'
import img from '../../assets/Homepage/image3.jpg'
import { motion, useScroll, useTransform } from "framer-motion";
import { NavLink } from 'react-router-dom';
export default function HomePage(){
    return (
        <div className={classes.body}>
            <img src={img} alt='photo' className={classes.photo}></img>
            <div className={classes.secondContainer}>
            <p className={classes.heading1}>
            Reach your financial goal
            </p>
            <p className={classes.heading6}> with us</p>
            <p className={classes.heading2}>
            We offer you the financial features 
            </p>
            <p className={classes.heading4}>
            and most secure system to grow your
            </p>
            <p className={classes.heading3}>
                wealth.
            </p>
            <div className={classes.buttonPage}>
            
            <NavLink to={'/user/homePage'}>
            <motion.button className={classes.haveAccount} whileHover={{scale:1.1}}>
                Start Your Journey !
            </motion.button>
            </NavLink>
            </div>
            </div>
        </div>
    )
}
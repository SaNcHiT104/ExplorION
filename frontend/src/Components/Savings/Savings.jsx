import classes from './Savings.module.css'
import {motion} from 'framer-motion'
import SingleBank from './SingleBank'
import CircularGraph from '../Charts/CircularGraph'
export default function Savings(){
    return <motion.div
      className={classes.container}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
        
      <div className={classes.header}>
        <div className={classes.heading}>Savings Account</div>
        {/* <motion.button className={classes.btn} whileHover={{scale:1.1}}>
            Add More
        </motion.button> */}
      </div>
      <CircularGraph />
      <motion.div
        className={classes.boxWithtransaction}
        initial={{ opacity: 0,  }}
        animate={{ opacity: 2 }}
        transition={{ duration: 0.4 }}
      >
        <SingleBank/>
      </motion.div>
    </motion.div>
}
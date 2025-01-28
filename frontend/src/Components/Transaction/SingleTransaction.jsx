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
}
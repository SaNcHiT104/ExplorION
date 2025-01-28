import img from '../../assets/Savings/JPMorgan.jpg'
import classes from './SingleBank.module.css'
export default function SingleBank({key,transaction}){
    return <div className={classes.container}>
        <img src={img} className={classes.img} />
        <div className={classes.box1}>
            <div className={classes.name}>
                JP Morgan Bank
            </div>
        </div>
        <div className={classes.box2}>
                <div className={classes.price}>
                    $61.47
                </div>
        </div>
    </div>
}
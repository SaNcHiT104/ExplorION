import classes from './Analytics.module.css'
export default function Analytics(){

    return <>
        <div className={classes.container}>
            <div className={classes.heading}>
            Asset Management PortFolio
            </div>
            <div className={classes.btnbar}>
                <button className={classes.btn}>Value OverTime</button>
                <button className={classes.btn}>Risk Level</button>
                <button className={classes.btn}>Asset Distribution</button>
            </div>
        </div>
    </>
}
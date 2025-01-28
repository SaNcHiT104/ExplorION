import classes from './Header.module.css';
 
export default function Header() {
  return (
    <div className={classes.body}>
      <div className={classes.headerStyle}>
            <div className={classes.rightSection}>
                <div className={classes.Greeting}>  Good Morning </div>
                <div className={classes.username}> Sanchit</div>
            </div>
            <div className={classes.leftSection}> Notification </div>
      </div>
    </div>
  );
}
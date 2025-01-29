import BarChart from "../Charts/barChart";
// import CandlestickChart from "../Charts/CandlestickChart";
import DiscChartComponent from "../Charts/DiscChartComponent";
// import ChartComponent from "../Charts/LineChart";
import classes from "./Analytics.module.css";
// import AssetRadarChart from "../Charts/CandlestickChart";
import { motion } from "framer-motion";
import { useState } from "react";
export default function Analytics() {
  const analysis = [
    "Stocks showed a sharp decline from the 29th to the 31st, suggesting high volatility. Caution is advised in stock investments during this period.",
    "Real Estate values have steadily decreased, indicating a potential slowdown in this sector.",
    "Cryptocurrency values remained relatively stable between the 29th and 30th but dropped significantly on the 31st, reflecting its inherent volatility.",
    "Commodities displayed more consistency, making them a potentially safer option for investment.",
    "Bond values also showed a declining trend, but they remained relatively less volatile compared to stocks and cryptocurrencies.",
  ];
  const riskAnalysis = [
    "Apple Stock experienced a high price point but also displayed significant fluctuations, suggesting moderate volatility. Investors should be prepared for potential price swings in the short term.",
    "Bitcoin, in both ETF and Bond forms, shows lower value volatility compared to stock investments. However, its risk remains higher due to its fluctuating nature, especially in uncertain market conditions.",
    "The Vanguard ETF Stock maintained relatively stable values, but still exhibited some fluctuations, indicating moderate risk compared to other stock investments.",
    "Bitcoin Stock has displayed large value differences, indicating high volatility, making it a risky option for investors who prefer stability.",
  ];
  const [state, changeState] = useState(1);
  let content = (
    <>
      <div className={classes.btnbar}>
        <button className={classes.btn} onClick={() => changeState(1)}>
          Value OverTime
        </button>
        <button className={classes.btn} onClick={() => changeState(2)}>
          Risk Level
        </button>
        <button className={classes.btn} onClick={() => changeState(3)}>
          Asset Distribution
        </button>
      </div>
      <BarChart />
      <div className={classes.content}>
        {analysis.map((item, index) => (
          <motion.div
            key={index}
            className={`${classes.analysisItem} ${classes[`item${index + 1}`]}`}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {item}
          </motion.div>
        ))}
      </div>
    </>
  );

  if (state === 2) {
    content = (
      <><div className={classes.btnbar1}>
      <button className={classes.btn} onClick={() => changeState(1)}>
        Value OverTime
      </button>
      <button className={classes.btn} onClick={() => changeState(2)}>
        Risk Level
      </button>
      <button className={classes.btn} onClick={() => changeState(3)}>
        Asset Distribution
      </button>
    </div>
        <DiscChartComponent />
        <div className={classes.content}>
          {riskAnalysis.map((item, index) => (
            <motion.div
              key={index}
              className={`${classes.analysisItem} ${
                classes[`item${index + 1}`]
              }`}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {item}
            </motion.div>
          ))}
        </div>
      </>
    );
  }
  if (state == 3) {
    content = (
      <>
        <div className={classes.btnbar}>
          <button className={classes.btn} onClick={() => changeState(1)}>
            Value OverTime
          </button>
          <button className={classes.btn} onClick={() => changeState(2)}>
            Risk Level
          </button>
          <button className={classes.btn} onClick={() => changeState(3)}>
            Asset Distribution
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <div className={classes.container}>
        <div className={classes.heading}>Asset Management PortFolio</div>

        {content}
      </div>
    </>
  );
}

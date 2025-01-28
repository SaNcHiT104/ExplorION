import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import styles from './CircularGraph.module.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
    labels: ['Bank A', 'Bank B', 'Bank C', 'Bank D'],
    datasets: [
        {
            data: [3000, 5000, 2000, 4000], // Example savings amounts
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
        }
    ]
};

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'bottom'
        }
    }
};

const CircularGraph = () => {
    return (
        <div className={styles.graphContainer}>
            
            <Pie data={data} options={options} />
        </div>
    );
};

export default CircularGraph;
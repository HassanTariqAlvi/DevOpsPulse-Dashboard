import MetricCard from '../components/MetricCard';
import iconBuild from '../assets/icons/lambda.svg';
import iconDeploy from '../assets/icons/2.svg';
import iconUptime from '../assets/icons/3.svg';
import iconFail from '../assets/icons/4.svg';

const Dashboard = () => (
  <div className="card-grid">
    <MetricCard title="Deploy Lambda" value="12" color="green" centerIcon={iconBuild} />
    <MetricCard title="Deployments" value="5" color="orange" centerIcon={iconDeploy} />
    <MetricCard title="Uptime" value="99.98%" color="blue" centerIcon={iconUptime} />
    <MetricCard title="Failed Builds" value="1" color="red" centerIcon={iconFail} />
  </div>
);

export default Dashboard;

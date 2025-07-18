import LambdaCard from "../components/LambdaCard";
import UptimeCard from "../components/UptimeCard";
import MetricCardBase from "../components/MetricCardBase";

import iconBuild from "../assets/icons/lambda.svg";
import iconDeploy from "../assets/icons/2.svg";
import iconUptime from "../assets/icons/3.svg";
import iconFail from "../assets/icons/4.svg";

const Dashboard = () => (
  <div className="card-grid">
    <LambdaCard title="Deploy Lambda" color="green" centerIcon={iconBuild} />
    <MetricCardBase title="Deployments" color="orange" centerIcon={iconDeploy} />
    <UptimeCard title="Uptime" value="99.98%" color="blue" centerIcon={iconUptime} />
    <MetricCardBase title="Failed Builds" color="red" centerIcon={iconFail} />
  </div>
);

export default Dashboard;

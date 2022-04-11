import "./css/home.css";
import Sidebar from "../components/Sidebar";
import WaterFall from "../components/WaterFall";

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <WaterFall />
    </div>
  );
};

export default Home;

// import "./css/home.css";
import Sidebar from "../components/Sidebar";
import WaterFall from "../components/WaterFall";
import Navibar from "../components/Navibar";
import Header from "../components/Header";

const Home = () => {
  return (
    <>
      <div className="absolute w-full z-20">
        <Navibar />
      </div>
      <main>
        <Header />
      </main>
    </>
  );
};

export default Home;

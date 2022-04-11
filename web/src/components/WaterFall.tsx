import "./css/waterFall.css";
import Search from "./Search";
// import Recipe from "./Recipe";

const WaterFall = () => {
  return (
    <>
      <div className="waterFall">
        <div className="waterFall_search">
          <img
            src="https://x.yummlystatic.com/web/strawberry-grain.png"
            alt=""
          />
          <div>
            <Search />
          </div>
          <img src="https://x.yummlystatic.com/web/img-fruit-bowl.png" alt="" />
        </div>
        {/* <Recipe /> */}
      </div>
    </>
  );
};

export default WaterFall;

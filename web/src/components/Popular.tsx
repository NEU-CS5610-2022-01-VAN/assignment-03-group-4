import Carousel from "react-bootstrap/Carousel";

const Popular = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://assets.epicurious.com/photos/6058d90df2b833b1d0cc27fc/9:4/w_2008,h_892,c_limit/GemCakes_HERO_031821_10783.jpg"
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://assets.epicurious.com/photos/6058d90df2b833b1d0cc27fc/9:4/w_2008,h_892,c_limit/GemCakes_HERO_031821_10783.jpg"
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://assets.epicurious.com/photos/6058d90df2b833b1d0cc27fc/9:4/w_2008,h_892,c_limit/GemCakes_HERO_031821_10783.jpg"
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
  );
};

export default Popular;

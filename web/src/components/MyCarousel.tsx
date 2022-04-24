import { useState, useEffect } from "react";
import { Rating } from "@mui/material";
import { IoTimerOutline } from "react-icons/io5";

const images = [
  {
    image:
      "https://images.immediate.co.uk/production/volatile/sites/30/2013/05/Puttanesca-fd5810c.jpg",
  },
  {
    image:
      "https://static.onecms.io/wp-content/uploads/sites/19/2019/03/04/pasta-with-italian-sunday-sauce-1812-p29-2000.jpg",
  },
  {
    image:
      "https://static01.nyt.com/images/2016/10/05/dining/05KITCH-WEB1/05KITCH-WEB1-superJumbo.jpg",
  },
  {
    image:
      "https://www.licious.in/blog/wp-content/uploads/2020/12/Roast-Chicken.jpg",
  },
];

const videos = [{ id: "hj4WR2aSxSk" }];

const Thumbnail = (props) => {
  return (
    <div
      style={{
        margin: "5px",
        width: "200px",
        padding: "10px",
        height: "100px",
        backgroundPosition: "center",
        backgroundImage: `url(${props.url})`,
        backgroundSize: "cover",
      }}
    />
  );
};

function MyCarousel() {
  const [urlCurrent, setUrlCurrent] = useState(
    `https://www.youtube.com/embed/${videos[0].id}`
  );
  const [video, setVideo] = useState(true);
  useEffect(() => {});
  return (
    <>
      <div className="inline-flex justify-between w-full">
        {video ? (
          <iframe
            width="672"
            height="378"
            src={urlCurrent}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        ) : (
          // <img width="560px" height="315px" src={urlCurrent} alt="recipe" />
          <div
            style={{
              backgroundColor: "#ffffff",
              width: "672px",
              padding: "10px",
              height: "378px",
              backgroundImage: `url(${urlCurrent})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
        )}
        <div
          style={{
            width: "210px",
            height: "260px",
            borderWidth: 2,
            borderColor: "#D9D9D9",
          }}
          className="flex flex-col mr-2 bg-amber-300 rounded"
        >
          <div className="ml-auto border-none">
            <IoTimerOutline color="#E7AB47" size="30" />
          </div>
          {/* <div className="font-serif ml-2 pb-2">Aboute This Recipe</div> */}
          <div className="mt-2 font-serif flex flex-col ml-10 gap-2 py-2">
            <div className="flex content-center  ">
              <div className=" text-gray-800 font-bold mr-2">5.0</div>
              <Rating name="read-only" value={5} readOnly />
            </div>

            <div className=" text-sm">17 Ratings 10 reviews</div>
            <div className="flex flex-col gap-2">
              <div className="flex content-center mt-5 ">
                Total Minutes
                <div className="text-gray-800 font-bold ml-2">3</div>
              </div>
              <div className="flex content-center ">
                <div>Ingredients </div>
                <div className="text-gray-800 font-bold ml-2">4</div>
              </div>
              <div className="flex content-center ">
                <div>Cooking Steps </div>
                <div className="text-gray-800 font-bold ml-2">4</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="flex items-center h-full overflow-y-scroll"
        style={{
          display: "flex",
          alignItems: "center",
          overflowX: "scroll",
          height: "100%",
          scrollSnapType: "x mandatory",
          flexFlow: "row nowrap",
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        }}
      >
        <>
          {videos.map((v) => {
            return (
              <button
                key={v.id}
                onClick={() => {
                  setUrlCurrent(`https://www.youtube.com/embed/${v.id}`);
                  setVideo(true);
                }}
              >
                <Thumbnail
                  url={`https://img.youtube.com/vi/${v.id}/mqdefault.jpg`}
                />
              </button>
            );
          })}
        </>
        <>
          {images.map((c) => {
            return (
              <button
                key={c.image}
                onClick={() => {
                  setUrlCurrent(c.image);
                  setVideo(false);
                }}
              >
                <Thumbnail url={c.image} />
              </button>
            );
          })}
        </>
      </div>
    </>
  );
}

export default MyCarousel;

import { useState, useEffect } from "react";

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
];

const videos = [{ id: "hj4WR2aSxSk" }];

function MyCarousel() {
  const [urlCurrent, setUrlCurrent] = useState(
    `https://www.youtube.com/embed/${videos[0].id}`
  );
  const [video, setVideo] = useState(true);
  useEffect(() => {
    // document.title = `You clicked ${count} times`;
  });
  return (
    <>
      {video ? (
        <iframe
          width="560"
          height="315"
          src={urlCurrent}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      ) : (
        <img width="560px" height="315px" src={urlCurrent} alt="recipe" />
      )}
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
              <div
                onClick={() => {
                  setUrlCurrent(`https://www.youtube.com/embed/${v.id}`);
                  setVideo(true);
                }}
                key={v.id}
                style={{
                  marginRight: "20px",
                  width: "200px",
                  padding: "10px",
                  height: "100px",
                  backgroundPosition: "center",
                  backgroundImage: `url(https://img.youtube.com/vi/${v.id}/mqdefault.jpg)`,
                  backgroundSize: "cover",
                }}
              />
            );
          })}
        </>
        <>
          {images.map((c) => {
            return (
              <div
                onClick={() => {
                  setUrlCurrent(c.image);
                  setVideo(false);
                }}
                key={c.image}
                style={{
                  marginRight: "20px",
                  width: "200px",
                  padding: "10px",
                  height: "100px",
                  backgroundPosition: "center",
                  backgroundImage: `url(${c.image})`,
                  backgroundSize: "cover",
                }}
              />
            );
          })}
        </>
      </div>
    </>
  );
}

export default MyCarousel;

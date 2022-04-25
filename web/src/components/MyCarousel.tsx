import GetImageById from "../api/ImageAPI";
import axios from "axios";
import { useState, useEffect } from "react";

const originalImages = [
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

function MyCarousel(props) {
  const [urlCurrent, setUrlCurrent] = useState(
    props.video
      ? `https://www.youtube.com/embed/${props.video}`
      : `http://img.zcool.cn/community/017f365d157e1ea8012051cd848a88.gif`
  );
  const [video, setVideo] = useState(props.video ? true : false);

  const [images, setImages] = useState([]);

  useEffect(() => {
    Promise.all(
      props.photos.map((photoId) =>
        axios
          .get(
            `${process.env.REACT_APP_API_BASE_URL}/recipes/${props.recipeId}/files/${photoId}`,
            { responseType: "blob" }
          )
          .then((res) => URL.createObjectURL(res.data as any))
      )
    ).then((res: any) => {
      setImages(res);
      if (!props.video) {
        setUrlCurrent(res[0]);
      }
    });
  }, [props.photos, props.recipeId]);

  return (
    <>
      {console.log(props.video)}

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
        {props.children}
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
          {props.video && (
            <button
              onClick={() => {
                setUrlCurrent(`https://www.youtube.com/embed/${props.video}`);
                setVideo(true);
              }}
            >
              <Thumbnail
                url={`https://img.youtube.com/vi/${props.video}/mqdefault.jpg`}
              />
            </button>
          )}
        </>
        <>
          {images.length !== 0 &&
            images.map((img) => {
              return (
                <button
                  key={img}
                  onClick={() => {
                    setUrlCurrent(img);
                    setVideo(false);
                  }}
                >
                  <Thumbnail url={img} />
                </button>
              );
            })}
        </>
      </div>
    </>
  );
}

export default MyCarousel;

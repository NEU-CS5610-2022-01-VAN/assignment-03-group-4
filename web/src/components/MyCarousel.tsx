import axios from "axios";
import { useState, useEffect } from "react";
import "./css/myCarousel.css";
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
  }, [props.photos, props.recipeId, props.video]);

  return (
    <>
      <div className="responsive-topcard flex md:flex-row flex-col w-full top-container">
        <div className="box ">
          {video ? (
            <iframe
              title="recipe-video"
              className="responsive-iframe"
              src={urlCurrent}
            />
          ) : (
            <div
              className="responsive-iframe"
              style={{
                backgroundColor: "#ffffff",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundImage: `url(${urlCurrent})`,
              }}
            />
          )}
        </div>
        <div
          className="note flex flex-col mx-auto "
          style={{
            borderColor: "#D9D9D9",
            backgroundColor: "#F5F1E7",
          }}
        >
          {props.children}
        </div>
      </div>
      <div
        className="flex items-center h-full "
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
            images.map((img, index) => {
              return (
                <button
                  key={img}
                  onClick={() => {
                    setUrlCurrent(img);
                    setVideo(false);
                  }}
                  style={{ outline: "none" }}
                  aria-label={`carousel image ${index}`}
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

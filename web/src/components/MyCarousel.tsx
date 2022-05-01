import "./css/myCarousel.css";
import axios from "axios";
import { useState, useEffect } from "react";

type ThumbnailProps = { url: string };

const Thumbnail = ({ url }: ThumbnailProps): JSX.Element => {
  return (
    <div
      style={{
        margin: "5px",
        width: "200px",
        padding: "10px",
        height: "100px",
        backgroundPosition: "center",
        backgroundImage: `url(${url})`,
        backgroundSize: "cover",
      }}
    />
  );
};

type Props = {
  video: string;
  photos: string[];
  recipeId: string;
  children: React.ReactNode;
};

const MyCarousel = ({
  video,
  photos,
  recipeId,
  children,
}: Props): JSX.Element => {
  const [urlCurrent, setUrlCurrent] = useState(
    video
      ? `https://www.youtube.com/embed/${video}`
      : `http://img.zcool.cn/community/017f365d157e1ea8012051cd848a88.gif`
  );
  const [videoOpen, setVideoOpen] = useState<boolean>(video ? true : false);
  const [images, setImages] = useState([]);

  useEffect(() => {
    Promise.all(
      photos.map((photoId) =>
        axios
          .get(
            `${process.env.REACT_APP_API_BASE_URL}/recipes/${recipeId}/files/${photoId}`,
            { responseType: "blob" }
          )
          .then((res) => URL.createObjectURL(res.data as any))
      )
    ).then((res: any) => {
      setImages(res);
      if (!video) {
        setUrlCurrent(res[0]);
      }
    });
  }, [photos, recipeId, video]);

  return (
    <>
      <div className="responsive-topcard flex md:flex-row flex-col w-full top-container">
        <div className="box ">
          {videoOpen ? (
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
          {children}
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
        {video && (
          <button
            onClick={() => {
              setUrlCurrent(`https://www.youtube.com/embed/${video}`);
              setVideoOpen(true);
            }}
          >
            <Thumbnail
              url={`https://img.youtube.com/vi/${video}/mqdefault.jpg`}
            />
          </button>
        )}

        {images.length !== 0 &&
          images.map((img, index) => {
            return (
              <button
                key={img}
                onClick={() => {
                  setUrlCurrent(img);
                  setVideoOpen(false);
                }}
                aria-label={`carousel image ${index}`}
              >
                <Thumbnail url={img} />
              </button>
            );
          })}
      </div>
    </>
  );
};

export default MyCarousel;

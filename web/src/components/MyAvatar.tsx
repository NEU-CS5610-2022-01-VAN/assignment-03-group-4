import Avatar from "@mui/material/Avatar";
import GetAvatarById from "../apis/AvaterAPI";

const MyAvatar = (userId) => {
  const { isLoading, error, data: url } = GetAvatarById(userId);

  return (
    <>
      {error ? (
        <></>
      ) : isLoading ? (
        <Avatar alt="avater" src="../assets/img/recipe.png" />
      ) : (
        <>
          <Avatar alt="avater" src={url} />
        </>
      )}
    </>
  );
};

export default MyAvatar;

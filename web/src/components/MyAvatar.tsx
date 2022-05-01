import Avatar from "@mui/material/Avatar";
import GetAvatarByUserId from "../apis/GetAvatarByUserId";

type Props = {
  userId: string;
};

const MyAvatar = ({ userId }: Props): JSX.Element => {
  const { isLoading, error, data: avatarUrl } = GetAvatarByUserId(userId);

  return (
    <>
      {error ? (
        <>Error:{error.message}</>
      ) : isLoading ? (
        <Avatar alt="avater" src="../assets/img/recipe.png" />
      ) : (
        <Avatar alt="avater" src={avatarUrl} />
      )}
    </>
  );
};

export default MyAvatar;

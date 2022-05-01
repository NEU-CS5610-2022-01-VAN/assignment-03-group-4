import RecipeRowList from "../components/RecipeRowList";
import ReviewList from "../components/ReviewList";

type Props = {
  showRecipe: boolean;
  userId: string;
};

const PublicProfile = ({ showRecipe, userId }: Props): JSX.Element => {
  const url = `${process.env.REACT_APP_API_BASE_URL}/users/${userId}`;

  return (
    <>
      {showRecipe ? (
        <RecipeRowList url={url + "/recipes"} />
      ) : (
        <ReviewList
          url={url + "/reviews"}
          showDeleteButton={true}
          showRecipe={true}
        />
      )}
    </>
  );
};

export default PublicProfile;

import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const ProfileCard = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  // const [userMetadata, setUserMetadata] = useState(null);
  // const { getAccessTokenSilently } = useAuth0();

  // useEffect(() => {
  //   const getUserMetadata = async () => {
  //     const domain = "dev-v3sgfmsg.us.auth0.com";

  //     try {
  //       const accessToken = await getAccessTokenSilently({
  //         audience: `https://${domain}/api/v2/`,
  //         scope: "read:current_user",
  //       });

  //       const userDetailsByIdUrl = `https://${domain}/api/v2/users/${
  //         (user as any).sub
  //       }`;

  //       const metadataResponse = await fetch(userDetailsByIdUrl, {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       });

  //       const { user_metadata } = await metadataResponse.json();

  //       setUserMetadata(user_metadata);
  //     } catch (e) {
  //       console.log((e as any).message);
  //     }
  //   };

  //   getUserMetadata();
  // }, [getAccessTokenSilently, user]);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <div>
      {isAuthenticated && (
        <div>
          <img src={(user as any).picture} alt={(user as any).name} />
          <h2>{(user as any).name}</h2>
          <p>{(user as any).email}</p>

          {/* <h3>User Metadata</h3>
          {userMetadata ? (
            <pre>{JSON.stringify(userMetadata, null, 2)}</pre>
          ) : (
            "No user metadata defined"
          )} */}
        </div>
      )}
    </div>
  );
};

export default ProfileCard;

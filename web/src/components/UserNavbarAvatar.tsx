import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Image from "react-bootstrap/Image";
import "./css/userNavbarAvatar.css";

const UserNavbarAvatar = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <div>
      <div>
        <Image
          className="avatar"
          src={
            isAuthenticated
              ? (user as any).picture
              : "https://media.istockphoto.com/vectors/user-profile-icon-vector-avatar-portrait-symbol-flat-shape-person-vector-id1270368615?k=20&m=1270368615&s=170667a&w=0&h=qpvA8Z6L164ZcKfIyOl-E8fKnfmRZ09Tks7WEoiLawA="
          }
          alt={"user avatar"}
          roundedCircle={true}
        />
      </div>
    </div>
  );
};

export default UserNavbarAvatar;

import react from "react";
import { BiFoodMenu } from "react-icons/bi";
import { Divider, Link } from "@mui/material";

const Footer = () => (
  <>
    <Divider />
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 15,
        color: "#6e6e73",
      }}
    >
      <BiFoodMenu size={35} style={{ marginBottom: 10 }} />
      <div>© 2022 Intelligent Yun Inc. All rights reserved</div>

      <div style={{ display: "flex", flexDirection: "row" }}>
        <Link
          href="/profile"
          underline="hover"
          color="#6e6e73"
          style={{ fontSize: 12, margin: "0px 7px" }}
        >
          Privacy Policy
        </Link>
        <Link
          href="/profile"
          underline="hover"
          color="#6e6e73"
          style={{ fontSize: 12, margin: "0px 7px" }}
        >
          Use of Cookies
        </Link>
        <Link
          href="/profile"
          underline="hover"
          color="#6e6e73"
          style={{ fontSize: 12, margin: "0px 7px" }}
        >
          Legal
        </Link>
      </div>
    </div>
  </>
);

export default Footer;

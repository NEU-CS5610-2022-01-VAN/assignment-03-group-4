import react from "react";
import { BiFoodMenu } from "react-icons/bi";
import Container from "@mui/material/Container";
import { Button, Divider, Link } from "@mui/material";

const Footer = () => (
  <>
    <Divider />
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 15,
        color: "#6e6e73"
        // backgroundColor: "#f5f5f7",
      }}
    >
      <BiFoodMenu size={35} style={{ marginBottom: 10 }} />
      <div>© 2022 Intelligent Yun Inc. All rights reserved</div>
      {/* <div>
        No time to cook? Check out{" "}
        <a href="https://www.ubereats.com/">uber eats</a>
      </div> */}

      <div style={{ display: "flex", flexDirection: "row" }}>
        <Link
          href="/profile"
          underline="hover"
          color="#6e6e73"
          style={{ fontSize: 12, margin: "0px 7px" }}
        >
          Privacy Policy
        </Link>

        {/* <Divider
          orientation="vertical"
          variant="middle"
          flexItem
          style={{ height: 10, color: "#000" }}
        /> */}
        <Link
          href="/profile"
          underline="hover"
          color="#6e6e73"
          style={{ fontSize: 12, margin: "0px 7px" }}
        >
          Use of Cookies
        </Link>
        {/* <Divider
          orientation="vertical"
          variant="middle"
          flexItem
          style={{ height: "100%" }}
        /> */}

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

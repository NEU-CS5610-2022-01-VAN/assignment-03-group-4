import axios from "axios";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  IconButton,
  ListItemText,
  ListItem,
  Divider,
  List,
  Drawer,
  Box,
} from "@mui/material";
import {
  AiOutlineShareAlt,
  AiOutlineSetting,
  AiOutlineBell,
} from "react-icons/ai";
import MenuIcon from "@mui/icons-material/Menu";
import { IoFastFoodOutline } from "react-icons/io5";
import { BiHelpCircle } from "react-icons/bi";
import LoadingIcon from "../components/LoadingIcon";

const url = `${process.env.REACT_APP_API_BASE_URL}/categories`;

export default function LeftCategoryDrawer() {
  const {
    isLoading,
    error,
    data: categories,
  } = useQuery<ICategory[], Error>(url, () =>
    axios.get(url).then((res) => res.data)
  );

  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);

  const toggleDrawer =
    (newState: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setOpen(newState);
    };

  return (
    <>
      <IconButton
        onClick={toggleDrawer(true)}
        onMouseDown={(e) => e.preventDefault()}
        size="medium"
        aria-label="LeftDrawer"
      >
        <MenuIcon sx={{ fontSize: 32 }} />
      </IconButton>

      <Drawer anchor={"left"} open={open} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            {["🥖   Recipe", "Oh I love it"].map((text, index) => (
              <ListItem button key={text} onClick={() => navigate("/")}>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />

          {error ? (
            <div>Error: {error.message}</div>
          ) : isLoading ? (
            <LoadingIcon />
          ) : (
            <>
              <List>
                {categories?.map((category, index) => (
                  <ListItem
                    button
                    key={category._id}
                    onClick={() => navigate(`/categories/${category._id}`)}
                  >
                    <IoFastFoodOutline className="mr-3" />
                    <ListItemText primary={category.name} />
                  </ListItem>
                ))}
              </List>
              <Divider />
            </>
          )}

          <List>
            <ListItem button>
              <AiOutlineBell className="mr-3" />
              <ListItemText primary={"Subscribe"} />
            </ListItem>

            <ListItem button>
              <AiOutlineSetting className="mr-3" />
              <ListItemText primary={"Settings"} />
            </ListItem>

            <ListItem button>
              <BiHelpCircle className="mr-3" />
              <ListItemText primary={"Help"} />
            </ListItem>

            <ListItem button>
              <AiOutlineShareAlt className="mr-3" />
              <ListItemText primary={"Share"} />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
}

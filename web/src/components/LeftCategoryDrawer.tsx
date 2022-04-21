import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";
import { useQuery } from "react-query";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const url = process.env.REACT_APP_API_BASE_URL + "/categories";

export default function LeftCategoryDrawer() {
  const {
    isLoading,
    error,
    data: categories,
    isFetching,
  } = useQuery(url, () => axios.get(url).then((res) => res.data));
  const navigate = useNavigate();

  const [open, setOpen] = React.useState<boolean>(false);

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
    <div>
      <React.Fragment>
        <IconButton onClick={toggleDrawer(true)}>
          <MenuIcon />
        </IconButton>

        <Drawer anchor={"left"} open={open} onClose={toggleDrawer(false)}>
          <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            <List>
              {["🥖 Recipe", "Oh I love it"].map((text, index) => (
                <ListItem
                  button
                  key={text}
                  onClick={() => navigate("/recipes")}
                >
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
            <Divider />

            {error ? (
              <div>Error: {(error as any).mesasge}</div>
            ) : isLoading ? (
              <div>
                <CircularProgress color="inherit" />
              </div>
            ) : (
              <>
                <List>
                  {categories.map((category, index) => (
                    <ListItem
                      button
                      key={category._id}
                      onClick={() => navigate(`/categories/${category._id}`)}
                    >
                      <ListItemText primary={category.name} />
                    </ListItem>
                  ))}
                </List>
                <Divider />
              </>
            )}

            <List>
              {["Subscribe", "Settings", "Share"].map((text, index) => (
                <ListItem button key={text}>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
      </React.Fragment>
    </div>
  );
}

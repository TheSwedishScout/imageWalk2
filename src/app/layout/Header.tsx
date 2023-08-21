import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Drawer,
  Divider,
  Link,
  ListItem,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

import React, { useState } from "react";
import {theme} from "@/pages/lib/theme";
import Image from "next/image";
import { UserIcon } from "../components/userIcon";

const links = [{ title: "Hem", path: "/" }];

const navStyles = {
  color: "white",
  textDecoration: "none",
  typography: theme.typography,
  "&:hover": { color: theme.palette.secondary.main },
  "&.active": {
    color: theme.palette.secondary.main,
  },
};

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <AppBar position="static" className="{styles.NavBar}">
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box display="flex" alignItems="center">
          <Link href="/">
            <Image
              src="/logo.svg"
              alt="logo Logo"
              priority={true}
              width={147}
              height={58}
            />
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "200px",
                transform: "translate(-50%, -50%)",
                fontSize: "1rem",
                color: "white",
              }}
            >
              ArtWalk
            </Box>
          </Link>
        </Box>

        <UserIcon />

        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={() => setOpen(!open)}
          sx={{
            mr: 2,
            display: {
              xs: "block",
              sm: "none",
            },
          }}
        >
          <MenuIcon />
        </IconButton>

        <Drawer anchor="right" open={open} onClose={() => setOpen(!open)}>
          <Box
            sx={{
              p: 2,
              height: 1,
            }}
          >
            <CloseIcon
              onClick={() => setOpen(!open)}
              sx={{ mb: 2, border: "1px solid white" }}
              style={navStyles}
            />

            <Divider sx={{ mb: 2, backgroundColor: "white" }} />

            <Box sx={{ mb: 2 }}>
              {links.map(({ title, path }) => (
                <ListItem key={path}>
                  <Link href={path} style={navStyles}>
                    {title.toUpperCase()}
                  </Link>
                </ListItem>
              ))}
            </Box>
          </Box>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};

export { Header };

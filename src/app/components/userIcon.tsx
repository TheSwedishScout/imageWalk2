import {
  Avatar,
  Button,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuItem,
} from "@mui/material";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

export const UserIcon = () => {
  const { data: session } = useSession();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  // const [menuOpen, setMenuOpen] = useState(false);

  const handleOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    // setMenuOpen(!menuOpen);
    setAnchorEl(event.currentTarget);
  };
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <List sx={{ display: { xs: "none", sm: "flex" } }}>
      {session && session.user && session.user.name ? (
        <ListItem key="logOut">
          <IconButton
            aria-controls="user-menu"
            aria-haspopup={true}
            onClick={handleOnClick}
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar alt={session.user.name} src={session.user?.image || ""} />
          </IconButton>
          <Menu
            id="user-menu"
            open={open}
            onClose={handleClose}
            anchorEl={anchorEl}
          >
            <MenuItem
              onClick={() => {
                signOut();
                handleClose();
              }}
            >
              Sign Out
            </MenuItem>
            <MenuItem onClick={() => handleClose()}>
              <Link href={"/NewTrack"}>Create Route</Link>
            </MenuItem>
            {/* 
            <MenuItem onClick={handleMenuClose}>More</MenuItem> */}
          </Menu>
        </ListItem>
      ) : (
        <ListItem key="logIn">
          <Button variant="text" onClick={() => signIn()}>
            Sign in
          </Button>
        </ListItem>
      )}
    </List>
  );
};

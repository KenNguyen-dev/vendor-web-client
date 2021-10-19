import React, { useState } from "react";
import {
  Toolbar,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  AppBar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import StorefrontIcon from "@mui/icons-material/Storefront";
import RateReviewIcon from "@mui/icons-material/RateReview";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import MenuIcon from "@mui/icons-material/Menu";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import MoneyIcon from "@mui/icons-material/Money";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { State } from "../../state/reducers";
import { titlesAction } from "../../state/index";
import { useHistory } from "react-router";
import { withRouter } from "react-router";
import { useAuth0 } from "@auth0/auth0-react";

const drawerWidth = 200;
const Sidenav = (props: any) => {
  const { user, logout } = useAuth0()!;

  const history = useHistory();
  const [mobileOpen, setMobileOpen] = useState(false);
  const dispatch = useDispatch();
  const { shopInfo, products, reviews, orders, discounts, analytics } =
    bindActionCreators(titlesAction, dispatch);

  const title = useSelector((state: State) => state.title);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const shopInfoClick = () => {
    shopInfo();
    history.push("/shopinfo");
  };

  const productsClick = () => {
    products();
    history.push("/products");
  };

  const reviewsClick = () => {
    reviews();
  };

  const ordersClick = () => {
    orders();
    history.push("/orders");
  };
  const discountsClick = () => {
    discounts();
    history.push("/discounts");
  };

  const analyticsClick = () => {
    analytics();
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const dropdownMenu = (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        "aria-labelledby": "basic-button",
      }}
    >
      <MenuItem>{user?.name}</MenuItem>
      <Divider />
      <MenuItem onClick={() => logout()}>Logout</MenuItem>
    </Menu>
  );

  const drawer = (
    <div>
      <h1>eShop</h1>
      <Divider />
      <List>
        <Tooltip title="Display your shop information" arrow placement="right">
          <ListItem button onClick={() => shopInfoClick()}>
            <ListItemIcon>
              <StorefrontIcon />
            </ListItemIcon>
            <ListItemText primary="Shop Info" />
          </ListItem>
        </Tooltip>
        <Tooltip title="List of your products" arrow placement="right">
          <ListItem button onClick={() => productsClick()}>
            <ListItemIcon>
              <ShoppingBasketIcon />
            </ListItemIcon>
            <ListItemText primary="Products" />
          </ListItem>
        </Tooltip>
        <Tooltip title="List of your orders" arrow placement="right">
          <ListItem button onClick={() => ordersClick()}>
            <ListItemIcon>
              <LocalShippingIcon />
            </ListItemIcon>
            <ListItemText primary="Orders" />
          </ListItem>
        </Tooltip>
        <Tooltip title="Discounts voucher" arrow placement="right">
          <ListItem button onClick={() => discountsClick()}>
            <ListItemIcon>
              <MoneyIcon />
            </ListItemIcon>
            <ListItemText primary="Discounts" />
          </ListItem>
        </Tooltip>
        <Tooltip title="Shop Reviews" arrow placement="right">
          <ListItem button onClick={() => reviewsClick()}>
            <ListItemIcon>
              <RateReviewIcon />
            </ListItemIcon>
            <ListItemText primary="Reviews" />
          </ListItem>
        </Tooltip>
        <Tooltip title="Show me the money!" arrow placement="right">
          <ListItem button onClick={() => analyticsClick()}>
            <ListItemIcon>
              <AnalyticsIcon />
            </ListItemIcon>
            <ListItemText primary="Analytics" />
          </ListItem>
        </Tooltip>
      </List>
    </div>
  );

  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>

            <Tooltip title="Menu" arrow>
              <IconButton
                color="inherit"
                sx={{ mr: 2 }}
                onClick={(e) => handleClick(e)}
              >
                <AccountCircle />
              </IconButton>
            </Tooltip>
            {dropdownMenu}

            <Typography variant="h6" noWrap component="div">
              {title}
            </Typography>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          {props.children}
        </Box>
      </Box>
    </div>
  );
};

export default withRouter(Sidenav);
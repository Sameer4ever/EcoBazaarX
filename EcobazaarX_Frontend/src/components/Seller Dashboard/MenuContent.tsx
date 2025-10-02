import * as React from "react";
import { NavLink } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

// Icons
import HomeIcon from "@mui/icons-material/Home";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AnalyticsIcon from "@mui/icons-material/Analytics";

const menuSections = [
  {
    heading: "Dashboard",
    items: [{ text: "Home", icon: <HomeIcon />, route: "/seller-dashboard" }],
  },
  {
    heading: "Product Management",
    items: [
      { text: "Add Product", icon: <AssignmentIcon />, route: "/seller-dashboard/add-product" },
      { text: "Manage Products", icon: <AssignmentIcon />, route: "/seller-dashboard/manage-products" },
      { text: "Inventory", icon: <AssignmentIcon />, route: "/seller-dashboard/inventory" },
    ],
  },
  {
    heading: "Orders & Sales",
    items: [
      { text: "Incoming Orders", icon: <ShoppingCartIcon />, route: "/seller-dashboard/orders" },
      { text: "Order History", icon: <ShoppingCartIcon />, route: "/seller-dashboard/orderHistory" },
    ],
  },
  {
    heading: "Seller Analytics",
    items: [
      { text: "Top-Selling Products", icon: <AnalyticsIcon />, route: "/seller-dashboard/analytics" },
      { text: "Carbon Impact Tracking", icon: <AnalyticsIcon />, route: "/seller-dashboard/carbon-report" },
      // { text: "Customer Feedback", icon: <AnalyticsIcon />, route: "/seller-dashboard/feedback" },
    ],
  },
];

export default function MenuContent() {
  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: "space-between" }}>
      {menuSections.map((section, sIndex) => (
        <React.Fragment key={sIndex}>
          <List dense>
            <ListItem sx={{ py: 0.5, px: 2 }}>
              <ListItemText
                primary={section.heading}
                primaryTypographyProps={{
                  variant: "subtitle2",
                  fontWeight: "bold",
                  color: "text.secondary",
                }}
              />
            </ListItem>
            {section.items.map((item, index) => (
              <ListItem key={index} disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  component={NavLink}
                  to={item.route}
                  // ✅ prevents dashboard link staying active on subroutes
                  end={item.route === "/seller-dashboard"}
                  sx={{
                    "&.active": {
                      bgcolor: "primary.main",
                      color: "white",
                      "& .MuiListItemIcon-root": { color: "white" },
                    },
                  }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{
                      fontSize: "0.9rem",
                      fontWeight: "500",
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          {sIndex < menuSections.length - 1 && <Divider sx={{ my: 1 }} />}
        </React.Fragment>
      ))}
    </Stack>
  );
}

import * as React from "react";
import { Outlet } from "react-router-dom"; // The Outlet is crucial for routing
import { alpha } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";

// --- Using your original component imports ---
import AppNavbar from "@/components/AdminDashboard/AppNavbar";
import SideMenu from "@/components/AdminDashboard/SideMenu";
import AppTheme from "@/theme/AppTheme";
import {
  chartsCustomizations,
  dataGridCustomizations,
  datePickersCustomizations,
  treeViewCustomizations,
} from "@/customizations";

const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...treeViewCustomizations,
};

export default function Dashboard(props: { disableCustomTheme?: boolean }) {
  return (
    <AppTheme {...props} themeComponents={xThemeComponents}>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: "flex", height: '100vh' }}>
        <SideMenu />
        <Box
          component="main"
          sx={(theme) => ({
            flexGrow: 1,
            backgroundColor: alpha(theme.palette.background.default, 1),
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden' // Prevents the main container from having its own scrollbar
          })}
        >
          <AppNavbar />
          <Box
            sx={{
              flexGrow: 1,           // This content area takes all the remaining vertical space
              overflow: "auto",      // This area becomes scrollable if the content is too long
              p: 3,                  // We apply consistent padding here for all pages
            }}
          >
            {/* The Outlet will render AdminHomePage, SellersPage, etc. here */}
            <Outlet />
          </Box>
        </Box>
      </Box>
    </AppTheme>
  );
}


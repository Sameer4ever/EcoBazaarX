import { Outlet } from "react-router-dom";
import { Box, Stack } from "@mui/material";
import AppNavbar from "../components/Seller Dashboard/AppNavbar";
import SideMenu from "../components/Seller Dashboard/SideMenu";
import AppTheme from "../theme/AppTheme";
import PendingApprovalPage from '../pages/Seller/PendingApprovalPage';

import {
  chartsCustomizations,
  dataGridCustomizations,
  datePickersCustomizations,
  treeViewCustomizations,
} from "../customizations";

const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...treeViewCustomizations,
};

export default function DashboardLayout() {
  const userStatus = localStorage.getItem('userStatus');

  if (userStatus !== 'ACTIVE') {
    return <PendingApprovalPage />;
  }
  return (
    <AppTheme themeComponents={xThemeComponents}>
      <Box sx={{ display: "flex", height: "100vh" }}>
        <SideMenu />
        <AppNavbar />
        <Box
          component="main"
          sx={(theme) => ({
            flexGrow: 1,
            backgroundColor: theme.vars
              ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
              : theme.palette.background.default,
            overflow: "auto",
          })}
        >
          {/* The fix is in this Stack component */}
          <Stack
            spacing={2}
            sx={{
              // REMOVED `alignItems: "center"` and `mx: 3` to allow full-width content
              pb: 5,
              mt: { xs: 8, md: 0 },
            }}
          >
            {/* The Outlet will now render pages that can be end-to-end */}
            <Outlet />
          </Stack>
        </Box>
      </Box>
    </AppTheme>
  );
}


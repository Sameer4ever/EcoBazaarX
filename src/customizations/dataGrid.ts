import { Theme } from '@mui/material/styles';

export const dataGridCustomizations = (theme: Theme) => ({
  // Example: override default MUI DataGrid styles
  MuiDataGrid: {
    styleOverrides: {
      root: {
        border: `1px solid ${theme.palette.divider}`,
      },
      columnHeaders: {
        backgroundColor: theme.palette.grey[100],
        fontWeight: 'bold',
      },
      cell: {
        borderBottom: `1px solid ${theme.palette.divider}`,
      },
    },
  },
});

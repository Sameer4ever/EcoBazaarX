import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';

// Icons
import HomeIcon from '@mui/icons-material/Home';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AnalyticsIcon from '@mui/icons-material/Analytics';

import AddProductModal from './AddProductModal';  // ✅ Import modal

const menuSections = [
  {
    heading: 'Dashboard',
    items: [{ text: 'Home', icon: <HomeIcon /> }],
  },
  {
    heading: 'Product Management',
    items: [
      { text: 'Add Product', icon: <AssignmentIcon /> },
      { text: 'Manage Products', icon: <AssignmentIcon /> },
      { text: 'Inventory', icon: <AssignmentIcon /> },
    ],
  },
  {
    heading: 'Orders & Sales',
    items: [
      { text: 'Incoming Orders', icon: <ShoppingCartIcon /> },
      { text: 'Returns & Refunds', icon: <ShoppingCartIcon /> },
    ],
  },
  {
    heading: 'Seller Analytics',
    items: [
      { text: 'Top-Selling Products', icon: <AnalyticsIcon /> },
      { text: 'Carbon Impact Tracking', icon: <AnalyticsIcon /> },
      { text: 'Customer Feedback', icon: <AnalyticsIcon /> },
    ],
  },
];

export default function MenuContent() {
  const [openModal, setOpenModal] = React.useState(false);

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      {menuSections.map((section, sIndex) => (
        <React.Fragment key={sIndex}>
          <List dense>
            <ListItem sx={{ py: 0.5, px: 2 }}>
              <ListItemText
                primary={section.heading}
                primaryTypographyProps={{
                  variant: 'subtitle2',
                  fontWeight: 'bold',
                  color: 'text.secondary',
                }}
              />
            </ListItem>
            {section.items.map((item, index) => (
              <ListItem key={index} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  onClick={() => {
                    if (item.text === "Add Product") {
                      setOpenModal(true);
                    }
                  }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          {sIndex < menuSections.length - 1 && <Divider sx={{ my: 1 }} />}
        </React.Fragment>
      ))}

      {/* ✅ Modal */}
      <AddProductModal open={openModal} onClose={() => setOpenModal(false)} />

    </Stack>
  );
}

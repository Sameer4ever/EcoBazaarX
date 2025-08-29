import * as React from "react";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Address } from "./AddressForm";
import { Payment } from "./PaymentForm";

interface ReviewProps {
  address: Address;
  product: { name: string; price: number; desc?: string };
  totalPrice: string;
  payment: Payment;
}

export default function Review({
  address,
  product,
  totalPrice,
  payment,
}: ReviewProps) {
  return (
    <Stack spacing={2}>
      {/* Product Summary */}
      <List disablePadding>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Product" secondary={product.name} />
          <Typography variant="body2">₹ {product.price}</Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Shipping" secondary="Plus taxes" />
          <Typography variant="body2">₹ 0.0</Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {totalPrice}
          </Typography>
        </ListItem>
      </List>

      <Divider />

      {/* Shipment + Payment */}
      <Stack
        direction="column"
        divider={<Divider flexItem />}
        spacing={2}
        sx={{ my: 2 }}
      >
        {/* Shipping Details */}
        <div>
          <Typography variant="subtitle2" gutterBottom>
            Shipment details
          </Typography>
          <Typography gutterBottom>
            {address.firstName} {address.lastName}
          </Typography>
          <Typography gutterBottom sx={{ color: "text.secondary" }}>
            {address.address1}
            {address.address2 ? `, ${address.address2}` : ""}
          </Typography>
          <Typography gutterBottom sx={{ color: "text.secondary" }}>
            {address.city}, {address.state} {address.zip}, {address.country}
          </Typography>
        </div>

        {/* Payment Details */}
        <div>
          <Typography variant="subtitle2" gutterBottom>
            Payment details
          </Typography>
          <Grid container>
            {payment.type === "creditCard" ? (
              <>
                <Stack direction="row" spacing={1} sx={{ width: "100%", mb: 1 }}>
                  <Typography variant="body1" sx={{ color: "text.secondary" }}>
                    Card holder:
                  </Typography>
                  <Typography variant="body2">{payment.name}</Typography>
                </Stack>
                <Stack direction="row" spacing={1} sx={{ width: "100%", mb: 1 }}>
                  <Typography variant="body1" sx={{ color: "text.secondary" }}>
                    Card number:
                  </Typography>
                  <Typography variant="body2">
                    **** **** **** {payment.cardNumber?.slice(-4)}
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1} sx={{ width: "100%", mb: 1 }}>
                  <Typography variant="body1" sx={{ color: "text.secondary" }}>
                    Expiry date:
                  </Typography>
                  <Typography variant="body2">
                    {payment.expirationDate}
                  </Typography>
                </Stack>
              </>
            ) : (
              <Stack direction="row" spacing={1} sx={{ width: "100%", mb: 1 }}>
                <Typography variant="body1" sx={{ color: "text.secondary" }}>
                  UPI ID:
                </Typography>
                <Typography variant="body2">{payment.upiId}</Typography>
              </Stack>
            )}
          </Grid>
        </div>
      </Stack>
    </Stack>
  );
}

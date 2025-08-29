import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import AddressForm, { Address } from "../components/CheckOut/AddressForm";
import Info from "../components/CheckOut/Info";
import InfoMobile from "../components/CheckOut/InfoMobile";
import PaymentForm from "../components/CheckOut/PaymentForm";
import Review from "../components/CheckOut/Review";
import AppTheme from "../theme/AppTheme";
import ColorModeIconDropdown from "../theme/ColorModeIconDropdown";
import { Link, useLocation } from "react-router-dom";

const steps = ["Shipping address", "Payment details", "Review your order"];

export default function Checkout(props: { disableCustomTheme?: boolean }) {
  const [activeStep, setActiveStep] = React.useState(0);
  const location = useLocation();
  const { product } = location.state || {}; // ✅ product passed from product page

  // ✅ Manage address state here
  const [address, setAddress] = React.useState<Address>({
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });
   // ✅ Initialize payment with default type
  const [payment, setPayment] = React.useState<Payment>({
    type: 'creditCard',
    cardNumber: '',
    cvv: '',
    expirationDate: '',
    name: '',
    upiId: '',
  });

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  if (!product) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h6">No product selected</Typography>
        <Button component={Link} to="/" variant="contained">
          Back to Homepage
        </Button>
      </Box>
    );
  }

  const totalPrice = `₹ ${product.price}`;

  // ✅ step content function
  function getStepContent(step: number) {
    switch (step) {
      case 0:
        return <AddressForm address={address} onChange={setAddress} />;
      case 1:
         return <PaymentForm payment={payment} onChange={setPayment} />;
      case 2:
  return (
    <Review
      address={address}
      product={product}
      totalPrice={totalPrice}
      payment={payment}   // <-- add this
    />
  );
      default:
        throw new Error("Unknown step");
    }
  }

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <Box sx={{ position: "fixed", top: "1rem", right: "1rem" }}>
        <ColorModeIconDropdown />
      </Box>

      <Grid
        container
        sx={{
          height: {
            xs: "100%",
            sm: "calc(100dvh - var(--template-frame-height, 0px))",
          },
          mt: { xs: 4, sm: 0 },
        }}
      >
        {/* Left side info */}
        <Grid
          size={{ xs: 12, sm: 5, lg: 4 }}
          sx={{
            display: { xs: "none", md: "flex" },
            flexDirection: "column",
            backgroundColor: "background.paper",
            borderRight: { sm: "none", md: "1px solid" },
            borderColor: { sm: "none", md: "divider" },
            alignItems: "start",
            pt: 16,
            px: 10,
            gap: 4,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
              width: "100%",
              maxWidth: 500,
            }}
          >
            <Info totalPrice={totalPrice} product={product} />
          </Box>
        </Grid>

        {/* Right side form */}
        <Grid
          size={{ sm: 12, md: 7, lg: 8 }}
          sx={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "100%",
            width: "100%",
            backgroundColor: { xs: "transparent", sm: "background.default" },
            alignItems: "start",
            pt: { xs: 0, sm: 16 },
            px: { xs: 2, sm: 10 },
            gap: { xs: 4, md: 8 },
          }}
        >
          {/* Stepper desktop */}
          <Box
            sx={{
              display: "flex",
              justifyContent: { sm: "space-between", md: "flex-end" },
              alignItems: "center",
              width: "100%",
              maxWidth: { sm: "100%", md: 600 },
            }}
          >
            <Stepper
              id="desktop-stepper"
              activeStep={activeStep}
              sx={{ width: "100%", height: 40 }}
            >
              {steps.map((label) => (
                <Step
                  sx={{ ":first-child": { pl: 0 }, ":last-child": { pr: 0 } }}
                  key={label}
                >
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>

          {/* Mobile Info */}
          <Card sx={{ display: { xs: "flex", md: "none" }, width: "100%" }}>
            <CardContent
              sx={{
                display: "flex",
                width: "100%",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div>
                <Typography variant="subtitle2" gutterBottom>
                  Selected product
                </Typography>
                <Typography variant="body1">{totalPrice}</Typography>
              </div>
              <InfoMobile totalPrice={totalPrice} product={product} />
            </CardContent>
          </Card>

          {/* Step content */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
              width: "100%",
              maxWidth: { sm: "100%", md: 600 },
              maxHeight: "720px",
              gap: { xs: 5, md: "none" },
            }}
          >
            {activeStep === steps.length ? (
              <Stack spacing={2} useFlexGap>
                <Typography variant="h1">📦</Typography>
                <Typography variant="h5">Thank you for your order!</Typography>
                <Typography variant="body1" sx={{ color: "text.secondary" }}>
                  Your order number is <strong>#140396</strong>. We’ve emailed
                  your order confirmation and will update you once it’s shipped.
                </Typography>
                <Button
                  component={Link}
                  to="/"
                  variant="contained"
                  sx={{ alignSelf: "start", width: { xs: "100%", sm: "auto" } }}
                >
                  Back to Homepage !
                </Button>
              </Stack>
            ) : (
              <>
                {getStepContent(activeStep)}

                {/* Next / Previous Buttons */}
                <Box
                  sx={[
                    {
                      display: "flex",
                      flexDirection: { xs: "column-reverse", sm: "row" },
                      alignItems: "end",
                      flexGrow: 1,
                      gap: 1,
                      pb: { xs: 12, sm: 0 },
                      mt: { xs: 2, sm: 0 },
                      mb: "60px",
                    },
                    activeStep !== 0
                      ? { justifyContent: "space-between" }
                      : { justifyContent: "flex-end" },
                  ]}
                >
                  {activeStep !== 0 && (
                    <>
                      <Button
                        startIcon={<ChevronLeftRoundedIcon />}
                        onClick={handleBack}
                        variant="text"
                        sx={{ display: { xs: "none", sm: "flex" } }}
                      >
                        Previous
                      </Button>
                      <Button
                        startIcon={<ChevronLeftRoundedIcon />}
                        onClick={handleBack}
                        variant="outlined"
                        fullWidth
                        sx={{ display: { xs: "flex", sm: "none" } }}
                      >
                        Previous
                      </Button>
                    </>
                  )}
                  <Button
                    variant="contained"
                    endIcon={<ChevronRightRoundedIcon />}
                    onClick={handleNext}
                    sx={{ width: { xs: "100%", sm: "fit-content" } }}
                  >
                    {activeStep === steps.length - 1
                      ? "Place order"
                      : "Next"}
                  </Button>
                </Box>
              </>
            )}
          </Box>
        </Grid>
      </Grid>
    </AppTheme>
  );
}

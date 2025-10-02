import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { styled } from "@mui/material/styles";
import AppTheme from "@/theme/AppTheme";
// import ColorModeSelect from "@/theme/ColorModeSelect";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import API from "@/services/api"; // ✅ axios wrapper

// ---------- STYLES ----------
const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  minHeight: "100vh",
  padding: theme.spacing(2),
  justifyContent: "center",
  alignItems: "center",
  overflowY: "auto",
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles("dark", {
      backgroundImage:
        "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
  },
}));

// ---------- COMPONENT ----------
export default function SignUp(props: { disableCustomTheme?: boolean }) {
  const navigate = useNavigate();

  // Validation states
  const [nameError, setNameError] = React.useState("");
  const [emailError, setEmailError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const [confirmPasswordError, setConfirmPasswordError] = React.useState("");
  const [roleError, setRoleError] = React.useState("");
  const [gstError, setGstError] = React.useState("");
  const [businessNameError, setBusinessNameError] = React.useState("");

  // Role + password visibility
  const [userRole, setUserRole] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  // Loader
  const [loading, setLoading] = React.useState(false);

  const handleRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserRole((event.target as HTMLInputElement).value);
    setRoleError("");
    setGstError("");
    setBusinessNameError("");
  };

  // ---------- VALIDATION ----------
  const validateInputs = () => {
    const name = (document.getElementById("name") as HTMLInputElement)?.value.trim();
    const email = (document.getElementById("email") as HTMLInputElement)?.value;
    const password = (document.getElementById("password") as HTMLInputElement)?.value;
    const confirmPassword = (document.getElementById("confirmPassword") as HTMLInputElement)?.value;
    const gst = (document.getElementById("gst") as HTMLInputElement)?.value.trim();
    const businessName = (document.getElementById("businessName") as HTMLInputElement)?.value.trim();

    let isValid = true;

    if (!name) {
      setNameError("Name is required.");
      isValid = false;
    } else setNameError("");

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Please enter a valid email address.");
      isValid = false;
    } else setEmailError("");

    if (!password || password.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
      isValid = false;
    } else setPasswordError("");

    if (confirmPassword !== password) {
      setConfirmPasswordError("Passwords do not match.");
      isValid = false;
    } else setConfirmPasswordError("");

    if (!userRole) {
      setRoleError("Please select a role.");
      isValid = false;
    }

    if (userRole === "SELLER") {
      if (!gst) {
        setGstError("GST number is required for sellers.");
        isValid = false;
      }
      if (!businessName) {
        setBusinessNameError("Business name is required for sellers.");
        isValid = false;
      }
    }

    return isValid;
  };

  // ---------- SUBMIT ----------
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  if (!validateInputs()) return;

  const data = new FormData(event.currentTarget);

  let url = "";
  let payload: any = {};

  if (userRole === "USER") {
    // 👤 Buyer signup
    url = "/auth/signup/user";
    payload = {
      username: data.get("name"),
      email: data.get("email"),
      password: data.get("password"),
    };
  } else if (userRole === "SELLER") {
    // 🛍️ Seller signup
    url = "/auth/signup/seller";
    payload = {
      username: data.get("name"),
      email: data.get("email"),
      password: data.get("password"),
      businessName: data.get("businessName"),
      gstNumber: data.get("gst"),
    };
  }

  try {
    setLoading(true);
    await API.post(url, payload);  // ✅ dynamic endpoint
    alert("Signup successful! Please login.");
    navigate("/signin");
  } catch (err: any) {
    alert(err.response?.data?.message || "Signup failed");
  } finally {
    setLoading(false);
  }
};


  // ---------- RENDER ----------
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      {/* <ColorModeSelect sx={{ position: "fixed", top: "1rem", right: "1rem" }} /> */}
      <SignUpContainer>
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            Sign up
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            {/* Username */}
            <FormControl>
              <FormLabel htmlFor="name">Username</FormLabel>
              <TextField
                id="name"
                name="name"
                placeholder="Jon Snow"
                required
                fullWidth
                error={!!nameError}
                helperText={nameError}
              />
            </FormControl>

            {/* Email */}
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                id="email"
                name="email"
                placeholder="your@email.com"
                required
                fullWidth
                error={!!emailError}
                helperText={emailError}
              />
            </FormControl>

            {/* Password */}
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                id="password"
                name="password"
                placeholder="••••••"
                type={showPassword ? "text" : "password"}
                required
                fullWidth
                error={!!passwordError}
                helperText={passwordError}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>

            {/* Confirm Password */}
            <FormControl>
              <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
              <TextField
                id="confirmPassword"
                name="confirmPassword"
                placeholder="••••••"
                type={showConfirmPassword ? "text" : "password"}
                required
                fullWidth
                error={!!confirmPasswordError}
                helperText={confirmPasswordError}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        edge="end"
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>

            {/* Role */}
            <FormControl error={!!roleError}>
              <FormLabel>I want to sign up as a</FormLabel>
              <RadioGroup
                row
                value={userRole}
                onChange={handleRoleChange}
                sx={{ justifyContent: "space-between", mt: 1 }}
              >
                <FormControlLabel
                  value="USER"
                  control={<Radio />}
                  label="Buyer"
                />
                <FormControlLabel
                  value="SELLER"
                  control={<Radio />}
                  label="Seller"
                />
              </RadioGroup>
              {roleError && <FormHelperText>{roleError}</FormHelperText>}
            </FormControl>

            {/* Seller-only fields */}
            {userRole === "SELLER" && (
              <>
                <FormControl>
                  <FormLabel htmlFor="gst">GST Number</FormLabel>
                  <TextField
                    id="gst"
                    name="gst"
                    placeholder="Enter GST Number"
                    required
                    fullWidth
                    error={!!gstError}
                    helperText={gstError}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="businessName">Business Name</FormLabel>
                  <TextField
                    id="businessName"
                    name="businessName"
                    placeholder="Enter Business Name"
                    required
                    fullWidth
                    error={!!businessNameError}
                    helperText={businessNameError}
                  />
                </FormControl>
              </>
            )}

            {/* Submit */}
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
              {loading ? "Signing up..." : "Sign up"}
            </Button>
          </Box>

          <Divider>
            <Typography sx={{ color: "text.secondary" }}>or</Typography>
          </Divider>

          <Typography sx={{ textAlign: "center" }}>
            Already have an account?{" "}
            <Link component={RouterLink} to="/signin">
              Sign in
            </Link>
          </Typography>
        </Card>
      </SignUpContainer>
    </AppTheme>
  );
}

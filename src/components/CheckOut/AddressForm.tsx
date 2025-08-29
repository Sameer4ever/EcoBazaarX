import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import OutlinedInput from "@mui/material/OutlinedInput";
import { styled } from "@mui/material/styles";

const FormGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
}));

// Address type stays same
export interface Address {
  firstName: string;
  lastName: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

interface AddressFormProps {
  address: Address;
  onChange: (updatedAddress: Address) => void;
}

export default function AddressForm({ address, onChange }: AddressFormProps) {
  const handleChange = (field: keyof Address, value: string) => {
    onChange({ ...address, [field]: value });
  };

  return (
    <Grid container spacing={3}>
      <FormGrid item xs={12} md={6}>
        <FormLabel htmlFor="first-name" required>
          First name
        </FormLabel>
        <OutlinedInput
          id="first-name"
          value={address.firstName}
          onChange={(e) => handleChange("firstName", e.target.value)}
          placeholder="John"
          required
          size="small"
        />
      </FormGrid>

      <FormGrid item xs={12} md={6}>
        <FormLabel htmlFor="last-name" required>
          Last name
        </FormLabel>
        <OutlinedInput
          id="last-name"
          value={address.lastName}
          onChange={(e) => handleChange("lastName", e.target.value)}
          placeholder="Snow"
          required
          size="small"
        />
      </FormGrid>

      <FormGrid item xs={12}>
        <FormLabel htmlFor="address1" required>
          Address line 1
        </FormLabel>
        <OutlinedInput
          id="address1"
          value={address.address1}
          onChange={(e) => handleChange("address1", e.target.value)}
          placeholder="Street name and number"
          required
          size="small"
        />
      </FormGrid>

      <FormGrid item xs={12}>
        <FormLabel htmlFor="address2">Address line 2</FormLabel>
        <OutlinedInput
          id="address2"
          value={address.address2 || ""}
          onChange={(e) => handleChange("address2", e.target.value)}
          placeholder="Apartment, suite, unit, etc."
          size="small"
        />
      </FormGrid>

      <FormGrid item xs={6}>
        <FormLabel htmlFor="city" required>
          City
        </FormLabel>
        <OutlinedInput
          id="city"
          value={address.city}
          onChange={(e) => handleChange("city", e.target.value)}
          placeholder="New Delhi"
          required
          size="small"
        />
      </FormGrid>

      <FormGrid item xs={6}>
        <FormLabel htmlFor="state" required>
          State
        </FormLabel>
        <OutlinedInput
          id="state"
          value={address.state}
          onChange={(e) => handleChange("state", e.target.value)}
          placeholder="Delhi"
          required
          size="small"
        />
      </FormGrid>

      <FormGrid item xs={6}>
        <FormLabel htmlFor="zip" required>
          Zip / Postal code
        </FormLabel>
        <OutlinedInput
          id="zip"
          value={address.zip}
          onChange={(e) => handleChange("zip", e.target.value)}
          placeholder="12345"
          required
          size="small"
        />
      </FormGrid>

      <FormGrid item xs={6}>
        <FormLabel htmlFor="country" required>
          Country
        </FormLabel>
        <OutlinedInput
          id="country"
          value={address.country}
          onChange={(e) => handleChange("country", e.target.value)}
          placeholder="India"
          required
          size="small"
        />
      </FormGrid>

      <FormGrid item xs={12}>
        <FormControlLabel
          control={<Checkbox name="saveAddress" />}
          label="Use this address for payment details"
        />
      </FormGrid>
    </Grid>
  );
}

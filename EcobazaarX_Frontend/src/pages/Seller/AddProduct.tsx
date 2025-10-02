import React, { useState } from "react";
import {
  TextField,
  Button,
  Stack,
  Avatar,
  Snackbar,
  Alert,
  Typography,
  Box,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  SelectChangeEvent,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CalculatorModal from "@/pages/Seller/CalculatorModal";

export default function AddProductPage() {
  const [images, setImages] = useState<File[]>([]);
  const [preview, setPreview] = useState<string[]>([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showCalculator, setShowCalculator] = useState(false);

  const [formData, setFormData] = useState({
    productName: "",
    price: "",
    stock: "",
    carbonEmission: "",
    description: "",
    category: "",
    isZeroWasteProduct: false,
  });

  const categories = [
    "Apparel & Accessories",
    "Home & Garden",
    "Beauty & Personal Care",
    "Electronics",
    "Books & Media",
    "Groceries",
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (e: SelectChangeEvent<string>) => {
    setFormData((prev) => ({ ...prev, category: e.target.value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, isZeroWasteProduct: e.target.checked }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...files]);
    setPreview((prev) => [...prev, ...newPreviews]);
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreview((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!images.length) {
      setError("Please upload at least one product image.");
      return;
    }

    try {
      const data = new FormData();
      data.append("name", formData.productName);
      data.append("price", formData.price);
      data.append("stock", formData.stock);
      data.append("carbonEmission", formData.carbonEmission);
      data.append("description", formData.description);
      data.append("category", formData.category);
      data.append("isZeroWasteProduct", String(formData.isZeroWasteProduct));
      data.append("image", images[0]);

      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:8081/seller/product/add", {
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${token || ""}`,
        },
      });

      const responseText = await res.text();
      if (!res.ok) throw new Error(responseText || "Failed to add product");

      setSuccess(true);
      setFormData({
        productName: "",
        price: "",
        stock: "",
        carbonEmission: "",
        description: "",
        category: "",
        isZeroWasteProduct: false,
      });
      setImages([]);
      setPreview([]);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
      console.error("Error:", err);
    }
  };

  const handleFootprintCalculated = (footprint: number) => {
    setFormData((prev) => ({ ...prev, carbonEmission: String(footprint) }));
  };

  return (
    <Box p={4} width="100%" bgcolor="background.paper">
      <Typography variant="h5" mb={3} fontWeight={600}>
        Add New Product
      </Typography>

      <form onSubmit={handleSubmit}>
        <Stack spacing={3} maxWidth="600px" textAlign="left">
          {/* Product Name */}
          <Box display="flex" alignItems="center">
            <Typography sx={{ minWidth: "150px" }}>Name *</Typography>
            <TextField
              name="productName"
              type="text"
              value={formData.productName}
              onChange={handleInputChange}
              fullWidth
              required
              sx={{ ml: 2 }}
            />
          </Box>

          {/* Price */}
          <Box display="flex" alignItems="center">
            <Typography sx={{ minWidth: "150px" }}>Price *</Typography>
            <TextField
              name="price"
              type="number"
              value={formData.price}
              onChange={handleInputChange}
              fullWidth
              required
              sx={{ ml: 2 }}
              inputProps={{ step: "0.01" }}
            />
          </Box>

          {/* Stock */}
          <Box display="flex" alignItems="center">
            <Typography sx={{ minWidth: "150px" }}>Stock *</Typography>
            <TextField
              name="stock"
              type="number"
              value={formData.stock}
              onChange={handleInputChange}
              fullWidth
              required
              sx={{ ml: 2 }}
            />
          </Box>

          {/* Carbon Emission with Calculator */}
          <Box display="flex" alignItems="center">
            <Typography sx={{ minWidth: "150px" }}>Carbon Emission (kg CO₂)</Typography>
            <TextField
              name="carbonEmission"
              type="number"
              value={formData.carbonEmission}
              onChange={handleInputChange}
              fullWidth
              required
              sx={{ ml: 2 }}
              InputProps={{ readOnly: true }}
            />
            <Button
              variant="outlined"
              onClick={() => setShowCalculator(true)}
              sx={{ ml: 2, whiteSpace: "nowrap" }}
            >
              Calculate
            </Button>
          </Box>

          {/* Description */}
          <Box display="flex" alignItems="center">
            <Typography sx={{ minWidth: "150px" }}>Description</Typography>
            <TextField
              name="description"
              type="text"
              value={formData.description}
              onChange={handleInputChange}
              fullWidth
              multiline
              rows={1}
              sx={{ ml: 2 }}
            />
          </Box>

          {/* Category */}
          <Box display="flex" alignItems="center">
            <Typography sx={{ minWidth: "150px" }}>Category *</Typography>
            <FormControl fullWidth required sx={{ ml: 2 }}>
              <InputLabel id="category-select-label">Select Category</InputLabel>
              <Select
                labelId="category-select-label"
                name="category"
                value={formData.category}
                label="Select Category"
                onChange={handleCategoryChange}
              >
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* Zero Waste Checkbox */}
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.isZeroWasteProduct}
                onChange={handleCheckboxChange}
                name="isZeroWasteProduct"
              />
            }
            label="Zero Waste Product ?"
            sx={{ ml: "150px", pt: 1 }}
          />

          {/* Image Upload */}
          <Box display="flex" alignItems="center" pt={1}>
            <Typography sx={{ minWidth: "150px" }}>Product Image *</Typography>
            <Button variant="outlined" component="label" sx={{ ml: 2 }}>
              Upload Image
              <input type="file" hidden accept="image/*" onChange={handleImageChange} />
            </Button>
          </Box>

          {/* Image Preview */}
          {preview.length > 0 && (
            <Box display="flex" gap={2} flexWrap="wrap" ml="152px">
              {preview.map((src, index) => (
                <Box key={index} position="relative">
                  <Avatar
                    src={src}
                    variant="rounded"
                    sx={{ width: 120, height: 120, border: "1px solid", borderColor: "grey.300" }}
                  />
                  <IconButton
                    size="small"
                    onClick={() => handleRemoveImage(index)}
                    sx={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      bgcolor: "white",
                      "&:hover": { bgcolor: "grey.200" },
                    }}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </Box>
              ))}
            </Box>
          )}

          <Button type="submit" variant="contained" sx={{ mt: 2, ml: "152px", width: "fit-content" }}>
            Add Product
          </Button>
        </Stack>
      </form>

      {/* Calculator Modal */}
      {showCalculator && (
        <CalculatorModal
          onClose={() => setShowCalculator(false)}
          onCalculate={handleFootprintCalculated}
        />
      )}

      {/* Snackbars */}
      <Snackbar
        open={success}
        autoHideDuration={4000}
        onClose={() => setSuccess(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={() => setSuccess(false)} severity="success" sx={{ width: "100%" }}>
          Product Added Successfully!
        </Alert>
      </Snackbar>

      <Snackbar
        open={!!error}
        autoHideDuration={4000}
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={() => setError(null)} severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
}

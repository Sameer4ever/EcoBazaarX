import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
  Avatar,
  Snackbar,
  Alert,
} from "@mui/material";

export default function AddProductModal({ open, onClose }) {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Ye data tu backend ko bhej sakta hai
    const productData = {
      name: e.target.productName.value,
      price: e.target.price.value,
      stock: e.target.stock.value,
      description: e.target.description.value,
      image: image,
    };

    console.log("Product Added ✅", productData);

    setSuccess(true); 
    setImage(null);
    setPreview(null);
    onClose();
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Product</DialogTitle>
        <DialogContent>
          <form id="add-product-form" onSubmit={handleSubmit}>
            <Stack spacing={2} sx={{ mt: 2 }}>
              <TextField
                name="productName"
                placeholder="Enter Product Name"
                fullWidth
                required
              />
              <TextField
                name="price"
                placeholder="Enter Price"
                type="number"
                fullWidth
                required
              />
              <TextField
                name="stock"
                placeholder="Enter Stock Quantity"
                type="number"
                fullWidth
                required
              />
              <TextField
                name="description"
                placeholder="Enter Description"
                multiline
                
                fullWidth
              />

              {/* Image Upload */}
              <Button variant="outlined" component="label">
                Upload Product Image
                <input type="file" hidden accept="image/*" onChange={handleImageChange} />
              </Button>

              {/* Image Preview */}
              {preview && (
                <Avatar
                  src={preview}
                  alt="Preview"
                  variant="rounded"
                  sx={{ width: 100, height: 100 }}
                />
              )}
            </Stack>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">
            Cancel
          </Button>
          <Button type="submit" form="add-product-form" variant="contained">
            Add Product
          </Button>
        </DialogActions>
      </Dialog>

      {/* ✅ Snackbar for success message */}
      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={() => setSuccess(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Product Added Successfully ✅
        </Alert>
      </Snackbar>
    </>
  );
}

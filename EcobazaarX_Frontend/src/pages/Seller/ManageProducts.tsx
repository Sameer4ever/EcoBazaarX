import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Snackbar,
  Alert,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";

export default function ManageProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [success, setSuccess] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("http://localhost:8081/seller/product/my-products", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  // ✅ FIX: use toggle-active endpoint instead of delete
  const handleToggleActive = async (product: any) => {
    try {
      const res = await fetch(
        `http://localhost:8081/seller/product/toggle-active/${product.productId}`,
        {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to toggle product status");
      }

      const updated = await res.json();
      setProducts((prev) =>
        prev.map((p) => (p.productId === updated.productId ? updated : p))
      );

      setSuccess(
        updated.active ? "Product activated ✅" : "Product deactivated ✅"
      );
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleEditClick = (product: any) => {
    setSelectedProduct({ ...product });
    setSelectedImage(null);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setSelectedProduct(null);
    setSelectedImage(null);
  };

  const handleDialogSave = async () => {
    if (!selectedProduct) return;
    try {
      const formData = new FormData();
      formData.append("name", selectedProduct.name);
      formData.append("price", selectedProduct.price.toString());
      formData.append("stock", selectedProduct.stock.toString());
      formData.append("category", selectedProduct.category);
      formData.append("description", selectedProduct.description);
      if (selectedImage) formData.append("image", selectedImage);

      const res = await fetch(
        `http://localhost:8081/seller/product/update/${selectedProduct.productId}`,
        {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        }
      );

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to update product");
      }

      const updated = await res.json();
      setProducts((prev) =>
        prev.map((p) => (p.productId === updated.productId ? updated : p))
      );
      setSuccess("Product updated successfully ✅");
      handleDialogClose();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const columns: GridColDef[] = [
    { field: "productId", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "price", headerName: "Price", width: 120 },
    { field: "stock", headerName: "Stock", width: 120 },
    { field: "category", headerName: "Category", width: 150 },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      renderCell: (params) =>
        params.row.active ? (
          <Chip label="Active" color="success" size="small" />
        ) : (
          <Chip label="Inactive" color="default" size="small" />
        ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <>
          <IconButton color="primary" onClick={() => handleEditClick(params.row)}>
            <EditIcon />
          </IconButton>
          <Button
            variant="contained"
            color={params.row.active ? "error" : "success"}
            onClick={() => handleToggleActive(params.row)}
          >
            {params.row.active ? "Deactivate" : "Activate"}
          </Button>
        </>
      ),
    },
  ];

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h6" gutterBottom>
        Manage My Products
      </Typography>

      <Box sx={{ height: 500, width: "100%", mt: 3 }}>
        <DataGrid
          rows={products}
          columns={columns}
          pageSize={5}
          getRowId={(row) => row.productId}
          getRowClassName={(params) =>
            params.row.active ? "" : "inactive-row"
          }
        />
      </Box>

      <Snackbar
        open={!!success}
        autoHideDuration={3000}
        onClose={() => setSuccess(null)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success">{success}</Alert>
      </Snackbar>

      {/* Edit Product Dialog */}
      <Dialog open={openDialog} onClose={handleDialogClose} maxWidth="md" fullWidth>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
        >
          <TextField
            label="Name"
            value={selectedProduct?.name || ""}
            onChange={(e) =>
              setSelectedProduct({ ...selectedProduct, name: e.target.value })
            }
            fullWidth
          />
          <TextField
            label="Price"
            type="number"
            value={selectedProduct?.price || ""}
            onChange={(e) =>
              setSelectedProduct({
                ...selectedProduct,
                price: parseFloat(e.target.value),
              })
            }
            fullWidth
          />
          <TextField
            label="Stock"
            type="number"
            value={selectedProduct?.stock || ""}
            onChange={(e) =>
              setSelectedProduct({
                ...selectedProduct,
                stock: parseInt(e.target.value),
              })
            }
            fullWidth
          />
          <TextField
            label="Category"
            value={selectedProduct?.category || ""}
            onChange={(e) =>
              setSelectedProduct({ ...selectedProduct, category: e.target.value })
            }
            fullWidth
          />
          <TextField
            label="Description"
            multiline
            value={selectedProduct?.description || ""}
            onChange={(e) =>
              setSelectedProduct({ ...selectedProduct, description: e.target.value })
            }
            fullWidth
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files?.[0]) setSelectedImage(e.target.files[0]);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleDialogSave} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

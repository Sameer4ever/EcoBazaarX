import * as React from 'react';
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Alert
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

// --- TypeScript Interfaces ---
interface User {
  userId: number;
  email: string;
  username: string;
  // ✅ FIX: Removed registrationDate as it does not exist in the table
}

// --- API Fetch Functions ---
const fetchUsers = async (token: string): Promise<User[]> => {
  const response = await fetch('http://localhost:8081/api/admin/users', {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error('Failed to fetch users.');
  return response.json();
};

const deleteUser = async ({ userId, token }: { userId: number, token: string }) => {
  const response = await fetch(`http://localhost:8081/api/admin/users/${userId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error('Failed to delete user.');
};

// --- Main Component ---
export default function ManageUsersPage() {
  const [token, setToken] = useState<string | null>(null);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
  }, []);

  const { data: users, isLoading, isError, error } = useQuery<User[], Error>({
    queryKey: ['users', token],
    queryFn: () => fetchUsers(token!),
    enabled: !!token,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      // Invalidate and refetch the users query to update the list
      queryClient.invalidateQueries({ queryKey: ['users'] });
      handleCloseDialog();
    },
  });

  const handleOpenDialog = (user: User) => {
    setUserToDelete(user);
  };

  const handleCloseDialog = () => {
    setUserToDelete(null);
  };

  const handleDeleteConfirm = () => {
    if (userToDelete && token) {
      deleteMutation.mutate({ userId: userToDelete.userId, token });
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
        Manage Users
      </Typography>

      {isError && <Alert severity="error" sx={{ mb: 2 }}>Error fetching users: {error.message}</Alert>}

      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>User ID</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Username</TableCell>
                {/* ✅ FIX: Removed Registration Date header */}
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  {/* ✅ FIX: Adjusted colSpan */}
                  <TableCell colSpan={4} align="center"><CircularProgress /></TableCell>
                </TableRow>
              ) : (
                users?.map((user) => (
                  <TableRow hover key={user.userId}>
                    <TableCell>{user.userId}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.username}</TableCell>
                    {/* ✅ FIX: Removed Registration Date cell */}
                    <TableCell align="right">
                      <Tooltip title="Delete User">
                        <IconButton onClick={() => handleOpenDialog(user)} color="error">
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Confirmation Dialog */}
      <Dialog open={!!userToDelete} onClose={handleCloseDialog}>
        <DialogTitle>Delete User?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to permanently delete the user <strong>{userToDelete?.email}</strong>? This action cannot be undone.
          </DialogContentText>
          {deleteMutation.isError && <Alert severity="error" sx={{ mt: 2 }}>{deleteMutation.error.message}</Alert>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error" disabled={deleteMutation.isPending}>
            {deleteMutation.isPending ? <CircularProgress size={24} /> : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}


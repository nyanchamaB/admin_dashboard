import React, { useEffect, useState } from 'react';
import { Box, Typography, useTheme, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { tokens } from '../../theme';
import Header from '../../components/Header';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';

const Teachers = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [teachers, setTeachers] = useState([]);
  const [isAddTeacherOpen, setIsAddTeacherOpen] = useState(false);

  // Fetch teachers from the backend API
  useEffect(() => {
    fetchTeachers();
  }, []);

  // Fetch all teachers
  const fetchTeachers = async () => {
    try {
      const response = await fetch('backend/api/teachers');
      const data = await response.json();
      setTeachers(data);
    } catch (error) {
      console.log('Error fetching teachers:', error);
    }
  };

  // Add a new teacher
  const addTeacher = async (newTeacher) => {
    try {
      const response = await fetch('backend/api/teachers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTeacher),
      });
      const data = await response.json();
      setTeachers([...teachers, data]);
    } catch (error) {
      console.log('Error adding teacher:', error);
    }
  };

  // Delete a teacher
  const deleteTeacher = async (id) => {
    try {
      await fetch(`backend/api/teachers/${id}`, {
        method: 'DELETE',
      });
      setTeachers(teachers.filter((teacher) => teacher.id !== id));
    } catch (error) {
      console.log('Error deleting teacher:', error);
    }
  };

  // Update a teacher
  const updateTeacher = async (updatedTeacher) => {
    try {
      const response = await fetch(`backend/api/teachers/${updatedTeacher.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTeacher),
      });
      const data = await response.json();
      setTeachers(teachers.map((teacher) => (teacher.id === data.id ? data : teacher)));
    } catch (error) {
      console.log('Error updating teacher:', error);
    }
  };

  // Function to handle teacher addition
  const handleTeacherAdded = (newTeacher) => {
    addTeacher(newTeacher);
    setIsAddTeacherOpen(false);
  };

  // Function to open the Add Teacher form
  const handleAddTeacherOpen = () => {
    setIsAddTeacherOpen(true);
  };

  // Function to close the Add Teacher form
  const handleAddTeacherClose = () => {
    setIsAddTeacherOpen(false);
  };

  const columns = [
    { field: 'code', headerName: 'Code', flex: 1 },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'age', headerName: 'Age', flex: 1 },
    { field: 'gender', headerName: 'Gender', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'registrationStatus', headerName: 'Registration Status', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => (
        <div>
          <Button
            variant="outlined"
            icon ={<DeleteIcon/>}
            color="secondary"
            onClick={() => deleteTeacher(params.row.id)}
          >
            Delete
          </Button>
          <Button
            variant="outlined"
            icon ={< UpdateIcon />}
            color="secondary"
            onClick={() => handleUpdateTeacher(params.row)}
          >
            Update
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="Teacher Dashboard" subtitle="Manage Teachers Records" />
      <Typography variant="h4" component="h1" gutterBottom>
        Teachers
      </Typography>
      <Box display="flex" justifyContent="flex-end" mb="10px">
        <Button
          variant="contained"
          onClick={handleAddTeacherOpen}
          color="secondary"
          sx={{
            backgroundColor: colors.greenAccent[700],
            color: colors.grey[100],
          }}
        >
          Add Teacher
        </Button>
      </Box>
      <Dialog open={isAddTeacherOpen} onClose={handleAddTeacherClose}>
        <DialogTitle>Add Teacher</DialogTitle>
        <DialogContent>
          <AddTeacherForm onTeacherAdded={handleTeacherAdded} onClose={handleAddTeacherClose} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddTeacherClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
      {/* Teachers list */}
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          // Additional styling classes
        }}
      >
        <DataGrid rows={teachers} columns={columns} />
      </Box>
    </Box>
  );
};

const AddTeacherForm = ({ onTeacherAdded, onClose }) => {
  // Form state variables

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Form submission logic

    onTeacherAdded(newTeacher);
    onClose();
  };

  return (
    <form onSubmit={handleFormSubmit}>
      {/* Form fields */}
      <Button type="submit" variant="contained" color="secondary">
        Submit
      </Button>
    </form>
  );
};

export default Teachers;

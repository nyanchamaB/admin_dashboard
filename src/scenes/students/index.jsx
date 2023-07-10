import React, { useEffect, useState } from 'react';
import { Box, Typography, useTheme, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Input } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { tokens } from '../../theme';
import Header from '../../components/Header';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const Students = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const Navigate=useNavigate();

  const [students, setStudents] = useState([]);
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);

  // Function to handle student addition
  const handleStudentAdded = (newStudent) => {
    // Update the students list by adding the new student
    setStudents([...students, newStudent]);
    // Close the Add Student form
    setIsAddStudentOpen(false);
  };

  // Function to open the Add Student form
  const handleAddStudentOpen = () => {
    setIsAddStudentOpen(true);
  };

  // Function to close the Add Student form
  const handleAddStudentClose = () => {
    setIsAddStudentOpen(false);
  };

  const handleStudentEdit = (studentId) => {
    // Implement the logic to handle student edit
    console.log(`Edit student with ID: ${studentId}`);
  };

  const handleStudentDelete = (studentId) => {
    // Implement the logic to handle student delete
    console.log(`Delete student with ID: ${studentId}`);
  };

  const columns = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'age', headerName: 'Age', flex: 1 },
    { field: 'action', headerName: 'Action', flex: 1, sortable: false, renderCell: (params) => (
      <div>
      <Button variant="outlined" color='primary' onClick={() => handleStudentEdit(params.row.id)}>
      <EditIcon />
      </Button>
      <Button variant="outlined" color='secondary' onClick={() => handleStudentDelete(params.row.id)}>
      <DeleteIcon />
      </Button>
      </div>
      ) },
      ];

  return (
    <Box m="20px">
      <Header title="Student Dashboard" subtitle="Manage student Records" />
      <Typography variant="h4" component="h1" gutterBottom></Typography>
      <Box display="flex" justifyContent="flex-end" mb="10px">
        <Button
          variant="contained"
          onClick={handleAddStudentOpen}
          color="secondary"
          sx={{
            backgroundColor: colors.greenAccent[700],
            color: colors.grey[100],
          }}
        >
          Add Student
        </Button>
      </Box>
      <Dialog open={isAddStudentOpen} onClose={handleAddStudentClose}>
        <DialogTitle>Add Student</DialogTitle>
        <DialogContent>
          <AddStudentForm onStudentAdded={handleStudentAdded} onClose={handleAddStudentClose} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddStudentClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
      {/* Students list */}
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid rows={students} columns={columns} />
      </Box>
    </Box>
  );
};

const AddStudentForm = ({ onStudentAdded, onClose }) => {
  const [id, setID] =useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8012/backend/api/submit',AddStudentForm) . then(function(response){
    console.log(response.data);
    Navigate('/');
    });
     

    const newStudent = {
      id,
      name,
      age,
    };

    // Call the onStudentAdded callback with the new student data
    onStudentAdded(newStudent);

    // Reset form fields
    setID('');
    setName('');
    setAge('');

    // Close the form
    onClose();
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <TextField label="ID" value={id} onChange={(e) => setID(e.target.value)} required/>
      <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <TextField label="Age" value={age} onChange={(e) => setAge(e.target.value)} required />
      <Button type="submit" variant="contained" color="secondary">
        Submit
      </Button>
    </form>
  );
};

export default Students;

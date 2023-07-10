import React, { useEffect, useState } from 'react';
import { Box, Typography,useTheme, Button, Dialog, DialogTitle, DialogContent, DialogActions,TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { tokens } from '../../theme';
import Header from '../../components/Header';

const Teachers = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
 
    const [teachers, setTeachers] = useState([]);
    const [isAddTeacherOpen, setIsAddTeacherOpen] = useState(false);
  
    // Function to handle teacher addition
    const handleTeacherAdded = (newTeacher) => {
      // Update the teachers list by adding the new teacher
      setTeachers([...teachers, newTeacher]);
      // Close the Add Teacher form
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
    ];
  
    return (
      <Box m="20px">
          <Header title="Teacher Dashboard" subtitle="Manage teachers Records" />
        <Typography variant="h4" component="h1" gutterBottom>

        </Typography>
        <Box display="flex" justifyContent="flex-end" mb="10px">
          <Button variant="contained"  onClick={handleAddTeacherOpen}   
        color="secondary" // Change color to "secondary"
        
        sx={{
          backgroundColor: colors.greenAccent[700], // Customize button background color
          color: colors.grey[100], // Customize button text color
        }}>
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
        <Box m="40px 0 0 0" height="75vh"    sx={{
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
        }}>
          <DataGrid rows={teachers} columns={columns} />
        </Box>
      </Box>
    );
  };
  
  const AddTeacherForm = ({ onTeacherAdded, onClose }) => {
    const [code, setCode] = useState('');
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [email, setEmail] = useState('');
    const [registrationStatus, setRegistrationStatus] = useState('');
  
    const handleFormSubmit = (e) => {
      e.preventDefault();
  
      const newTeacher = {
        id: Math.random().toString(36).substring(7),
        code,
        name,
        age,
        gender,
        email,
        registrationStatus,
      };
  
      // Call the onTeacherAdded callback with the new teacher data
      onTeacherAdded(newTeacher);
  
      // Reset form fields
      setCode('');
      setName('');
      setAge('');
      setGender('');
      setEmail('');
      setRegistrationStatus('');
  
      // Close the form
      onClose();
    };
  
    return (
      <form onSubmit={handleFormSubmit}>
        <TextField label="Code" value={code} onChange={(e) => setCode(e.target.value)} required />
        <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <TextField label="Age" value={age} onChange={(e) => setAge(e.target.value)} required />
        <TextField label="Gender" value={gender} onChange={(e) => setGender(e.target.value)} required />
        <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <TextField
          select
          label="Registration Status"
          value={registrationStatus}
          onChange={(e) => setRegistrationStatus(e.target.value)}
          required
        >
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </TextField>
        <Button type="submit" variant="contained" color="secondary">
          Submit
        </Button>
      </form>
    );
  };
  
  export default Teachers;
  
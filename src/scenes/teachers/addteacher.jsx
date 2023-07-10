import { useState } from 'react';
import { Box, Typography, Button, TextField } from '@mui/material';

const AddTeacher = ({ onTeacherAdded }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Perform form validation and data processing
    // You can also handle profile picture upload here

    // Create a new teacher object
    const newTeacher = {
      name,
      age,
      gender,
      contact,
      email,
      profilePicture,
      registrationStatus: 'Pending', // Set the initial registration status as 'Pending'
    };

    // Perform the API call or data processing logic to add the teacher
    // Once the teacher is successfully added, invoke the onTeacherAdded callback function
    // with the newly added teacher object
    // Example API call:
    // api.addTeacher(newTeacher)
    //   .then((response) => {
    //     onTeacherAdded(response.data);
    //     // Reset the form fields
    //     setName('');
    //     setAge('');
    //     setGender('');
    //     setContact('');
    //     setEmail('');
    //     setProfilePicture(null);
    //   })
    //   .catch((error) => {
    //     console.error('Error adding teacher:', error);
    //   });

    // For demonstration purposes, simulate a delay before invoking the callback function
    setTimeout(() => {
      onTeacherAdded(newTeacher);
      // Reset the form fields
      setName('');
      setAge('');
      setGender('');
      setContact('');
      setEmail('');
      setProfilePicture(null);
    }, 1000);
  };

  return (
    <Box m="20px">
      <Typography variant="h4" gutterBottom>
        Add Teacher
      </Typography>
      <form onSubmit={handleFormSubmit}>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Contact"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
        />
        {/* Add profile picture upload functionality here */}
        <Button type="submit" variant="contained" color="success">
          Add
        </Button>
      </form>
    </Box>
  );
};

export default AddTeacher;

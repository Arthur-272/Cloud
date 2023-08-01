import React, {useState} from 'react';
import axios from 'axios';
import {
    Button,
    TextField,
    Container,
    Typography,
    RadioGroup,
    FormControlLabel,
    Radio,
    FormControl
} from '@material-ui/core';

function App() {
    const [itemType, setItemType] = useState('Lost');
    const [itemName, setItemName] = useState('');
    const [description, setDescription] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [successMessage, setSuccessMessage] = useState(null);

    const handleSubmit = async () => {
        const API_URL = process.env.REACT_APP_API_URL;

        try {
            const response = await axios.post(API_URL, {
                itemType: itemType,
                itemName: itemName,
                description: description,
                userEmail: userEmail
            });

            const res = response.data;
            if (res.statusCode === 200) {
                setSuccessMessage("Item recorded successfully!");
            } else {
                setSuccessMessage("Failed to record the item.");
            }
        } catch (error) {
            console.error("Error while submitting:", error);
            setSuccessMessage("Failed to record the item.");
        }
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" align="center">Lost & Found</Typography>

            <FormControl component="fieldset">
                <RadioGroup row value={itemType} onChange={e => setItemType(e.target.value)}>
                    <FormControlLabel value="Lost" control={<Radio/>} label="Lost"/>
                    <FormControlLabel value="Found" control={<Radio/>} label="Found"/>
                </RadioGroup>
            </FormControl>

            <TextField fullWidth margin="normal" label="Item Name" value={itemName}
                       onChange={e => setItemName(e.target.value)}/>
            <TextField fullWidth margin="normal" label="Description" value={description}
                       onChange={e => setDescription(e.target.value)}/>
            <TextField fullWidth margin="normal" label="Email" value={userEmail}
                       onChange={e => setUserEmail(e.target.value)}/>

            <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
                Submit
            </Button>

            {successMessage &&
                <Typography variant="h6" color="primary" style={{marginTop: '16px', textAlign: 'center'}}>
                    {successMessage}
                </Typography>}

        </Container>
    );
}

export default App;

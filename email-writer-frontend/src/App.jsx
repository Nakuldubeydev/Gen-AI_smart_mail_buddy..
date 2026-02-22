import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Container, TextField, Typography, Button, CircularProgress } from '@mui/material';
import './App.css';
import { useState } from 'react';
import axios from 'axios';

function App() {
 
  const [emailContent, setEmailContent] = useState('');
  const [tone, setTone] = useState('');
  const [generatedReply, setGeneratedReply] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
 
    setLoading(true);
    if (!emailContent.trim()) {
      alert('Please enter email content');
      return;
    }

    // api calling
    try {
      const response = await axios.post('http://localhost:8080/api/email/generate',
        { 
        emailContent,
        tone
        }
      ); 
      setGeneratedReply(typeof response.data === 'string' ?
        response.data
         : JSON.stringify(response.data,null , 2)
      );

    } 
    catch (error) {
      console.error('Error:', error);
      alert('Failed to generate reply. Make sure the backend is running.');
    } 
    finally {
      setLoading(false);
    }
  };


  return (

    <Container maxWidth="md" sx={{py:4}}>
      <Typography variant='h3' component="h1" gutterBottom>
        Email Reply Generator
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField
          fullWidth
          multiline
          rows={6}
          variant='outlined'
          label="Original Email Content"
          placeholder="Paste the email you want to reply to..."
          value={emailContent}
          onChange={(e) => setEmailContent(e.target.value)}
          sx={{mt : 2}}
        />

        <FormControl fullWidth sx={{mt : 2}}>
          <InputLabel>Tone (Optional)</InputLabel>
          <Select
            value={tone}
            label="Tone (Optional)"
            onChange={(e) => setTone(e.target.value)}
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="professional">Professional</MenuItem>
            <MenuItem value="friendly">Friendly</MenuItem>
            <MenuItem value="formal">Formal</MenuItem>
            <MenuItem value="casual">Casual</MenuItem>
            <MenuItem value="bold and smooth">Bold and Smooth</MenuItem>
          </Select>
        </FormControl>

        <Button 
          variant="contained" 
          sx={{mt : 2}}
         // size="large"
         // color="primary"
          onClick={handleSubmit}
          disabled={!emailContent.trim() || loading}>
            {loading ? <CircularProgress size={24}/> : "Generate Reply"}  
        </Button>
      
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            fullWidth
            multiline
            rows={6}
            variant='outlined'
            placeholder="Paste the email you want to reply to..."
            value={generatedReply || "" }
            inputProps={{readOnly: true}}
            sx={{mt : 2}}
          />

          <Button 
            variant="outlined" 
            sx={{ mt: 2 }}
            onClick={async() => {
                try {
                    if (!generatedReply) {
                      alert("Nothing to copy!");
                      return;
                    }
                    await navigator.clipboard.writeText(generatedReply);
                    alert('Reply copied to clipboard!');
                  }
                catch(err){
                  console.error("clipboard error:",err);
                  alert("Copy Failed. Your browser may block clipboard access.");
                }
            } }
          >
           Copy to Clipboard
          </Button>
        </Box>
        
      </Box>
    </Container>
  );
}

export default App;
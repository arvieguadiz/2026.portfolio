import React from 'react';
import { Box, TextField, Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import GlassCard from '@/components/GlassCard';
import SectionHeading from '@/components/SectionHeading';
import { Send } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <Box id="contact" sx={{ py: 10 }}>
      <SectionHeading subtitle="Have a project in mind or just want to say hi? Feel free to reach out.">
        Let's Connect
      </SectionHeading>

      <Grid container spacing={4} justifyContent="center">
        <Grid size={{ xs: 12, md: 8 }}>
          <GlassCard>
            <Box component="form" sx={{ mt: 2 }}>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Name"
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        bgcolor: 'rgba(255, 255, 255, 0.02)',
                        borderRadius: '12px',
                      },
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Email"
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        bgcolor: 'rgba(255, 255, 255, 0.02)',
                        borderRadius: '12px',
                      },
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label="Subject"
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        bgcolor: 'rgba(255, 255, 255, 0.02)',
                        borderRadius: '12px',
                      },
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label="Message"
                    multiline
                    rows={4}
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        bgcolor: 'rgba(255, 255, 255, 0.02)',
                        borderRadius: '12px',
                      },
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    endIcon={<Send size={20} />}
                    sx={{
                      py: 2,
                      fontSize: '1.1rem',
                      fontWeight: 700,
                      borderRadius: '12px',
                      boxShadow: '0 8px 16px rgba(156, 39, 176, 0.3)',
                    }}
                  >
                    Send Message
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </GlassCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Contact;

import React, { useState, useRef } from 'react';
import {
  Box,
  TextField,
  Button,
  useTheme,
  Snackbar,
  Alert,
  CircularProgress,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import GlassCard from '@/components/GlassCard';
import SectionHeading from '@/components/SectionHeading';
import SEO from '@/components/SEO';
import { Send, Linkedin, Github as GithubIcon, Mail } from 'lucide-react';
import emailjs from '@emailjs/browser';

const Contact: React.FC = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const form = useRef<HTMLFormElement>(null);

  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.current) return;

    // Optional: Add basic validation here if needed
    const formData = new FormData(form.current);
    if (
      !formData.get('user_name') ||
      !formData.get('user_email') ||
      !formData.get('message')
    ) {
      setSnackbar({
        open: true,
        message: 'Please fill in all required fields.',
        severity: 'error',
      });
      return;
    }

    setLoading(true);

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID',
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID',
        form.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY',
      )
      .then(
        (result) => {
          console.log(result.text);
          setSnackbar({
            open: true,
            message: 'Message sent successfully!',
            severity: 'success',
          });
          form.current?.reset();
          setLoading(false);
        },
        (error) => {
          console.log(error.text);
          setSnackbar({
            open: true,
            message:
              'Failed to send message. Please make sure your EmailJS keys are configured in .env',
            severity: 'error',
          });
          setLoading(false);
        },
      );
  };

  const seoData = {
    title: 'Contact Arvie Benito | Get in Touch',
    description: 'Get in touch with Arvie Benito, a Fullstack MERN developer. Send a message for project inquiries, collaborations, or just to say hello.',
    ogTitle: 'Contact Arvie Benito - Fullstack Developer',
    ogDescription: 'Reach out to Arvie Benito for project collaborations, web development inquiries, and professional opportunities.',
    ogImage: 'https://arviebenito.com/public/vite.svg',
  };

  return (
    <>
      <SEO page={seoData} />
      <Box id="contact" sx={{ py: 10 }}>
        <SectionHeading subtitle="Have a project in mind or just want to say hi? Feel free to reach out.">
          Let's Connect
        </SectionHeading>

        <Grid container spacing={4} justifyContent="center">
          <Grid size={{ xs: 12, md: 8 }}>
            <GlassCard>
              <Box
                component="form"
                ref={form}
                onSubmit={sendEmail}
                sx={{ mt: 2 }}
              >
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      name="user_name"
                      required
                      label="Name"
                      variant="outlined"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          bgcolor: isDarkMode
                            ? 'rgba(255, 255, 255, 0.02)'
                            : 'rgba(0, 0, 0, 0.02)',
                          borderRadius: '12px',
                        },
                      }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      name="user_email"
                      type="email"
                      required
                      label="Email"
                      variant="outlined"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          bgcolor: isDarkMode
                            ? 'rgba(255, 255, 255, 0.02)'
                            : 'rgba(0, 0, 0, 0.02)',
                          borderRadius: '12px',
                        },
                      }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      name="subject"
                      label="Subject"
                      variant="outlined"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          bgcolor: isDarkMode
                            ? 'rgba(255, 255, 255, 0.02)'
                            : 'rgba(0, 0, 0, 0.02)',
                          borderRadius: '12px',
                        },
                      }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      name="message"
                      required
                      label="Message"
                      multiline
                      rows={4}
                      variant="outlined"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          bgcolor: isDarkMode
                            ? 'rgba(255, 255, 255, 0.02)'
                            : 'rgba(0, 0, 0, 0.02)',
                          borderRadius: '12px',
                        },
                      }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <Button
                      fullWidth
                      type="submit"
                      disabled={loading}
                      variant="contained"
                      size="large"
                      endIcon={
                        loading ? (
                          <CircularProgress size={20} color="inherit" />
                        ) : (
                          <Send size={20} />
                        )
                      }
                      sx={{
                        py: 2,
                        fontSize: '1.1rem',
                        fontWeight: 700,
                        borderRadius: '12px',
                        boxShadow: '0 8px 16px rgba(156, 39, 176, 0.3)',
                      }}
                    >
                      {loading ? 'Sending...' : 'Send Message'}
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </GlassCard>

            <Box
              sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2 }}
            >
              <Button
                variant="outlined"
                startIcon={<Linkedin size={20} />}
                href="https://linkedin.com/in/arviebenito"
                target="_blank"
                sx={{
                  color: isDarkMode ? '#fff' : '#1a1a1a',
                  borderColor: isDarkMode
                    ? 'rgba(255,255,255,0.2)'
                    : 'rgba(0,0,0,0.2)',
                }}
              >
                LinkedIn
              </Button>
              <Button
                variant="outlined"
                startIcon={<GithubIcon size={20} />}
                href="https://github.com/arvieguadiz"
                target="_blank"
                sx={{
                  color: isDarkMode ? '#fff' : '#1a1a1a',
                  borderColor: isDarkMode
                    ? 'rgba(255,255,255,0.2)'
                    : 'rgba(0,0,0,0.2)',
                }}
              >
                GitHub
              </Button>
              <Button
                variant="outlined"
                startIcon={<Mail size={20} />}
                href="mailto:contact@arviebenito.com"
                sx={{
                  color: isDarkMode ? '#fff' : '#1a1a1a',
                  borderColor: isDarkMode
                    ? 'rgba(255,255,255,0.2)'
                    : 'rgba(0,0,0,0.2)',
                }}
              >
                Email
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbar.severity}
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </>
  );
};

export default Contact;
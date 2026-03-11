import React, { useState, useRef } from 'react';
import {
  Box,
  TextField,
  Button,
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
import { useThemeMode } from '@/hooks/useThemeMode';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useTranslation } from 'react-i18next';
import { trackEvent } from '@/components/Analytics';

const contactSchema = (t: any) =>
  z.object({
    user_name: z.string().min(2, t('contact.name') + ' must be at least 2 characters'),
    user_email: z.string().email('Please enter a valid email address'),
    subject: z.string().optional(),
    message: z.string().min(10, t('contact.message') + ' must be at least 10 characters'),
  });

type ContactFormData = {
  user_name: string;
  user_email: string;
  subject?: string;
  message: string;
};

const Contact: React.FC = () => {
  const { t } = useTranslation();
  const { isDarkMode } = useThemeMode();
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

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema(t)),
  });

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const onSubmit = () => {
    if (!form.current) return;

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
          trackEvent('contact_form_success');
          setSnackbar({
            open: true,
            message: t('contact.success'),
            severity: 'success',
          });
          reset();
          setLoading(false);
        },
        (error) => {
          console.error(error.text);
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
    description:
      'Get in touch with Arvie Benito, a Fullstack MERN developer. Send a message for project inquiries, collaborations, or just to say hello.',
    ogTitle: 'Contact Arvie Benito - Fullstack Developer',
    ogDescription:
      'Reach out to Arvie Benito for project collaborations, web development inquiries, and professional opportunities.',
    ogImage: 'https://arviebenito.com/public/vite.svg',
  };

  return (
    <>
      <SEO page={seoData} />
      <Box id="contact" sx={{ py: 10 }}>
        <SectionHeading subtitle={t('contact.subtitle')}>
          {t('contact.title')}
        </SectionHeading>

        <Grid container spacing={4} justifyContent="center">
          <Grid size={{ xs: 12, md: 8 }}>
            <GlassCard>
              <Box
                component="form"
                ref={form}
                onSubmit={handleSubmit(onSubmit)}
                sx={{ mt: 2 }}
              >
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      id="name"
                      {...register('user_name')}
                      error={!!errors.user_name}
                      helperText={errors.user_name?.message}
                      label={t('contact.name')}
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
                      id="email"
                      type="email"
                      {...register('user_email')}
                      error={!!errors.user_email}
                      helperText={errors.user_email?.message}
                      label={t('contact.email')}
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
                      id="subject"
                      {...register('subject')}
                      error={!!errors.subject}
                      helperText={errors.subject?.message}
                      label={t('contact.subject')}
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
                      id="message"
                      {...register('message')}
                      error={!!errors.message}
                      helperText={errors.message?.message}
                      label={t('contact.message')}
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
                      {loading ? t('contact.sending') : t('contact.send')}
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

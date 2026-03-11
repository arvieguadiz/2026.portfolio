import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Menu, MenuItem } from '@mui/material';
import { Languages } from 'lucide-react';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (lang?: string) => {
    if (lang) {
      i18n.changeLanguage(lang);
    }
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="language-button"
        aria-controls={open ? 'language-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        startIcon={<Languages size={18} />}
        color="inherit"
        sx={{ textTransform: 'none', fontWeight: 600 }}
      >
        {i18n.language === 'tl' ? 'Tagalog' : 'English'}
      </Button>
      <Menu
        id="language-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleClose()}
        MenuListProps={{
          'aria-labelledby': 'language-button',
        }}
      >
        <MenuItem onClick={() => handleClose('en')}>English</MenuItem>
        <MenuItem onClick={() => handleClose('tl')}>Tagalog</MenuItem>
      </Menu>
    </div>
  );
};

export default LanguageSwitcher;

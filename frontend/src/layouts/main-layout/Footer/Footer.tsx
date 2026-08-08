import type { ReactElement } from 'react';

import {
  Box,
  Typography,
} from '@mui/material';


interface FooterProps {
  open: boolean;
}


const Footer = ({
  open,
}: FooterProps): ReactElement => {

  const currentYear = new Date().getFullYear();


  return (
    <Box
      component="footer"
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        py: 3,
        px: 2,
        ml: {
          xs: 0,
          sm: open ? 28 : 10,
        },
      }}
    >

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          textAlign: 'center',
        }}
      >
        © {currentYear} EVM Dashboard - 
        Sistema de gestión y control de proyectos
      </Typography>

    </Box>
  );
};


export default Footer;
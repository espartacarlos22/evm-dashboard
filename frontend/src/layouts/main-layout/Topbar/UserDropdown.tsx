import { useState } from 'react';
import type { MouseEvent, ReactElement } from 'react';

import {
  Avatar,
  Button,
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material';

import { useNavigate } from 'react-router-dom';

import IconifyIcon from '../../../components/base/IconifyIcon';

const UserDropdown = (): ReactElement => {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const menuOpen = Boolean(anchorEl);

  /**
   * Abre el menú del usuario.
   */
  const handleUserClick = (
    event: MouseEvent<HTMLElement>,
  ) => {
    setAnchorEl(event.currentTarget);
  };

  /**
   * Cierra el menú del usuario.
   */
  const handleClose = () => {
    setAnchorEl(null);
  };

  /**
   * Navega al perfil del usuario.
   */
  const handleProfile = () => {
    handleClose();

    navigate('/profile');
  };

  /**
   * Cierra la sesión.
   *
   * Por ahora solamente redirige al login.
   * Posteriormente conectaremos este botón
   * con el endpoint de logout del backend FastAPI.
   */
  const handleLogout = () => {
    handleClose();

    navigate('/login', {
      replace: true,
    });
  };

  return (
    <>
      <Button
        color="inherit"
        variant="text"
        id="account-dropdown-button"
        aria-controls={
          menuOpen
            ? 'account-dropdown-menu'
            : undefined
        }
        aria-haspopup="true"
        aria-expanded={
          menuOpen
            ? 'true'
            : undefined
        }
        onClick={handleUserClick}
        disableRipple
        sx={{
          borderRadius: 2,
          gap: 2,
          px: {
            xs: 0,
            sm: 1,
          },
          py: 0.625,

          '&:hover': {
            bgcolor: 'transparent',
          },
        }}
      >
        <Tooltip
          title="Usuario"
          arrow
          placement="bottom"
        >
          <Avatar
            sx={{
              width: 44,
              height: 44,
            }}
          >
            <IconifyIcon
              icon="mdi:account"
              width={24}
              height={24}
            />
          </Avatar>
        </Tooltip>

        <IconifyIcon
          color="common.white"
          icon="mingcute:down-fill"
          width={22}
          height={22}
          sx={(theme) => ({
            transform: menuOpen
              ? 'rotate(180deg)'
              : 'rotate(0deg)',

            transition:
              theme.transitions.create(
                'transform',
                {
                  duration:
                    theme.transitions
                      .duration.short,
                },
              ),
          })}
        />
      </Button>

      <Menu
        id="account-dropdown-menu"
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleClose}
        transformOrigin={{
          horizontal: 'right',
          vertical: 'top',
        }}
        anchorOrigin={{
          horizontal: 'right',
          vertical: 'bottom',
        }}
      >
        <MenuItem onClick={handleProfile}>
          <ListItemIcon>
            <IconifyIcon
              icon="mdi:account-outline"
              width={20}
              height={20}
            />
          </ListItemIcon>

          <ListItemText>
            <Typography variant="body2">
              Mi perfil
            </Typography>
          </ListItemText>
        </MenuItem>

        <Divider />

        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <IconifyIcon
              icon="material-symbols:logout"
              width={20}
              height={20}
              color="error.main"
            />
          </ListItemIcon>

          <ListItemText>
            <Typography
              variant="body2"
              color="error.main"
            >
              Cerrar sesión
            </Typography>
          </ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};

export default UserDropdown;
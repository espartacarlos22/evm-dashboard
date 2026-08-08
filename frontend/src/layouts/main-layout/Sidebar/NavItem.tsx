import { Link, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import IconifyIcon from '../../../../src/components/base/IconifyIcon';
import type { NavItem as NavItemProps } from '../../../data/nav-items';
import { useLocation } from 'react-router-dom';

const NavItem = ({
  navItem,
  open,
  onClick,
}: {
  navItem: NavItemProps;
  open: boolean;
  onClick?: () => void;
}) => {
  const { pathname } = useLocation();
  const isActive = pathname === navItem.path;
  const activeColor = '#3c78f2';

  return (
    <ListItem
      disablePadding
      sx={(theme) => ({
        display: 'block',
        px: 5,
        borderRight: !open
          ? isActive
            ? `3px solid ${theme.palette.primary.main}`
            : `3px solid transparent`
          : '',
      })}
    >
      <ListItemButton
        LinkComponent={Link}
        href={navItem.path}
        onClick={onClick}
        sx={(theme) => ({
          opacity: navItem.active ? 1 : 0.5,
          bgcolor: isActive ? (open ? '#3c79f2dd' : '') : 'background.default',
          '&:hover': {
            bgcolor: isActive
              ? open
                ? '#246bf8c4'
                : 'background.paper'
              : 'background.paper',
            '& .MuiListItemIcon-root': {
              color: !isActive ? theme.palette.grey[100] : undefined,
            },
            '& .MuiListItemText-primary': {
              color: !isActive ? theme.palette.grey[100] : undefined,
            },
          },
          '& .MuiTouchRipple-root': {
            color: isActive ? '#ffffff' : 'text.disabled',
          },
        })}
      >
        <ListItemIcon
          sx={{
            width: 20,
            height: 20,
            mr: open ? 'auto' : 0,
            color: open
              ? isActive
                ? '#fff'
                : 'text.primary'
              : isActive
              ? activeColor
              : 'text.primary',
          }}
        >
          <IconifyIcon
            icon={navItem.icon}
            width={1}
            height={1}
            style={{ color: 'inherit' }}
          />
        </ListItemIcon>
        <ListItemText
          primary={navItem.title}
          sx={{
            display: open ? 'inline-block' : 'none',
            opacity: open ? 1 : 0,
            color: open
              ? isActive
                ? '#fff'
                : 'text.primary'
              : 'text.primary',
          }}
        />
      </ListItemButton>
    </ListItem>
  );
};

export default NavItem;
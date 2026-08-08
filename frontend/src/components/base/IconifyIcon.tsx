import { Box } from '@mui/material';
import type { BoxProps } from '@mui/material';

import { Icon } from '@iconify/react';
import type { IconProps } from '@iconify/react';

interface IconifyIconProps extends BoxProps {
  icon: IconProps['icon'];
  width?: number | string;
  height?: number | string;
}

const IconifyIcon = ({
  icon,
  width = 24,
  height = 24,
  ...rest
}: IconifyIconProps) => {
  return (
    <Box
      component={Icon}
      icon={icon}
      width={width}
      height={height}
      {...rest}
    />
  );
};

export default IconifyIcon;
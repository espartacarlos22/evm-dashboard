import type { ReactElement, PropsWithChildren } from 'react';
import { Box, Stack } from '@mui/material';

const AuthLayout = ({ children }: PropsWithChildren): ReactElement => {
  return (
    <>
      <Stack minHeight="100dvh" justifyContent="center" display= "flex" flex-direction= "column" py={0} my={0}>
        <Box maxWidth={900} width={1} maxHeight={950} height={1} mx="auto" px={5} py={0} my={0}>
          {children}
        </Box>
      </Stack>
    </>
  );
};

export default AuthLayout;
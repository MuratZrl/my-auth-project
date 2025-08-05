'use server';

import { Box, Grid } from "@mui/material";
// ******************************************************************************************
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ minHeight: '100vh' }} >
      <Grid sx={{ height: '100vh' }} >
        {children}
      </Grid>
    </Box>
  );
}
// ****************************************************************************************************
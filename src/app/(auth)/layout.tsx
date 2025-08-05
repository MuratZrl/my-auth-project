'use server';

import { Box, Grid } from "@mui/material";
// ******************************************************************************************
import Panel from "@/app/(auth)/_components_/layout/Panel";
import { SnackbarProvider } from "@/app/lib/snackbarContext";
// ******************************************************************************************
export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <SnackbarProvider>
      <Box sx={{ minHeight: '100vh' }} >
          <Grid sx={{ height: '100vh' }} >

            <Panel>
              {children}
            </Panel>

          </Grid>
      </Box>
    </SnackbarProvider>
  );
}
// ****************************************************************************************************
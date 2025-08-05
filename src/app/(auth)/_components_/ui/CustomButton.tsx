'use client';
import { Button, ButtonProps } from '@mui/material';

export default function CustomButton(props: ButtonProps) {
  return (
    <Button
      variant="outlined"
      fullWidth
      disableElevation
      sx={{
        textTransform: 'none',
        borderColor: 'rgba(255, 255, 255, 0.5)',
        borderRadius: 3,
        fontWeight: 500,
        fontSize: '1rem',
        py: 1,
        color: 'white',
        ...props.sx,
      }}
      {...props}
    />
  );
}

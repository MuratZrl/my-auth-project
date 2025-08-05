'use client';

import { TextField, TextFieldProps } from '@mui/material';

export default function CustomTextField(props: TextFieldProps) {
  return (
    <TextField
      variant="outlined"
      fullWidth
      InputLabelProps={{
        style: {
          color: '#ffffffcc',
        },
      }}
      InputProps={{
        style: {
          color: 'white',
          borderRadius: 15,
          ...props.InputProps?.style,
        },
        ...props.InputProps,
      }}
      sx={{ 
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: 'rgba(255, 255, 255, 0.5)',
        },
        '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: 'rgba(255, 255, 255, 0.75)',
        },
        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: '#fff',
        },
        '& .MuiInputLabel-root': {
          color: '#ffffffb0',
        },
        ...props.sx,
      }}
      {...props}
    />
  );
}

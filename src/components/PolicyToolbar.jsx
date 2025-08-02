import React from 'react';
import { Box, Button, Stack, Typography, Paper } from '@mui/material';

const buttonLabels = [
  'Sessão',
  'Entrada',
  'Data / Horário',
  'Localização',
  'Matriz',
];

const buttonStyles = {
  backgroundColor: 'var(--color-primary-dark)',
  color: 'var(--color-text-light)',
  borderRadius: '12px',
  textTransform: 'none',
  fontWeight: 500,
  boxShadow: 'none',
  minWidth: '150px',
  justifyContent: 'center',
  '&:hover': {
    backgroundColor: 'var(--color-primary-medium)',
  },
};

// Adicionamos a prop 'onAddBlock'
export default function PolicyToolbar({ onAddBlock }) {
  return (
    <Paper
      variant="outlined"
      sx={{
        padding: 2,
        borderRadius: 4,
        borderColor: 'grey.300',
        display: 'inline-block',
        backgroundColor: '#ffffff', // Cor de fundo para não ficar transparente
      }}
    >
      <Stack spacing={1} alignItems="center" backgroundColor="#ffffff">
        <Typography
          variant="caption"
          color="text.secondary"
          
          sx={{
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            fontWeight: 500,
          }}
        >
          Controles de Entrada
        </Typography>
        <Stack direction="row" spacing={2}>
          {buttonLabels.map((label) => (
            <Button
              key={label}
              variant="contained"
              sx={buttonStyles}
              // Adicionamos o evento onClick que chama a função do pai
              onClick={() => onAddBlock(label)}
            >
              {label}
            </Button>
          ))}
        </Stack>
      </Stack>
    </Paper>
  );
}
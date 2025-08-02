import React, { useState } from 'react';
import { Box, TextField, IconButton, Paper, Chip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function SessionBlock({ onDelete }) {
  const [sessionName, setSessionName] = useState('');

  return (
    <Paper
      variant="outlined"
      sx={{
        borderRadius: '12px',
        border: '1px solid #d0d7e2',
        px: 2, // Padding horizontal
        py: 1, // Padding vertical
        mb: 2,
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        height: '75px', // Altura fixa para o bloco
      }}
    >

      <IconButton onClick={onDelete} aria-label="excluir sessão" size="small">
        <DeleteIcon fontSize="small" />
      </IconButton>

      <TextField
        placeholder="Título da Sessão"
        variant="standard"
        fullWidth // Faz o campo ocupar todo o espaço disponível
        value={sessionName}
        onChange={(e) => setSessionName(e.target.value)}
        InputProps={{
          disableUnderline: true,
          style: {
            fontSize: '1.5rem', // Tamanho h2
            fontWeight: 'bold',
            backgroundColor: 'transparent',
            border: 'none',
          }
        }}
        sx={{
          '& .MuiInputBase-input::placeholder': {
            opacity: 0.5,
            fontSize: '1.5rem',
            fontWeight: 'bold',
          },
          '& .MuiInputBase-root': {
            backgroundColor: 'transparent',
            border: 'none',
          },
          '& .MuiInput-root:before': {
            borderBottom: 'none',
          },
          '& .MuiInput-root:after': {
            borderBottom: 'none',
          },
          '& .MuiInput-root:hover:not(.Mui-disabled):before': {
            borderBottom: 'none',
          },
        }}
      />
    </Paper>
  );
}

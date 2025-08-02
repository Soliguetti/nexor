import React, { useState } from 'react';
import { Box, TextField, IconButton, Paper, Chip, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const niveisRisco = ['Crítico', 'Alto', 'Médio', 'Baixo'];
const condicionais = ['Maior que', 'Menor que', 'Igual a', 'Diferente de'];

export default function NumberBlock({ onDelete }) {
  const [riskLevel, setRiskLevel] = useState('');
  const [conditional, setConditional] = useState('');

  return (
    <Paper
      variant="outlined"
      sx={{
        borderRadius: '12px',
        border: '1px solid #d0d7e2',
        p: 2,
        mb: 2,
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        paddingTop: 5,
        paddingBottom: 5,
      }}
    >

    <IconButton onClick={onDelete} aria-label="excluir bloco de texto" size="small">
        <DeleteIcon fontSize="small" />
      </IconButton>

    <Chip label="Numérico" size="small" />


      

      <TextField
        label="Nome do Campo"
        variant="outlined"
        size="small"
        sx={{ flexGrow: 1, minWidth: '150px' }} // Faz o campo crescer
        InputLabelProps={{ style: { fontSize: 12 } }}
        InputProps={{ style: { fontSize: 12 } }}
      />
      
      

     

      <FormControl size="small" sx={{ minWidth: 120 }}>
        <InputLabel style={{ fontSize: 12 }}>Condicional</InputLabel>
        <Select value={conditional} label="Condicional" onChange={(e) => setConditional(e.target.value)} style={{ fontSize: 12 }}>
          {condicionais.map((c) => (
            <MenuItem key={c} value={c} sx={{ fontSize: 12 }}>{c}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        label="Valor"
        variant="outlined"
        size="small"
        sx={{ width: '100px' }}
        InputLabelProps={{ style: { fontSize: 12 } }}
        InputProps={{ style: { fontSize: 12 } }}
      />

       <FormControl size="small" sx={{ minWidth: 120 }}>
        <InputLabel style={{ fontSize: 12 }}>Nível de Risco</InputLabel>
        <Select value={riskLevel} label="Nível de Risco" onChange={(e) => setRiskLevel(e.target.value)} style={{ fontSize: 12 }}>
          {niveisRisco.map((n) => (
            <MenuItem key={n} value={n} sx={{ fontSize: 12 }}>{n}</MenuItem>
          ))}
        </Select>
      </FormControl>


      <TextField
        label="Limite"
        variant="outlined"
        size="small"
        sx={{ width: '100px' }}
        InputLabelProps={{ style: { fontSize: 12 } }}
        InputProps={{ style: { fontSize: 12 } }}

        
      />

      
    </Paper>
  );
}
import React, { useState } from 'react';
import { Box, TextField, IconButton, Paper, Stack, Chip, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CloseIcon from '@mui/icons-material/Close';

const niveisRisco = ['Crítico', 'Alto', 'Médio', 'Baixo'];
const condicionais = ['Maior que', 'Menor que', 'Igual a', 'Diferente de'];

// Define o estado inicial para uma nova linha, agora com todos os campos
const createNewRow = () => ({
  id: Date.now() + Math.random(),
  value: '',
  riskLevel: '',
  conditional: '',
  limit: '',
});

export default function MatrixBlock({ onDelete }) {
  const [rows, setRows] = useState([createNewRow()]);

  const handleAddRow = () => {
    setRows([...rows, createNewRow()]);
  };

  const handleDeleteRow = (idToDelete) => {
    if (rows.length > 1) {
      setRows(rows.filter((row) => row.id !== idToDelete));
    }
  };

  // Função genérica para atualizar qualquer campo em qualquer linha
  const handleRowChange = (id, field, value) => {
    setRows(rows.map(row => (row.id === id ? { ...row, [field]: value } : row)));
  };

  return (
    <Paper
      variant="outlined"
      sx={{ borderRadius: '12px', border: '1px solid #d0d7e2', p: 2, mb: 2, position: 'relative' }}
    >
      <Stack spacing={2}>
        {rows.map((row, index) => (
          <Box key={row.id} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton onClick={() => handleDeleteRow(row.id)} aria-label="excluir linha" size="small">
              <DeleteIcon fontSize="small" />
            </IconButton>
          <Chip label="Matriz" size="small" />
            
            
            

          

           

            <TextField
              label="Nome do Campo"
              variant="outlined"
              size="small"
              sx={{ flexGrow: 1 }}
              value={row.value}
              onChange={(e) => handleRowChange(row.id, 'value', e.target.value)}
              InputLabelProps={{ style: { fontSize: 12 } }}
              InputProps={{ style: { fontSize: 12 } }}
            />

            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel style={{ fontSize: 12 }}>Condicional</InputLabel>
              <Select
                value={row.conditional}
                label="Condicional"
                onChange={(e) => handleRowChange(row.id, 'conditional', e.target.value)}
                style={{ fontSize: 12 }}
              >
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
              value={row.limit}
              onChange={(e) => handleRowChange(row.id, 'limit', e.target.value)}
              InputLabelProps={{ style: { fontSize: 12 } }}
              InputProps={{ style: { fontSize: 12 } }}
            />

              <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel style={{ fontSize: 12 }}>Nível de Risco</InputLabel>
              <Select
                value={row.riskLevel}
                label="Nível de Risco"
                onChange={(e) => handleRowChange(row.id, 'riskLevel', e.target.value)}
                style={{ fontSize: 12 }}
              >
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
              value={row.limit}
              onChange={(e) => handleRowChange(row.id, 'limit', e.target.value)}
              InputLabelProps={{ style: { fontSize: 12 } }}
              InputProps={{ style: { fontSize: 12 } }}
            />
            
            {index === rows.length - 1 && (
              <IconButton onClick={handleAddRow} aria-label="adicionar linha" size="small">
                <AddCircleOutlineIcon fontSize="small" />
              </IconButton>
            )}
          </Box>
        ))}
      </Stack>
    </Paper>
  );
}
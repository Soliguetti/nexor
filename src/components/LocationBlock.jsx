import React, { useState } from 'react';
import { Box, TextField, IconButton, Paper, Chip, FormControl, InputLabel, Select, MenuItem, Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const niveisRisco = ['Crítico', 'Alto', 'Médio', 'Baixo'];
const condicionais = ['Maior que', 'Menor que', 'Igual a', 'Diferente de'];
const tiposEndereco = ['Logradouro', 'Bairro', 'CEP', 'Número', 'UF'];

// Define o estado inicial para uma nova linha
const createNewRow = () => ({
  id: Date.now(),
  addressType: '',
  riskLevel: '',
  conditional: '',
  value: '',
});

export default function LocationBlock({ onDelete }) {
  // O estado agora é um array de linhas, começando com uma
  const [rows, setRows] = useState([createNewRow()]);

  // Função para adicionar uma nova linha ao state
  const handleAddRow = () => {
    setRows([...rows, createNewRow()]);
  };

  // Função para remover uma linha específica pelo seu ID
  const handleDeleteRow = (idToDelete) => {
    // Apenas permite deletar se houver mais de uma linha
    if (rows.length > 1) {
      setRows(rows.filter((row) => row.id !== idToDelete));
    }
  };

  // Função para atualizar um campo específico em uma linha específica
  const handleRowChange = (id, field, value) => {
    setRows(rows.map(row => (row.id === id ? { ...row, [field]: value } : row)));
  };

  return (
    <Paper
      variant="outlined"
      sx={{ borderRadius: '12px', border: '1px solid #d0d7e2', p: 2, mb: 2 }}
    >
      <Stack spacing={2}>
        {rows.map((row, index) => (
          <Box key={row.id} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton onClick={() => handleDeleteRow(row.id)} aria-label="excluir linha" size="small">
              <DeleteIcon fontSize="small" />
            </IconButton>
            
            <Chip label="Localização" size="small" />

            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel style={{ fontSize: 12 }}>Tipo de Endereço</InputLabel>
              <Select
                value={row.addressType}
                label="Tipo de Endereço"
                onChange={(e) => handleRowChange(row.id, 'addressType', e.target.value)}
                style={{ fontSize: 12 }}
              >
                {tiposEndereco.map((tipo) => (
                  <MenuItem key={tipo} value={tipo} sx={{ fontSize: 12 }}>{tipo}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel style={{ fontSize: 12 }}>Nível de Risco</InputLabel>
              <Select value={row.riskLevel} label="Nível de Risco" onChange={(e) => handleRowChange(row.id, 'riskLevel', e.target.value)} style={{ fontSize: 12 }}>
                {niveisRisco.map((n) => (
                  <MenuItem key={n} value={n} sx={{ fontSize: 12 }}>{n}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel style={{ fontSize: 12 }}>Condicional</InputLabel>
              <Select value={row.conditional} label="Condicional" onChange={(e) => handleRowChange(row.id, 'conditional', e.target.value)} style={{ fontSize: 12 }}>
                {condicionais.map((c) => (
                  <MenuItem key={c} value={c} sx={{ fontSize: 12 }}>{c}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Valor"
              variant="outlined"
              size="small"
              sx={{ flexGrow: 1 }}
              value={row.value}
              onChange={(e) => handleRowChange(row.id, 'value', e.target.value)}
              InputLabelProps={{ style: { fontSize: 12 } }}
              InputProps={{ style: { fontSize: 12 } }}
            />
            
            {/* O botão de '+' só aparece na última linha */}
            {index === rows.length - 1 && (
              <IconButton onClick={handleAddRow} aria-label="adicionar linha" size="small">
                <AddCircleOutlineIcon fontSize="small" />
              </IconButton>
            )}
          </Box>
        ))}
      </Stack>
      <IconButton onClick={onDelete} aria-label="excluir bloco" sx={{ position: 'absolute', top: 5, right: 5 }}>
        <DeleteIcon fontSize="small" />
      </IconButton>
    </Paper> 
  );
}
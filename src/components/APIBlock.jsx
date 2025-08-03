import React, { useState } from 'react';
import {
  Box, TextField, IconButton, Paper, Chip, FormControl, InputLabel,
  Select, MenuItem, Button, Popover, Typography, Stack
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';

// --- Lista de Fontes de Dados de Exemplo ---
const dataSources = [
  'Serasa - Score de Crédito',
  'Receita Federal - Consulta CPF',
  'Receita Federal - Consulta CNPJ',
  'Detran - Consulta Veicular',
  'Tribunal de Justiça - Antecedentes',
  'IBGE - Renda Estimada por CEP',
  'Lista PEP (Pessoa Exposta Politicamente)',
];

export default function APIBlock({ onDelete }) {
  const [fieldConfig, setFieldConfig] = useState({
    fieldName: '',
    dataSource: '', // Armazena a fonte de dados selecionada
  });

  const [tempConfig, setTempConfig] = useState(fieldConfig);
  const [anchorEl, setAnchorEl] = useState(null);
  const openPopover = Boolean(anchorEl);

  const handleOpenSettings = (event) => {
    setTempConfig(fieldConfig);
    setAnchorEl(event.currentTarget);
  };

  const handleCloseSettings = () => setAnchorEl(null);

  const handleApplySettings = () => {
    setFieldConfig(tempConfig);
    handleCloseSettings();
  };
  
  const handleTempChange = (name, value) => {
    setTempConfig(prev => ({ ...prev, [name]: value }));
  };

  // A bolinha acende se uma fonte de dados for selecionada
  const hasActiveSettings = () => {
    return !!fieldConfig.dataSource;
  };

  return (
    <>
      <Paper
        variant="outlined"
        sx={{
          borderRadius: '12px', border: '1px solid #d0d7e2', p: 2, mb: 2,
          display: 'flex', alignItems: 'center', gap: 2,
          height: '100%', boxSizing: 'border-box',
        }}
      >
        <IconButton onClick={onDelete} aria-label="excluir bloco" size="small" className="no-drag">
          <DeleteIcon fontSize="small" />
        </IconButton>
        {/* O Chip agora indica "Fonte de Dados" */}
        <Chip label="Fonte de Dados" size="small" />
        
        <TextField
          label="Nome do Campo"
          variant="outlined"
          size="small"
          value={fieldConfig.fieldName}
          onChange={(e) => setFieldConfig(prev => ({ ...prev, fieldName: e.target.value }))}
          sx={{ flexGrow: 1, minWidth: '150px' }}
          InputLabelProps={{ style: { fontSize: 12 } }}
          InputProps={{ style: { fontSize: 12 } }}
          className="no-drag"
        />

        {hasActiveSettings() && (
          <Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'warning.main' }} />
        )}

        <IconButton size="small" onClick={handleOpenSettings} className="no-drag">
          <MoreVertIcon />
        </IconButton>
      </Paper>

      {/* --- Painel de Configuração da Fonte de Dados --- */}
      <Popover
        open={openPopover}
        anchorEl={anchorEl}
        onClose={handleCloseSettings}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        className="no-drag"
      >
        <Box sx={{ p: 3, width: '450px' }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Selecionar Fonte de Dados</Typography>
          <Stack spacing={2}>
            <FormControl fullWidth size="small">
              <InputLabel style={{fontSize: 12}}>Fonte de Dados</InputLabel>
              <Select
                value={tempConfig.dataSource}
                label="Fonte de Dados"
                onChange={(e) => handleTempChange('dataSource', e.target.value)}
                style={{fontSize: 12}}
              >
                {dataSources.map((source) => (
                  <MenuItem key={source} value={source} sx={{fontSize: 12}}>{source}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
          
          <Stack direction="row" sx={{ mt: 3, justifyContent: 'flex-end' }}>
            <Button onClick={handleApplySettings} variant="contained" size="small">Aplicar</Button>
          </Stack>
        </Box>
      </Popover>
    </>
  );
}
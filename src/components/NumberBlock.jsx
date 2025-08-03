import React, { useState } from 'react';
import {
  Box, TextField, IconButton, Paper, Chip, FormControl, InputLabel,
  Select, MenuItem, Button, Popover, Typography, Stack
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';

// --- Listas de opções ---
const niveisRisco = ['Crítico', 'Alto', 'Médio', 'Baixo'];
const condicionais = ['Maior que', 'Menor que', 'Igual a', 'Diferente de', 'Entre'];
const formatos = ['Número Simples', 'Moeda (R$)', 'Porcentagem (%)'];

export default function NumberBlock({ onDelete }) {
  const [fieldConfig, setFieldConfig] = useState({
    fieldName: '',
    format: 'Número Simples',
    minValue: '',
    maxValue: '',
    conditional: '',
    value: '',
    riskLevel: '',
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
  const handleClearSettings = () => {
    setTempConfig({
      ...tempConfig,
      minValue: '',
      maxValue: '',
      conditional: '',
      value: '',
      riskLevel: '',
    });
  };
  const handleTempChange = (name, value) => {
    setTempConfig(prev => ({ ...prev, [name]: value }));
  };

  const hasActiveSettings = () => {
    return !!(fieldConfig.minValue || fieldConfig.maxValue || fieldConfig.conditional || fieldConfig.riskLevel);
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
        <Chip label="Numérico" size="small" />
        
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

      {/* --- Painel de Configuração Numérica --- */}
      <Popover
        open={openPopover}
        anchorEl={anchorEl}
        onClose={handleCloseSettings}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        className="no-drag"
      >
        <Box sx={{ p: 3, width: '450px' }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Configurar Campo Numérico</Typography>
          <Stack spacing={2}>
            
            <FormControl fullWidth size="small">
              <InputLabel style={{fontSize: 12}}>Formato do Número</InputLabel>
              <Select value={tempConfig.format} label="Formato do Número" onChange={(e) => handleTempChange('format', e.target.value)} style={{fontSize: 12}}>
                {formatos.map((opt) => (<MenuItem key={opt} value={opt} sx={{fontSize: 12}}>{opt}</MenuItem>))}
              </Select>
            </FormControl>

            <Typography variant="overline" sx={{ pt: 1 }}>Validação de Intervalo</Typography>
            <Stack direction="row" spacing={2}>
              <TextField label="Valor Mínimo" type="number" size="small" fullWidth value={tempConfig.minValue} onChange={(e) => handleTempChange('minValue', e.target.value)} InputLabelProps={{style: {fontSize: 12}}} InputProps={{style: {fontSize: 12}}}/>
              <TextField label="Valor Máximo" type="number" size="small" fullWidth value={tempConfig.maxValue} onChange={(e) => handleTempChange('maxValue', e.target.value)} InputLabelProps={{style: {fontSize: 12}}} InputProps={{style: {fontSize: 12}}}/>
            </Stack>

            <Typography variant="overline" sx={{ pt: 1 }}>Regra Condicional</Typography>
            <Stack direction="row" spacing={2} alignItems="center">
              <FormControl size="small" sx={{ flex: 1 }}>
                <InputLabel style={{ fontSize: 12 }}>Condicional</InputLabel>
                <Select value={tempConfig.conditional} label="Condicional" onChange={(e) => handleTempChange('conditional', e.target.value)} style={{ fontSize: 12 }}>
                  {condicionais.map((opt) => (<MenuItem key={opt} value={opt} sx={{ fontSize: 12 }}>{opt}</MenuItem>))}
                </Select>
              </FormControl>
              <TextField
                label={tempConfig.conditional === 'Entre' ? 'Valor (ex: 10;50)' : 'Valor'}
                variant="outlined"
                size="small"
                value={tempConfig.value}
                onChange={(e) => handleTempChange('value', e.target.value)}
                sx={{ flex: 1 }}
                InputLabelProps={{ style: { fontSize: 12 } }}
                InputProps={{ style: { fontSize: 12 } }}
              />
            </Stack>

            <FormControl fullWidth size="small">
              <InputLabel style={{ fontSize: 12 }}>Nível de Risco</InputLabel>
              <Select value={tempConfig.riskLevel} label="Nível de Risco" onChange={(e) => handleTempChange('riskLevel', e.target.value)} style={{ fontSize: 12 }}>
                {niveisRisco.map((opt) => (<MenuItem key={opt} value={opt} sx={{ fontSize: 12 }}>{opt}</MenuItem>))}
              </Select>
            </FormControl>

          </Stack>
          
          <Stack direction="row" spacing={1} sx={{ mt: 3, justifyContent: 'flex-end' }}>
            <Button onClick={handleClearSettings} size="small">Limpar Regras</Button>
            <Button onClick={handleApplySettings} variant="contained" size="small">Aplicar</Button>
          </Stack>
        </Box>
      </Popover>
    </>
  );
}
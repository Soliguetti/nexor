import React, { useState } from 'react';
import {
  Box, IconButton, Paper, Chip, FormControl, InputLabel, Select, MenuItem,
  Button, Popover, Typography, Stack, Checkbox, FormControlLabel
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';

// --- Lista de Documentos ---
const tiposDocumento = [
  'RG (Registro Geral)',
  'CPF (Cadastro de Pessoas Físicas)',
  'CNH (Carteira Nacional de Habilitação)',
  'Passaporte',
  'CTPS (Carteira de Trabalho e Previdência Social)',
  'Título de Eleitor',
  'Certidão de Nascimento',
  'Certidão de Casamento',
];

export default function DocumentBlock({ onDelete }) {
  const [fieldConfig, setFieldConfig] = useState({
    documentType: '',
    requirePhoto: false,
    requireSelfie: false,
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

  const hasActiveSettings = () => {
    return !!(fieldConfig.requirePhoto || fieldConfig.requireSelfie);
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
        <Chip label="Documento" size="small" />
        
        <FormControl size="small" sx={{ flexGrow: 1 }}>
          <InputLabel style={{ fontSize: 12 }}>Tipo de Documento</InputLabel>
          <Select
            value={fieldConfig.documentType}
            label="Tipo de Documento"
            onChange={(e) => setFieldConfig(prev => ({...prev, documentType: e.target.value}))}
            style={{ fontSize: 12 }}
            className="no-drag"
          >
            {tiposDocumento.map((doc) => (
              <MenuItem key={doc} value={doc} sx={{ fontSize: 12 }}>{doc}</MenuItem>
            ))}
          </Select>
        </FormControl>
        
        {hasActiveSettings() && (
          <Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'warning.main' }} />
        )}

        <IconButton size="small" onClick={handleOpenSettings} className="no-drag">
          <MoreVertIcon />
        </IconButton>
      </Paper>

      <Popover
        open={openPopover}
        anchorEl={anchorEl}
        onClose={handleCloseSettings}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        className="no-drag"
      >
        <Box sx={{ p: 3, width: '350px' }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Requisitos do Documento</Typography>
          <Stack spacing={1}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={!!tempConfig.requirePhoto}
                  onChange={(e) => handleTempChange('requirePhoto', e.target.checked)}
                />
              }
              label="Exigir Foto do Documento"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={!!tempConfig.requireSelfie}
                  onChange={(e) => handleTempChange('requireSelfie', e.target.checked)}
                />
              }
              label="Exigir Selfie c/ Documento"
            />
          </Stack>
          <Stack direction="row" sx={{ mt: 3, justifyContent: 'flex-end' }}>
            <Button onClick={handleApplySettings} variant="contained" size="small">Aplicar</Button>
          </Stack>
        </Box>
      </Popover>
    </>
  );
}
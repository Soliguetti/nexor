import React, { useState } from 'react';
import {
  Box, TextField, IconButton, Paper, Chip, FormControl, InputLabel,
  Select, MenuItem, Button, Popover, Typography, Stack, Checkbox, FormControlLabel
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';

// --- Listas de opções ---
const niveisRisco = ['Crítico', 'Alto', 'Médio', 'Baixo'];
const condicionais = ['Igual a', 'Diferente de', 'Contém', 'Não contém'];
const siglasUF = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS',
  'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC',
  'SP', 'SE', 'TO'
];

// Helper para renderizar um campo de texto com checkbox de obrigatoriedade
const RequiredTextField = ({ name, label, config, onChange }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <TextField label={label} variant="outlined" size="small" value={config[name]} onChange={(e) => onChange(name, e.target.value)} InputLabelProps={{ style: { fontSize: 12 } }} InputProps={{ style: { fontSize: 12 } }} sx={{ flexGrow: 1 }}/>
      <FormControlLabel control={ <Checkbox size="small" checked={!!config[`${name}Required`]} onChange={(e) => onChange(`${name}Required`, e.target.checked)} /> } label={<Typography sx={{ fontSize: 12 }}>Obrigatório</Typography>}/>
    </Box>
);

export default function LocationBlock({ onDelete }) {
  const [fieldConfig, setFieldConfig] = useState({
    fieldName: '',
    cep: '', cepRequired: false,
    uf: '', ufRequired: false,
    logradouro: '', logradouroRequired: false,
    numero: '', numeroRequired: false,
    complemento: '', complementoRequired: false,
    bairro: '', bairroRequired: false,
    cidade: '', cidadeRequired: false,
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

  const handleTempChange = (name, value) => {
    setTempConfig(prev => ({ ...prev, [name]: value }));
  };

  // --- FUNÇÃO ATUALIZADA para verificar configurações ativas ---
  const hasActiveSettings = () => {
    return !!(
      fieldConfig.cepRequired || fieldConfig.ufRequired || fieldConfig.logradouroRequired ||
      fieldConfig.numeroRequired || fieldConfig.complementoRequired || fieldConfig.bairroRequired ||
      fieldConfig.cidadeRequired || fieldConfig.conditional || fieldConfig.riskLevel
    );
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
        <Chip label="Localização" size="small" />
        
        <TextField
          label="Nome do Campo"
          variant="outlined"
          size="small"
          value={fieldConfig.fieldName}
          onChange={(e) => setFieldConfig(prev => ({ ...prev, fieldName: e.target.value }))}
          sx={{ flexGrow: 1, minWidth: '150px' }} // Adicionado flexGrow: 1
          InputLabelProps={{ style: { fontSize: 12 } }}
          InputProps={{ style: { fontSize: 12 } }}
          className="no-drag"
        />

        {hasActiveSettings() && (
          <Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'warning.main' }} />
        )}

        {/* O espaçador flexível foi removido para permitir que o TextField cresça */}

        <IconButton size="small" onClick={handleOpenSettings} className="no-drag">
          <MoreVertIcon />
        </IconButton>
      </Paper>

      <Popover /* O conteúdo do Popover permanece o mesmo, você já tinha acertado */
        open={openPopover}
        anchorEl={anchorEl}
        onClose={handleCloseSettings}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        className="no-drag"
      >
        <Box sx={{ p: 3, width: '500px' }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Configurar Campo de Localização</Typography>
          <Stack spacing={2}>
            <RequiredTextField name="cep" label="CEP" config={tempConfig} onChange={handleTempChange} />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <FormControl size="small" sx={{ flexGrow: 1 }}>
                <InputLabel style={{ fontSize: 12 }}>UF</InputLabel>
                <Select value={tempConfig.uf} label="UF" onChange={(e) => handleTempChange('uf', e.target.value)} style={{ fontSize: 12 }}>
                  {siglasUF.map((uf) => ( <MenuItem key={uf} value={uf} sx={{ fontSize: 12 }}>{uf}</MenuItem> ))}
                </Select>
              </FormControl>
              <FormControlLabel control={ <Checkbox size="small" checked={!!tempConfig.ufRequired} onChange={(e) => handleTempChange('ufRequired', e.target.checked)} /> } label={<Typography sx={{ fontSize: 12 }}>Obrigatório</Typography>} />
            </Box>
            <RequiredTextField name="cidade" label="Cidade" config={tempConfig} onChange={handleTempChange} />
            <RequiredTextField name="bairro" label="Bairro" config={tempConfig} onChange={handleTempChange} />
            <RequiredTextField name="logradouro" label="Logradouro" config={tempConfig} onChange={handleTempChange} />
            <RequiredTextField name="numero" label="Número" config={tempConfig} onChange={handleTempChange} />
            <RequiredTextField name="complemento" label="Complemento" config={tempConfig} onChange={handleTempChange} />
            <Typography variant="overline" sx={{ pt: 1 }}>Regra Condicional</Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <FormControl size="small" sx={{ flex: 1 }}>
                <InputLabel style={{ fontSize: 12 }}>Condicional</InputLabel>
                <Select value={tempConfig.conditional} label="Condicional" onChange={(e) => handleTempChange('conditional', e.target.value)} style={{ fontSize: 12 }}>
                  {condicionais.map((opt) => (<MenuItem key={opt} value={opt} sx={{ fontSize: 12 }}>{opt}</MenuItem>))}
                </Select>
              </FormControl>
              <TextField label="Valor" variant="outlined" size="small" value={tempConfig.value} onChange={(e) => handleTempChange('value', e.target.value)} sx={{ flex: 1 }} InputLabelProps={{ style: { fontSize: 12 } }} InputProps={{ style: { fontSize: 12 } }} />
            </Box>
            <FormControl fullWidth size="small">
              <InputLabel style={{ fontSize: 12 }}>Nível de Risco</InputLabel>
              <Select value={tempConfig.riskLevel} label="Nível de Risco" onChange={(e) => handleTempChange('riskLevel', e.target.value)} style={{ fontSize: 12 }}>
                {niveisRisco.map((opt) => (<MenuItem key={opt} value={opt} sx={{ fontSize: 12 }}>{opt}</MenuItem>))}
              </Select>
            </FormControl>
          </Stack>
          <Stack direction="row" spacing={1} sx={{ mt: 3, justifyContent: 'flex-end' }}>
            <Button onClick={handleApplySettings} variant="contained" size="small">Aplicar</Button>
          </Stack>
        </Box>
      </Popover>
    </>
  );
}
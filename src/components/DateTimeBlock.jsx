import React, { useState } from 'react';
import {
  Box, TextField, IconButton, Paper, Chip, FormControl, InputLabel,
  Select, MenuItem, Button, Popover, Typography, Stack
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { LocalizationProvider, DatePicker, TimePicker, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ptBR } from 'date-fns/locale/pt-BR';

// --- Listas de opções ---
const niveisRisco = ['Crítico', 'Alto', 'Médio', 'Baixo'];
const condicionais = ['Posterior a', 'Anterior a', 'Igual a', 'Diferente de'];
const tiposData = ['Data e Hora', 'Apenas Data', 'Apenas Hora'];

export default function DateTimeBlock({ onDelete }) {
  // 1. State principal unificado para toda a configuração do bloco
  const [fieldConfig, setFieldConfig] = useState({
    fieldName: '',
    dataType: 'Data e Hora', // Tipo padrão
    conditional: '',
    value: null, // O valor agora pode ser um objeto Date
    riskLevel: '',
  });

  // State temporário para edição dentro do Popover
  const [tempConfig, setTempConfig] = useState(fieldConfig);
  const [anchorEl, setAnchorEl] = useState(null);
  const openPopover = Boolean(anchorEl);

  // --- Funções para gerenciar o Popover ---
  const handleOpenSettings = (event) => {
    setTempConfig(fieldConfig);
    setAnchorEl(event.currentTarget);
  };

  const handleCloseSettings = () => {
    setAnchorEl(null);
  };

  const handleApplySettings = () => {
    setFieldConfig(tempConfig);
    handleCloseSettings();
  };

  const handleClearSettings = () => {
    setTempConfig({
      ...tempConfig,
      conditional: '',
      value: null,
      riskLevel: '',
    });
  };
  
  // --- Renderiza o seletor de data/hora correto baseado no tipo ---
  const renderValuePicker = () => {
    const pickerProps = {
      label: "Valor",
      value: tempConfig.value,
      onChange: (newValue) => setTempConfig(prev => ({ ...prev, value: newValue })),
      slotProps: {
        textField: {
          size: 'small',
          fullWidth: true,
          InputLabelProps: { style: { fontSize: 12 } },
          InputProps: { style: { fontSize: 12 } },
        }
      }
    };

    switch (tempConfig.dataType) {
      case 'Apenas Data':
        return <DatePicker {...pickerProps} />;
      case 'Apenas Hora':
        return <TimePicker {...pickerProps} />;
      case 'Data e Hora':
      default:
        return <DateTimePicker {...pickerProps} />;
    }
  };
  
  // --- FUNÇÃO ATUALIZADA para verificar se há configurações ativas ---
  const hasActiveSettings = () => {
    return !!(fieldConfig.conditional || fieldConfig.riskLevel);
  };

  return (
    // O provider do date-fns precisa envolver o componente
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
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
        <Chip label="Data / Horário" size="small" />
        
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

        {/* --- INDICADOR VISUAL NO LUGAR DOS CHIPS --- */}
        {hasActiveSettings() && (
            <Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'warning.main' }} />
        )}

        {/* O espaçador foi removido para o TextField crescer */}

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
        <Box sx={{ p: 3, width: '450px' }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Configurar Campo de Data/Horário</Typography>
          <Stack spacing={2}>
            
            <FormControl fullWidth size="small">
              <InputLabel style={{ fontSize: 12 }}>Tipo de Dado</InputLabel>
              <Select
                value={tempConfig.dataType}
                label="Tipo de Dado"
                onChange={(e) => setTempConfig(prev => ({...prev, dataType: e.target.value, value: null}))} // Reseta o valor ao mudar o tipo
                style={{ fontSize: 12 }}
              >
                {tiposData.map((opt) => (<MenuItem key={opt} value={opt} sx={{ fontSize: 12 }}>{opt}</MenuItem>))}
              </Select>
            </FormControl>

            <Box sx={{ display: 'flex', gap: 2 }}>
              <FormControl size="small" sx={{ flex: 1 }}>
                <InputLabel style={{ fontSize: 12 }}>Condicional</InputLabel>
                <Select value={tempConfig.conditional} label="Condicional" onChange={(e) => setTempConfig(prev => ({...prev, conditional: e.target.value}))} style={{ fontSize: 12 }}>
                  {condicionais.map((opt) => (<MenuItem key={opt} value={opt} sx={{ fontSize: 12 }}>{opt}</MenuItem>))}
                </Select>
              </FormControl>

              {/* O seletor dinâmico de data/hora entra aqui */}
              <Box sx={{ flex: 1 }}>
                {renderValuePicker()}
              </Box>
            </Box>

            <FormControl fullWidth size="small">
              <InputLabel style={{ fontSize: 12 }}>Nível de Risco</InputLabel>
              <Select value={tempConfig.riskLevel} label="Nível de Risco" onChange={(e) => setTempConfig(prev => ({...prev, riskLevel: e.target.value}))} style={{ fontSize: 12 }}>
                {niveisRisco.map((opt) => (<MenuItem key={opt} value={opt} sx={{ fontSize: 12 }}>{opt}</MenuItem>))}
              </Select>
            </FormControl>

          </Stack>
          
          <Stack direction="row" spacing={1} sx={{ mt: 3, justifyContent: 'flex-end' }}>
            <Button onClick={handleClearSettings} size="small">Limpar</Button>
            <Button onClick={handleApplySettings} variant="contained" size="small">Aplicar</Button>
          </Stack>
        </Box>
      </Popover>
    </LocalizationProvider>
  );
}
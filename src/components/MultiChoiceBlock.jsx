import React, { useState } from 'react';
import {
  Box, TextField, IconButton, Paper, Chip, FormControl, InputLabel,
  Select, MenuItem, Button, Popover, Typography, Stack, RadioGroup, FormControlLabel, Radio, Checkbox
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';

// --- Listas de opções ---
const niveisRisco = ['Nenhum', 'Crítico', 'Alto', 'Médio', 'Baixo'];
const selectionTypes = ['Seleção Única (Obrigatória)', 'Seleção Única (Opcional)', 'Múltipla Escolha'];

// Componente auxiliar para gerenciar as opções da lista
const OptionsEditor = ({ options, onOptionChange, onAddOption, onRemoveOption }) => (
  <Stack spacing={1.5}>
    <Typography variant="overline">Opções de Resposta</Typography>
    {options.map((option, index) => (
      <Stack direction="row" spacing={1} key={option.id} alignItems="center">
        <TextField
          label={`Opção ${index + 1}`}
          size="small"
          value={option.label}
          onChange={(e) => onOptionChange(option.id, 'label', e.target.value)}
          sx={{ flex: 2 }}
          InputLabelProps={{ style: { fontSize: 12 } }}
          InputProps={{ style: { fontSize: 12 } }}
        />
        <FormControl size="small" sx={{ flex: 1 }}>
          <InputLabel style={{ fontSize: 12 }}>Risco</InputLabel>
          <Select
            value={option.risk}
            label="Risco"
            onChange={(e) => onOptionChange(option.id, 'risk', e.target.value)}
            style={{ fontSize: 12 }}
          >
            {niveisRisco.map((risk) => (
              <MenuItem key={risk} value={risk} sx={{ fontSize: 12 }}>{risk}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <IconButton onClick={() => onRemoveOption(option.id)} size="small"><DeleteIcon fontSize="inherit" /></IconButton>
      </Stack>
    ))}
    <Button startIcon={<AddIcon />} onClick={onAddOption} size="small" sx={{ alignSelf: 'flex-start' }}>
      Adicionar Opção
    </Button>
  </Stack>
);

export default function MultiChoiceBlock({ onDelete }) {
  const [fieldConfig, setFieldConfig] = useState({
    fieldName: '',
    selectionType: 'Seleção Única (Obrigatória)',
    options: [{ id: Date.now(), label: '', risk: 'Nenhum' }],
  });

  const [tempConfig, setTempConfig] = useState(fieldConfig);
  const [anchorEl, setAnchorEl] = useState(null);
  const openPopover = Boolean(anchorEl);

  const handleOpenSettings = (event) => {
    // Clona as opções para evitar mutação direta do estado
    setTempConfig({
      ...fieldConfig,
      options: JSON.parse(JSON.stringify(fieldConfig.options))
    });
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
  
  // Funções para manipular as opções no estado temporário
  const handleOptionChange = (id, field, value) => {
    const newOptions = tempConfig.options.map(opt => 
      opt.id === id ? { ...opt, [field]: value } : opt
    );
    setTempConfig(prev => ({ ...prev, options: newOptions }));
  };

  const handleAddOption = () => {
    const newOptions = [...tempConfig.options, { id: Date.now(), label: '', risk: 'Nenhum' }];
    setTempConfig(prev => ({ ...prev, options: newOptions }));
  };

  const handleRemoveOption = (id) => {
    // Não permite remover a última opção
    if (tempConfig.options.length <= 1) return;
    const newOptions = tempConfig.options.filter(opt => opt.id !== id);
    setTempConfig(prev => ({ ...prev, options: newOptions }));
  };

  const hasActiveSettings = () => {
    // Considera ativo se tiver mais de uma opção ou se a única opção tiver um risco definido
    return fieldConfig.options.length > 1 || (fieldConfig.options[0] && fieldConfig.options[0].risk !== 'Nenhum');
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
        <Chip label="Múltipla Escolha" size="small" />
        
        <TextField
          label="Nome do Campo (Pergunta)"
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

      <Popover
        open={openPopover}
        anchorEl={anchorEl}
        onClose={handleCloseSettings}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        className="no-drag"
      >
        <Box sx={{ p: 3, width: '500px' }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Configurar Múltipla Escolha</Typography>
          <Stack spacing={2}>
            <FormControl fullWidth size="small">
              <InputLabel style={{fontSize: 12}}>Tipo de Seleção</InputLabel>
              <Select value={tempConfig.selectionType} label="Tipo de Seleção" onChange={(e) => handleTempChange('selectionType', e.target.value)} style={{fontSize: 12}}>
                {selectionTypes.map((type) => (
                  <MenuItem key={type} value={type} sx={{fontSize: 12}}>{type}</MenuItem>
                ))}
              </Select>
            </FormControl>
            
            <OptionsEditor
              options={tempConfig.options}
              onOptionChange={handleOptionChange}
              onAddOption={handleAddOption}
              onRemoveOption={handleRemoveOption}
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
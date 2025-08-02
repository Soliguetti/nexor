import React, { useState } from 'react';
import { Box, TextField, IconButton, Paper, Chip, FormControl, InputLabel, Select, MenuItem, Menu } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

const niveisRisco = ['Crítico', 'Alto', 'Médio', 'Baixo'];
const condicionais = ['Maior que', 'Menor que', 'Igual a', 'Diferente de'];
const granularidades = ['Anos', 'Meses', 'Semanas', 'Dias'];

// Mapeamento atualizado: a opção 'Valor' foi removida
const allFilters = {
  riskLevel: { label: 'Nível de Risco', component: 'Select', options: niveisRisco },
  conditional: { label: 'Condicional', component: 'Select', options: condicionais },
  granularity: { label: 'Granularidade', component: 'Select', options: granularidades },
};

export default function DateTimeBlock({ onDelete }) {
  const [fieldValues, setFieldValues] = useState({
    riskLevel: '',
    conditional: '',
    value: '', // O state para o valor ainda é necessário
    granularity: '',
  });
  const [visibleFilters, setVisibleFilters] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleFieldChange = (name, value) => {
    setFieldValues(prev => ({ ...prev, [name]: value }));
  };

  const handleAddClick = (e) => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
  };
  
  const handleMenuClose = () => setAnchorEl(null);

  const handleAddFilter = (filterKey) => {
    setVisibleFilters([...visibleFilters, filterKey]);
    handleMenuClose();
  };

  const handleRemoveFilter = (filterKeyToRemove) => {
    setVisibleFilters(prev => prev.filter(key => key !== filterKeyToRemove));
    handleFieldChange(filterKeyToRemove, '');
    // Se remover a condicional, também limpa o valor
    if (filterKeyToRemove === 'conditional') {
      handleFieldChange('value', '');
    }
  };

  const availableFilters = Object.keys(allFilters).filter(key => !visibleFilters.includes(key));

  const renderFilter = (key) => {
    const filter = allFilters[key];
    return (
      <Box key={key} sx={{ position: 'relative' }}>
        <IconButton
          size="small"
          onClick={() => handleRemoveFilter(key)}
          className="no-drag"
          sx={{
            position: 'absolute', top: -10, right: -10, zIndex: 1,
            backgroundColor: 'white', border: '1px solid #e0e0e0',
            width: 20, height: 20, '&:hover': { backgroundColor: 'grey.100' }
          }}
        >
          <CloseIcon sx={{ fontSize: 14 }} />
        </IconButton>

        {key === 'conditional' && (
          <Box sx={{ display: 'flex', gap: 2 }}>
            <FormControl size="small" sx={{ minWidth: 140 }} className="no-drag">
              <InputLabel style={{ fontSize: 12 }}>{filter.label}</InputLabel>
              <Select value={fieldValues[key]} label={filter.label} onChange={(e) => handleFieldChange(key, e.target.value)} style={{ fontSize: 12 }}>
                {filter.options.map((opt) => (<MenuItem key={opt} value={opt} sx={{ fontSize: 12 }}>{opt}</MenuItem>))}
              </Select>
            </FormControl>
            <TextField
              label="Valor"
              variant="outlined"
              size="small"
              value={fieldValues.value}
              onChange={(e) => handleFieldChange('value', e.target.value)}
              sx={{ width: '120px' }}
              InputLabelProps={{ style: { fontSize: 12 } }}
              InputProps={{ style: { fontSize: 12 } }}
              className="no-drag"
            />
          </Box>
        )}

        {(key === 'riskLevel' || key === 'granularity') && (
           <FormControl size="small" sx={{ minWidth: 140 }} className="no-drag">
            <InputLabel style={{ fontSize: 12 }}>{filter.label}</InputLabel>
            <Select value={fieldValues[key]} label={filter.label} onChange={(e) => handleFieldChange(key, e.target.value)} style={{ fontSize: 12 }}>
              {filter.options.map((opt) => (<MenuItem key={opt} value={opt} sx={{ fontSize: 12 }}>{opt}</MenuItem>))}
            </Select>
          </FormControl>
        )}
      </Box>
    );
  };

  return (
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
        sx={{ flexGrow: 1 }}
        InputLabelProps={{ style: { fontSize: 12 } }}
        InputProps={{ style: { fontSize: 12 } }}
        className="no-drag"
      />
      {visibleFilters.map(key => renderFilter(key))}
      {availableFilters.length > 0 && (
        <>
          <IconButton size="small" onClick={handleAddClick} className="no-drag" aria-label="adicionar filtro">
            <AddIcon />
          </IconButton>
          <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
            {availableFilters.map(key => (
              <MenuItem key={key} onClick={() => handleAddFilter(key)} sx={{ fontSize: 12 }}>
                {allFilters[key].label}
              </MenuItem>
            ))}
          </Menu>
        </>
      )}
    </Paper>
  );
}
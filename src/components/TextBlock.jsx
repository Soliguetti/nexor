import React, { useState } from 'react';
import {
  Box, TextField, IconButton, Paper, Chip, FormControl, InputLabel,
  Select, MenuItem, Button, Popover, Typography, Stack
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';

// --- Listas de opções (sem alterações) ---
const niveisRisco = ['Crítico', 'Alto', 'Médio', 'Baixo'];
const condicionais = ['Maior que', 'Menor que', 'Igual a', 'Diferente de'];
const mascaras = [
  'CPF', 'CNPJ', 'Data de Nascimento (DD/MM/AAAA)', 'Telefone (com DDD)',
  'Celular (com DDD)', 'CEP', 'Cartão de Crédito', 'Validade do Cartão (MM/AA)',
  'CVV', 'Placa de Veículo (Mercosul)', 'Placa de Veículo (Antiga)', 'Renavam',
  'Processo Judicial', 'Título de Eleitor', 'PIS/PASEP', 'Dinheiro (R$)',
  'Porcentagem (%)', 'Apenas Números', 'Apenas Letras', 'Email',
];

// 1. O componente agora recebe 'config' e 'onConfigChange' como props
export default function TextBlock({ onDelete, config, onConfigChange }) {
  // O estado de configuração principal foi removido.
  
  // O estado temporário é inicializado como nulo. Ele só existirá quando o popover estiver aberto.
  const [tempConfig, setTempConfig] = useState(null); 
  const [anchorEl, setAnchorEl] = useState(null);
  const openPopover = Boolean(anchorEl);

  const handleOpenSettings = (event) => {
    setTempConfig(config); // Carrega a configuração atual (recebida via props) no estado temporário
    setAnchorEl(event.currentTarget);
  };

  const handleCloseSettings = () => {
    setTempConfig(null); // Limpa o estado temporário ao fechar
    setAnchorEl(null);
  };

  const handleApplySettings = () => {
    onConfigChange(tempConfig); // Envia a nova configuração para o componente pai
    handleCloseSettings();
  };

  const handleClearSettings = () => {
    const cleared = { ...tempConfig, riskLevel: '', conditional: '', value: '', mask: '', limit: '' };
    setTempConfig(cleared);
  };
  
  // Função para atualizar o estado temporário dentro do Popover
  const handleTempFieldChange = (name, value) => {
    setTempConfig(prev => ({ ...prev, [name]: value }));
  };
  
  // Função para atualizar o nome do campo diretamente no pai (sem precisar abrir o popover)
  const handleFieldNameChange = (e) => {
    onConfigChange({ ...config, fieldName: e.target.value });
  };
  
  const hasActiveSettings = () => {
    // A verificação agora é feita diretamente na prop 'config'
    return !!(config.riskLevel || config.conditional || config.mask || config.limit);
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
        <Chip label="Texto" size="small" />
        
        <TextField
          label="Nome do Campo"
          variant="outlined"
          size="small"
          value={config.fieldName} // Lê o valor diretamente da prop 'config'
          onChange={handleFieldNameChange} // Chama a função que atualiza o pai
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

      {/* O Popover só renderiza seu conteúdo se tempConfig não for nulo */}
      {tempConfig && (
        <Popover
          open={openPopover}
          anchorEl={anchorEl}
          onClose={handleCloseSettings}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          className="no-drag"
        >
          <Box sx={{ p: 3, width: '450px' }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Configurar Campo de Texto</Typography>
            <Stack spacing={2}>
              {/* Máscara */}
              <FormControl fullWidth size="small">
                <InputLabel style={{ fontSize: 12 }}>Máscara</InputLabel>
                <Select
                  value={tempConfig.mask}
                  label="Máscara"
                  onChange={(e) => handleTempFieldChange('mask', e.target.value)}
                  style={{ fontSize: 12 }}
                >
                  {mascaras.map((opt) => (<MenuItem key={opt} value={opt} sx={{ fontSize: 12 }}>{opt}</MenuItem>))}
                </Select>
              </FormControl>

              {/* Limite */}
              <TextField
                label="Limite de Caracteres"
                type="number"
                size="small"
                value={tempConfig.limit}
                onChange={(e) => handleTempFieldChange('limit', e.target.value)}
                InputLabelProps={{ style: { fontSize: 12 } }}
                InputProps={{ style: { fontSize: 12 } }}
              />
              
              {/* Grupo Condicional */}
              <Box sx={{ display: 'flex', gap: 2 }}>
                <FormControl size="small" sx={{ flex: 1 }}>
                  <InputLabel style={{ fontSize: 12 }}>Condicional</InputLabel>
                  <Select value={tempConfig.conditional} label="Condicional" onChange={(e) => handleTempFieldChange('conditional', e.target.value)} style={{ fontSize: 12 }}>
                    {condicionais.map((opt) => (<MenuItem key={opt} value={opt} sx={{ fontSize: 12 }}>{opt}</MenuItem>))}
                  </Select>
                </FormControl>
                <TextField label="Valor" variant="outlined" size="small" value={tempConfig.value} onChange={(e) => handleTempFieldChange('value', e.target.value)} sx={{ flex: 1 }} InputLabelProps={{ style: { fontSize: 12 } }} InputProps={{ style: { fontSize: 12 } }} />
              </Box>

              {/* Nível de Risco */}
              <FormControl fullWidth size="small">
                <InputLabel style={{ fontSize: 12 }}>Nível de Risco</InputLabel>
                <Select value={tempConfig.riskLevel} label="Nível de Risco" onChange={(e) => handleTempFieldChange('riskLevel', e.target.value)} style={{ fontSize: 12 }}>
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
      )}
    </>
  );
}
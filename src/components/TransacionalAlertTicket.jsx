import React, { useState } from 'react';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import {
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Paper,
  Stack,
  Collapse,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CodeIcon from '@mui/icons-material/Code';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const niveis = ['Baixo', 'Médio', 'Alto', 'Crítico'];

export default function TransacionalAlertTicket({ onDelete }) {
  const [nomeAlerta, setNomeAlerta] = useState('');
  const [pontuacao, setPontuacao] = useState('');
  const [nivelAlerta, setNivelAlerta] = useState('');
  const [descricao, setDescricao] = useState('');
  const [open, setOpen] = useState(false);

  return (
    <Paper
      variant="outlined"
      sx={{
        borderRadius: '12px',
        border: '1px solid #d0d7e2',
        px: 3,
        py: 2,
        mb: 2,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
        
        <Box sx={{ pt: 1 }}>
          <IconButton onClick={onDelete} size="small">
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>

        {/* Container principal dos campos, que vai crescer para preencher o espaço */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
          
          {/* Linha superior de campos */}
          <Stack direction="row" spacing={2}>
            <TextField
              label="Nome do Alerta"
              variant="outlined"
              size="small"
              value={nomeAlerta}
              onChange={(e) => setNomeAlerta(e.target.value)}
              sx={{ flexGrow: 1 }} // Faz este campo crescer e ocupar o espaço
              InputLabelProps={{ style: { fontSize: 12 } }}
              InputProps={{ style: { fontSize: 12 } }}
            />
            <TextField
              label="Pontuação"
              variant="outlined"
              size="small"
              value={pontuacao}
              onChange={(e) => setPontuacao(e.target.value)}
              sx={{ width: 120 }} // Mantém uma largura mais fixa para a pontuação
              InputLabelProps={{ style: { fontSize: 12 } }}
              InputProps={{ style: { fontSize: 12 } }}
            />
          </Stack>

          {/* Linha inferior de campos */}
          <Stack direction="row" alignItems="center">
            <TextField
              fullWidth // Faz o campo ocupar 100% do seu container (a Stack)
              label="Descrição"
              variant="outlined"
              size="small"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              InputLabelProps={{ style: { fontSize: 12 } }}
              InputProps={{ style: { fontSize: 12 } }}
            />
            <IconButton
              onClick={() => setOpen(!open)}
              sx={{
                transition: 'transform 0.3s',
                transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
              }}
            >
              <ExpandMoreIcon />
            </IconButton>
          </Stack>
        </Box>

        {/* Container dos botões da direita */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <IconButton size="small" sx={{ '&:hover': { backgroundColor: 'action.hover' } }}>
            <CodeIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" sx={{ '&:hover': { backgroundColor: 'action.hover' } }}>
            <AutoFixHighIcon fontSize="small" />
          </IconButton>
          <FormControl size="small" sx={{ minWidth: 160 }}>
            <InputLabel style={{ fontSize: 12 }}>Nível Alerta</InputLabel>
            <Select
              value={nivelAlerta}
              label="Nível Alerta"
              onChange={(e) => setNivelAlerta(e.target.value)}
              style={{ fontSize: 12 }}
            >
              {niveis.map((n) => (
                <MenuItem key={n} value={n} sx={{ fontSize: 12 }}>{n}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <IconButton
            sx={{
              cursor: 'grab',
              color: 'grey.500',
              '&:active': { cursor: 'grabbing' },
              '&:hover': { backgroundColor: 'action.hover' }
            }}
            title="Arraste para reordenar"
          >
            <DragIndicatorIcon />
          </IconButton>
        </Box>
      </Box>

      <Collapse in={open} timeout="auto" sx={{ pt: 2, pl: '52px' /* Alinha com os campos */ }}>
        <Box
          sx={{
            width: '100%',
            height: 180,
            backgroundColor: 'grey.100',
            borderRadius: 2,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'grey.600',
            fontSize: 14,
            fontWeight: 500,
            textAlign: 'center',
          }}
        >
          SUA REGRA APARECERÁ AQUI
        </Box>
      </Collapse>
    </Paper>
  );
}
import React, { useState } from 'react';

// Imports de componentes da MUI
import { Box, Button, Drawer, Typography, Stack, Select, MenuItem, FormControl, InputLabel, TextField, IconButton, Fab } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';

// Imports para o Date Picker
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { ptBR } from 'date-fns/locale/pt-BR';

export default function FilterSidebar({ showAddButton = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const [dateRange, setDateRange] = useState([null, null]);
  const [tma, setTma] = useState('');
  const [regras, setRegras] = useState('');

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setIsOpen(open);
  };

  const list = () => (
    <Box
      sx={{
        width: 350,
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
      role="presentation"
    >
      <Box sx={{ padding: '20px' }}>
        <Typography variant="h6" fontSize={20} component="div">
          Filtros
        </Typography>
        <IconButton
          aria-label="close"
          onClick={toggleDrawer(false)}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      <Box sx={{ flexGrow: 1, overflowY: 'auto', padding: '0 16px' }}>
        <Stack spacing={2.5}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <DatePicker
              label="Data Inicial"
              value={dateRange[0]}
              onChange={(newValue) => setDateRange([newValue, dateRange[1]])}
              slotProps={{
                textField: {
                  size: 'small',
                  InputLabelProps: { style: { fontSize: 12 } },
                  InputProps: { style: { fontSize: 12 } }
                }
              }}
              sx={{ width: '48%' }}
            />
            <Typography variant="caption" sx={{ mx: 2 }}>
              até
            </Typography>
            <DatePicker
              label="Data Final"
              value={dateRange[1]}
              onChange={(newValue) => setDateRange([dateRange[0], newValue])}
              slotProps={{
                textField: {
                  size: 'small',
                  InputLabelProps: { style: { fontSize: 12 } },
                  InputProps: { style: { fontSize: 12 } }
                }
              }}
              sx={{ width: '48%' }}
            />
          </Box>

          <TextField
            label="ID do Alerta"
            variant="outlined"
            size="small"
            InputLabelProps={{ style: { fontSize: 12 } }}
            InputProps={{ style: { fontSize: 12 } }}
          />

          <FormControl fullWidth size="small">
            <InputLabel style={{ fontSize: 12 }}>TMA</InputLabel>
            <Select
              value={tma}
              label="TMA"
              onChange={(e) => setTma(e.target.value)}
              style={{ fontSize: 12 }}
            >
              <MenuItem value={10} sx={{ fontSize: 12 }}>Opção TMA 1</MenuItem>
              <MenuItem value={20} sx={{ fontSize: 12 }}>Opção TMA 2</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth size="small">
            <InputLabel style={{ fontSize: 12 }}>Regras</InputLabel>
            <Select
              value={regras}
              label="Regras"
              onChange={(e) => setRegras(e.target.value)}
              style={{ fontSize: 12 }}
            >
              <MenuItem value={'regra-a'} sx={{ fontSize: 12 }}>Regra A</MenuItem>
              <MenuItem value={'regra-b'} sx={{ fontSize: 12 }}>Regra B</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Box>

      <Box sx={{ padding: '16px', marginTop: 'auto' }}>
        <Button
          variant="contained"
          fullWidth
          sx={{ margin: '0 0 10px 0', height: '40px' }}
        >
          Filtrar
        </Button>
        <Button
          variant="outlined"
          fullWidth
          sx={{ margin: '0 0 10px 0', height: '40px' }}
          onClick={toggleDrawer(false)}
        >
          Cancelar
        </Button>
      </Box>
    </Box>
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
      <Box sx={{
        position: 'fixed',
        bottom: 32,
        right: 32,
        zIndex: 1050,
      }}>
        <Stack direction="row" spacing={2}>
          <Fab color="primary" aria-label="filtro" onClick={toggleDrawer(true)}>
            <FilterListIcon />
          </Fab>

          {showAddButton && (
            <Fab color="secondary" aria-label="adicionar">
              <AddIcon />
            </Fab>
          )}
        </Stack>
        <Drawer
          anchor="right"
          open={isOpen}
          onClose={toggleDrawer(false)}
        >
          {list()}
        </Drawer>
      </Box>
    </LocalizationProvider>
  );
}
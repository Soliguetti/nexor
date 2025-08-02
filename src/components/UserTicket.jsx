import React, { useState } from 'react';
import { Box, Typography, Button, Stack, Paper, Menu, MenuItem, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

export default function UserTicket({ user, onDelete }) {
  // States para controlar o texto dos botões
  const [status, setStatus] = useState('Status');
  const [accessLevel, setAccessLevel] = useState('Nível de Acesso');
  const [openConfirm, setOpenConfirm] = useState(false); // Estado para o diálogo de confirmação

  // States para controlar a abertura dos menus
  const [anchorElStatus, setAnchorElStatus] = useState(null);
  const [anchorElAccess, setAnchorElAccess] = useState(null);
  const openStatusMenu = Boolean(anchorElStatus);
  const openAccessMenu = Boolean(anchorElAccess);

  // Funções para abrir os menus
  const handleStatusClick = (event) => setAnchorElStatus(event.currentTarget);
  const handleAccessClick = (event) => setAnchorElAccess(event.currentTarget);

  // Funções para fechar os menus e atualizar o texto
  const handleStatusSelect = (newStatus) => {
    setStatus(newStatus);
    setAnchorElStatus(null);
  };
  const handleAccessSelect = (newLevel) => {
    setAccessLevel(newLevel);
    setAnchorElAccess(null);
  };

  // Funções para controlar o diálogo de confirmação
  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleConfirmDelete = () => {
    onDelete(user.id);
    handleCloseConfirm();
  };

  return (
    <>
      <Paper
        variant="outlined"
        sx={{
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderColor: '#e0e0e0',
          borderRadius: '15px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
          border: 'none',
        }}
      >
        <Stack direction="row" spacing={3} alignItems="center">
          <Typography variant="body1" fontWeight="bold">#{user.id}</Typography>
          <Typography variant="body1" fontWeight="bold">{user.name}</Typography>
          <Typography variant="body2" color="text.secondary">{user.timestamp}</Typography>
          <Typography variant="body2" color="text.secondary">{user.email}</Typography>
        </Stack>

        <Stack direction="row" spacing={1}>
          <Button variant="outlined" size="small" onClick={handleOpenConfirm}>Excluir</Button>

          <Button variant="outlined" size="small" >Bloquear</Button>
          
          {/* Botão de Status com Menu */}
          <Button variant="outlined" size="small">{status}</Button>

          {/* Botão de Nível de Acesso com Menu */}
          <Button variant="outlined" size="small" onClick={handleAccessClick}>{accessLevel}</Button>
          <Menu anchorEl={anchorElAccess} open={openAccessMenu} onClose={() => setAnchorElAccess(null)}>
            <MenuItem onClick={() => handleAccessSelect('Proprietário')}>Proprietário</MenuItem>
            <MenuItem onClick={() => handleAccessSelect('Administrador')}>Administrador</MenuItem>
            <MenuItem onClick={() => handleAccessSelect('Supervisão')}>Supervisão</MenuItem>
            <MenuItem onClick={() => handleAccessSelect('Operacional')}>Operacional</MenuItem>
            <MenuItem onClick={() => handleAccessSelect('Leitor')}>Leitor</MenuItem>
          </Menu>
        </Stack>
      </Paper>

      <Dialog open={openConfirm} onClose={handleCloseConfirm}>
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Essa operação não poderá ser desfeita. Deseja continuar?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirm}>Cancelar</Button>
          <Button onClick={handleConfirmDelete} autoFocus>Confirmar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
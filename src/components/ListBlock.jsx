import React, { useState } from 'react';
import {
  Box, TextField, IconButton, Paper, Chip, Button, Dialog,
  DialogActions, DialogContent, DialogTitle, List, ListItem, ListItemText, ListItemSecondaryAction
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

export default function ListBlock({ onDelete }) {
  const [fieldName, setFieldName] = useState('');
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState('');

  const handleOpen = () => {
    setCurrentItem('');
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleAddItem = () => {
    if (currentItem.trim()) {
      setItems([...items, currentItem.trim()]);
    }
    handleClose();
  };

  const handleRemoveItem = (itemToRemove) => {
    setItems(items.filter(item => item !== itemToRemove));
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
        <Chip label="Lista" size="small" />
        
        <TextField
          label="Nome do Campo"
          variant="outlined"
          size="small"
          value={fieldName}
          onChange={(e) => setFieldName(e.target.value)}
          sx={{ flexGrow: 1, minWidth: '150px' }}
          InputLabelProps={{ style: { fontSize: 12 } }}
          InputProps={{ style: { fontSize: 12 } }}
          className="no-drag"
        />

        <Chip
          label={`+${items.length}`}
          size="small"
          variant="outlined"
          sx={{ fontWeight: 500 }}
        />
        
        <IconButton size="small" onClick={handleOpen} className="no-drag" aria-label="adicionar item à lista">
          <AddIcon />
        </IconButton>
      </Paper>

      {/* --- Janela para adicionar e ver itens --- */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
        <DialogTitle>Itens {fieldName}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            <TextField
              autoFocus
              label="Novo item"
              fullWidth
              variant="standard"
              value={currentItem}
              onChange={(e) => setCurrentItem(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddItem()}
            />
            <Button onClick={handleAddItem}>Adicionar</Button>
          </Box>
          <List dense>
            {items.map((item, index) => (
              <ListItem key={index} disablePadding>
                <ListItemText primary={item} />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveItem(item)} size="small">
                    <DeleteIcon fontSize="inherit" />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Fechar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
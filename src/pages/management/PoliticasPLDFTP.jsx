import React, { useState, useRef, useLayoutEffect } from 'react';
import { Box, Button, Drawer, Typography, List, ListItem, ListItemButton, ListItemText, ListItemIcon, TextField, Stack, Paper, Divider } from '@mui/material';
import GridLayout from 'react-grid-layout';

// --- Ícones ---
import DehazeIcon from '@mui/icons-material/Dehaze';
import TextFieldIcon from '@mui/icons-material/TextFields';
import ScheduleIcon from '@mui/icons-material/Schedule';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import GridOnIcon from '@mui/icons-material/GridOn';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import DescriptionIcon from '@mui/icons-material/Description';
import StorageIcon from '@mui/icons-material/Storage';
import NumbersIcon from '@mui/icons-material/Numbers';
import ChecklistIcon from '@mui/icons-material/Checklist';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SaveIcon from '@mui/icons-material/Save'; // ÍCONE NOVO

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

// --- Componentes de Bloco ---
import SessionBlock from '../../components/SessionBlock';
import TextBlock from '../../components/TextBlock';
import DateTimeBlock from '../../components/DateTimeBlock';
import LocationBlock from '../../components/LocationBlock';
import MatrixBlock from '../../components/MatrixBlock';
import ListBlock from '../../components/ListBlock';
import DocumentBlock from '../../components/DocumentBlock';
import APIBlock from '../../components/APIBlock';
import NumberBlock from '../../components/NumberBlock';
import MultiChoiceBlock from '../../components/MultiChoiceBlock';

const useContainerWidth = () => {
  const ref = useRef(null);
  const [width, setWidth] = useState(1);
  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new ResizeObserver((entries) => {
      setWidth(entries[0].contentRect.width);
    });
    observer.observe(element);
    return () => {
      observer.disconnect();
    };
  }, []);
  return { ref, width };
};

const blockTypes = [
  { name: 'Sessão', icon: <DehazeIcon /> },
  { name: 'Entrada', icon: <TextFieldIcon /> },
  { name: 'Numérico', icon: <NumbersIcon /> },
  { name: 'Data / Horário', icon: <ScheduleIcon /> },
  { name: 'Localização', icon: <LocationOnIcon /> },
  { name: 'Múltipla Escolha', icon: <ChecklistIcon /> },
  { name: 'Matriz', icon: <GridOnIcon /> },
  { name: 'Lista', icon: <FormatListBulletedIcon /> },
  { name: 'Documento', icon: <DescriptionIcon /> },
  { name: 'Fonte de Dados', icon: <StorageIcon /> },
];

export default function PoliticasPLDFTP() {
  const [blocks, setBlocks] = useState([]);
  const [layout, setLayout] = useState([]);
  const { ref, width } = useContainerWidth();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  const [policyName, setPolicyName] = useState('');
  const [policyVersion, setPolicyVersion] = useState('');

  const handleAddBlock = (type) => {
    const newBlockId = Date.now().toString();
    const newBlock = { id: newBlockId, type: type };
    setBlocks((prevBlocks) => [...prevBlocks, newBlock]);

    let defaultHeight = 1;
    if (type === 'Localização' || type === 'Matriz') {
      defaultHeight = 3;
    }
    
    const newLayoutItem = {
      i: newBlockId,
      x: 0,
      y: Infinity,
      w: 12,
      h: defaultHeight,
      minW: 4,
    };

    if (['Entrada', 'Sessão', 'Data / Horário', 'Texto', 'Lista', 'Documento', 'Fonte de Dados', 'Numérico', 'Múltipla Escolha'].includes(type)) {
      newLayoutItem.minH = defaultHeight;
      newLayoutItem.maxH = defaultHeight;
    }
    
    setLayout((prevLayout) => [...prevLayout, newLayoutItem]);
  };

  const handleDeleteBlock = (idToDelete) => {
    setBlocks((prevBlocks) => prevBlocks.filter((block) => block.id !== idToDelete));
    setLayout((prevLayout) => prevLayout.filter((item) => item.i !== idToDelete));
  };

  const handleLayoutChange = (newLayout) => {
    const sortedLayout = [...newLayout].sort((a, b) => a.y - b.y);
    const newBlocksOrder = sortedLayout.map(item => {
      return blocks.find(block => block.id === item.i);
    }).filter(Boolean);
    setLayout(newLayout);
    setBlocks(newBlocksOrder);
  };
  
  const handleSelectBlockType = (type) => {
    handleAddBlock(type);
    setIsDrawerOpen(false);
  };
  
  // Função para coletar os dados da política
  const getPolicyData = () => {
    return {
        name: policyName,
        version: policyVersion,
        blocks: blocks,
        layout: layout,
    };
  };

  const handlePreview = () => {
    const policyData = getPolicyData();
    console.log("Visualizando Política:", JSON.stringify(policyData, null, 2));
    alert('Verifique o console (F12) para ver os dados da política que seriam usados na visualização.');
  };

  // --- NOVA FUNÇÃO PARA SALVAR ---
  const handleSavePolicy = () => {
    const policyData = getPolicyData();
    // Aqui você enviaria 'policyData' para uma API ou salvaria no localStorage
    console.log("Salvando Política:", JSON.stringify(policyData, null, 2));
    alert(`Política "${policyName}" salva com sucesso! (Verifique o console para ver os dados)`);
  };

  return (
    <Box>
      {/* --- SEÇÃO SUPERIOR ATUALIZADA --- */}
      <Box sx={{ padding: '0 24px 24px 24px' }}>
        <Paper variant="outlined" sx={{ p: 2, borderRadius: '12px', borderColor: '#d0d7e2' }}>
          <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
            {/* Campos da Esquerda */}
            <Box sx={{ display: 'flex', gap: 2, flexGrow: 1 }}>
              <TextField
                label="Nome da Política"
                variant="outlined"
                size="small"
                value={policyName}
                onChange={(e) => setPolicyName(e.target.value)}
                sx={{ flexGrow: 1 }}
              />
              <TextField
                label="Versão"
                variant="outlined"
                size="small"
                value={policyVersion}
                onChange={(e) => setPolicyVersion(e.target.value)}
                sx={{ width: '150px' }}
              />
            </Box>

            {/* Divisor e Botões à Direita */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Divider orientation="vertical" flexItem />
                <Button 
                    variant="outlined" 
                    color="primary"
                    onClick={handlePreview}
                    startIcon={<VisibilityIcon />}
                    sx={{ height: '40px' }}
                >
                    Visualizar
                </Button>
                <Button 
                    variant="contained" 
                    onClick={handleSavePolicy}
                    startIcon={<SaveIcon />}
                    sx={{ height: '40px' }}
                >
                    Salvar
                </Button>
            </Box>
          </Stack>
        </Paper>
      </Box>

      {/* Botões de Ação */}
      <Box sx={{ padding: '0 24px 24px 24px', display: 'flex', gap: 1.5 }}>
        <Button variant="outlined" onClick={() => setIsDrawerOpen(true)} sx={{ fontSize: '14px', fontWeight: 500, borderRadius: '8px', textTransform: 'none', padding: '2px 12px', height: '32px', borderColor: '#d0d7e2', color: 'text.primary', '&:hover': { borderColor: 'primary.main', backgroundColor: 'action.hover' } }}>
          + Campo
        </Button>
        <Button variant="outlined" sx={{ fontSize: '14px', fontWeight: 500, borderRadius: '8px', textTransform: 'none', padding: '2px 12px', height: '32px', borderColor: '#d0d7e2', color: 'text.primary', '&:hover': { borderColor: 'primary.main', backgroundColor: 'action.hover' } }}>
          + API
        </Button>
      </Box>

      {/* Menu Lateral (Drawer) */}
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <Box
          sx={{ width: 280, p: 2 }}
          role="presentation"
        >
          <Typography variant="h6" sx={{ mb: 2 }}>Adicionar Novo Campo</Typography>
          <List>
            {blockTypes.map((block) => (
              <ListItem key={block.name} disablePadding>
                <ListItemButton onClick={() => handleSelectBlockType(block.name)}>
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    {block.icon}
                  </ListItemIcon>
                  <ListItemText primary={block.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Área do Grid Layout */}
      <Box ref={ref} sx={{ padding: '0 24px' }}>
        <GridLayout
          layout={layout}
          onLayoutChange={handleLayoutChange}
          cols={12}
          rowHeight={90}
          width={width}
          isDraggable
          isResizable
          draggableCancel=".no-drag"
          compactType="vertical"
        >
          {blocks.map((block) => {
            let componentToRender;
            if (block.type === 'Sessão') componentToRender = <SessionBlock onDelete={() => handleDeleteBlock(block.id)} />;
            else if (block.type === 'Entrada' || block.type === 'Texto') componentToRender = <TextBlock onDelete={() => handleDeleteBlock(block.id)} />;
            else if (block.type === 'Numérico') componentToRender = <NumberBlock onDelete={() => handleDeleteBlock(block.id)} />;
            else if (block.type === 'Data / Horário') componentToRender = <DateTimeBlock onDelete={() => handleDeleteBlock(block.id)} />;
            else if (block.type === 'Localização') componentToRender = <LocationBlock onDelete={() => handleDeleteBlock(block.id)} />;
            else if (block.type === 'Múltipla Escolha') componentToRender = <MultiChoiceBlock onDelete={() => handleDeleteBlock(block.id)} />;
            else if (block.type === 'Matriz') componentToRender = <MatrixBlock onDelete={() => handleDeleteBlock(block.id)} />;
            else if (block.type === 'Lista') componentToRender = <ListBlock onDelete={() => handleDeleteBlock(block.id)} />;
            else if (block.type === 'Documento') componentToRender = <DocumentBlock onDelete={() => handleDeleteBlock(block.id)} />;
            else if (block.type === 'Fonte de Dados') componentToRender = <APIBlock onDelete={() => handleDeleteBlock(block.id)} />;
            else componentToRender = <div>Bloco desconhecido</div>;
            
            return (
              <div key={block.id} style={{ width: '100%', height: '100%' }}>
                {componentToRender}
              </div>
            );
          })}
        </GridLayout>
      </Box>
    </Box>
  );
}
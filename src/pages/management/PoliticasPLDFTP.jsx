import React, { useState, useRef, useLayoutEffect } from 'react';
import { Box } from '@mui/material';
import GridLayout from 'react-grid-layout';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import PolicyToolbar from '../../components/PolicyToolbar';
import SessionBlock from '../../components/SessionBlock';
import TextBlock from '../../components/TextBlock';
import DateTimeBlock from '../../components/DateTimeBlock';
import LocationBlock from '../../components/LocationBlock';
import MatrixBlock from '../../components/MatrixBlock';

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

export default function PoliticasPLDFTP() {
  const [blocks, setBlocks] = useState([]);
  const [layout, setLayout] = useState([]);
  const { ref, width } = useContainerWidth();

  const handleAddBlock = (type) => {
    const newBlockId = Date.now().toString();
    const newBlock = { id: newBlockId, type: type };
    setBlocks((prevBlocks) => [...prevBlocks, newBlock]);

    let defaultHeight = 1; // Altura padrão definida como 1
    if (type === 'Localização' || type === 'Matriz') {
      defaultHeight = 3;
    }
    
    const newLayoutItem = {
      i: newBlockId,
      x: 0,
      y: Infinity,
      w: 12,
      h: defaultHeight,
      minW: 12,
      maxW: 12,
    };

    if (type === 'Entrada' || type === 'Sessão' || type === 'Data / Horário' || type === 'Numérico' || type === 'Variável' || type === 'Texto') {
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

  return (
    <Box>
      <Box
        sx={{
          position: 'sticky', top: 0, zIndex: 10,
          backgroundColor: 'var(--color-background)',
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
          padding: '12px 24px', width: '100%', display: 'flex',
          alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box',
        }}
      >
        <PolicyToolbar onAddBlock={handleAddBlock} />
      </Box>

      <Box ref={ref} sx={{ padding: '24px' }}>
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
          // A propriedade 'preventCollision={true}' foi removida
        >
          {blocks.map((block) => {
            let componentToRender;
            if (block.type === 'Sessão') componentToRender = <SessionBlock onDelete={() => handleDeleteBlock(block.id)} />;
            else if (block.type === 'Entrada' || block.type === 'Texto') componentToRender = <TextBlock onDelete={() => handleDeleteBlock(block.id)} />;
            else if (block.type === 'Data / Horário') componentToRender = <DateTimeBlock onDelete={() => handleDeleteBlock(block.id)} />;
            else if (block.type === 'Localização') componentToRender = <LocationBlock onDelete={() => handleDeleteBlock(block.id)} />;
            else if (block.type === 'Matriz') componentToRender = <MatrixBlock onDelete={() => handleDeleteBlock(block.id)} />;
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
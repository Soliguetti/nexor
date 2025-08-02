import React from 'react';
import { Box, Typography, Button, Stack, Chip, Paper } from '@mui/material';

const getTagStyles = (type) => {
  // ... sua função getTagStyles continua a mesma
  switch (type) {
    case 'highest_risk':
      return {
        backgroundColor: 'rgba(var(--color-rgb-highest-risk), 0.15)',
        color: 'var(--color-text-color-highest_risk_test)',
      };
    case 'high_risk':
      return {
        backgroundColor: 'rgba(var(--color-rgb-high-risk), 0.15)',
        color: 'var(--color-text-color-high_risk_test)',
      };
    case 'medium_risk':
      return {
        backgroundColor: 'rgba(var(--color-rgb-medium-risk), 0.15)',
        color: 'var(--color-text-color-medium_risk_test)',
      };
    case 'low_risk':
      return {
        backgroundColor: 'rgba(var(--color-rgb-low-risk), 0.15)',
        color: 'var(--color-text-color-low_risk_test)',
      };
    case 'normal':
      return {
        backgroundColor: 'rgba(var(--color-rgb-normal), 0.15)',
        color: 'var(--color-text-color-normal_tag)',
      };
    default:
      return {};
  }
};

export default function AlertTicket({ id, timestamp, tags }) {
  return (
    <Paper
      variant="outlined"
      sx={{
        p: 2,
        display: 'flex',
        padding: '25px',
        borderRadius: '15px',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderColor: '#fff', // Corrigido para uma cor visível
        boxShadow: '0 2px 4px rgba(0,0,0,0.08)'
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1,  }}>
        <Box>
          <Typography variant="h6" component="span" fontWeight="bold" sx={{ mr: 2 }}>
            #{id}
          </Typography>
          <Typography variant="body2" component="span" color="text.secondary">
            {timestamp}
          </Typography>
        </Box>
        <Stack direction="row" spacing={1} > 
          {tags.map((tag) => (
            <Chip  
              key={tag.label}
              label={tag.label}
              size="small"
              
              sx={{
                padding: '5px 5px',
                fontSize: '12px', 
                ...getTagStyles(tag.type)
              }}
            />
          ))}
        </Stack>
      </Box>

      <Box>
        <Button
          variant="contained"
          sx={{ backgroundColor: '#1e88e5' }}
        >
          Analisar
        </Button>
      </Box>
    </Paper>
  );
}
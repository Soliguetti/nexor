import React from 'react';
import { Outlet } from 'react-router-dom';
import SubMenu_Operations from '../../components/SubMenu_Operations';

// Este componente agora serve apenas como um layout para as sub-páginas.
// Ele não tem conteúdo visual próprio, apenas o sub-menu e a área para o conteúdo filho.
export default function Operacoes() {
  return (
    <>
      <SubMenu_Operations />
      
      {/* O Outlet renderizará Alertas.jsx, Politicas.jsx ou Historico.jsx aqui dentro */}
      <Outlet />
    </>
  );
}
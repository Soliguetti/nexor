import React, { useState } from 'react'; // 1. Importe o useState
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import './Layout.css';

export default function Layout() {
  // 2. Crie o estado para controlar se a sidebar está recolhida
  const [isCollapsed, setIsCollapsed] = useState(false);

  // 3. Crie a função que alterna o estado
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    // 4. Adicione uma classe dinâmica ao container principal
    <div className={`app-layout ${isCollapsed ? 'sidebar-collapsed' : ''}`}>
      {/* 5. Passe o estado e a função como props para a Sidebar */}
      <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
      <main className="content-panel">
        <Outlet />
      </main>
    </div>
  );
}
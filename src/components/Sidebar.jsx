import React from 'react';
import { NavLink } from 'react-router-dom';
import './Layout.css';

// --- Importe todas as suas imagens aqui ---
import logoExpanded from '../assets/logo_expanded.png';
import logoCollapsed from '../assets/logo_colapsed.png';
import avatar from '../assets/react.svg';
import iconDashboard from '../assets/icon_chart.png';
import iconOperacoes from '../assets/icon_operations.png';
import iconMonitoramento from '../assets/icon_monitoring.png';
import iconAuditoria from '../assets/icon_audit.png';
import iconGerenciamento from '../assets/icon_management.png';
import iconSeta from '../assets/icon_back.png';

// 1. Receba as props 'isCollapsed' e 'toggleSidebar'
export default function Sidebar({ isCollapsed, toggleSidebar }) {
  const primeiroNome = "Gabriel";

  return (
    <aside className="sidebar">
      <div className="sidebar-content">
        <div className="sidebar-header">
          {/* 2. Alterne o logo com base no estado */}
          <img 
            src={isCollapsed ? logoCollapsed : logoExpanded} 
            alt="Logo Nexor" 
            className="logo-image" 
          />
        </div>

        <div className="user-profile">
          <img src={avatar} alt="Avatar do usuário" className="avatar-image" />
          {/* 3. Renderize os detalhes do usuário apenas se NÃO estiver recolhido */}
          {!isCollapsed && (
            <div className="user-details">
              <span>Boas-vindas,</span>
              <strong>{primeiroNome}!</strong>
            </div>
          )}
        </div>

        <nav className="main-nav">
          <ul>
            <li>
              <NavLink to="/" className="nav-link" end>
                <img src={iconDashboard} alt="" className="nav-icon" />
                {/* 4. Renderize o texto do link apenas se NÃO estiver recolhido */}
                {!isCollapsed && <span>Dashboard</span>}
              </NavLink>
            </li>
            <li>
              <NavLink to="/operacoes" className="nav-link">
                <img src={iconOperacoes} alt="" className="nav-icon" />
                {!isCollapsed && <span>Operações</span>}
              </NavLink>
            </li>
            <li>
              <NavLink to="/monitoramento" className="nav-link">
                <img src={iconMonitoramento} alt="" className="nav-icon" />
                {!isCollapsed && <span>Monitoramento</span>}
              </NavLink>
            </li>
            <li>
              <NavLink to="/auditoria" className="nav-link">
                <img src={iconAuditoria} alt="" className="nav-icon" />
                {!isCollapsed && <span>Auditoria</span>}
              </NavLink>
            </li>
            <li>
              <NavLink to="/gerenciamento" className="nav-link">
                <img src={iconGerenciamento} alt="" className="nav-icon" />
                {!isCollapsed && <span>Gerenciamento</span>}
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>

      <div className="sidebar-footer">
        {/* 5. Adicione o evento onClick para chamar a função do pai */}
        <div className="toggle-arrow" onClick={toggleSidebar}>
          <img src={iconSeta} alt="Recolher menu" />
        </div>
      </div>
    </aside>
  );
}
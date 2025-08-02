import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './SubMenu_Management.css';

export default function SubMenu_Management() {
  const navRef = useRef(null);
  const location = useLocation();
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0, opacity: 0 });

  useEffect(() => {
    const activeLink = navRef.current.querySelector('a.active');
    if (activeLink) {
      const left = activeLink.offsetLeft;
      const width = activeLink.offsetWidth;
      setUnderlineStyle({ left, width, opacity: 1 });
    }
  }, [location]);

  return (
    <nav className="submenu-nav">
      <ul ref={navRef}>
        <li>
          <NavLink to="/gerenciamento" end>Controle de Acesso</NavLink>
        </li>
        <li>
          <NavLink to="/gerenciamento/modelos">Variáveis</NavLink>
        </li>
        <li>
          <NavLink to="/gerenciamento/alertas-transacionais">Alertas</NavLink>
        </li>
        <li>
          <NavLink to="/gerenciamento/alertas-monitoramento">Monitoramento</NavLink>
        </li>
        <li>
          <NavLink to="/gerenciamento/politicas-pld-ftp">Políticas</NavLink>
        </li>
        <li>
          <NavLink to="/gerenciamento/monitoramento">Mapa de Risco</NavLink>
        </li>
        <div className="underline" style={underlineStyle} />
      </ul>
    </nav>
  );
}
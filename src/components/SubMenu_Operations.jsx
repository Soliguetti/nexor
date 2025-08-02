import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './SubMenu_Operations.css';

export default function SubMenu_Operations() {
  // O 'ref' nos dá acesso direto ao elemento <ul> no DOM
  const navRef = useRef(null);
  // O 'location' nos ajuda a saber quando a URL muda
  const location = useLocation();
  // O 'state' vai guardar os estilos (posição e largura) do nosso traço
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0, opacity: 0 });

  // O 'useEffect' vai rodar toda vez que a página (location) mudar
  useEffect(() => {
    // Procuramos pelo link que está com a classe '.active' dentro da nossa navegação
    const activeLink = navRef.current.querySelector('a.active');

    if (activeLink) {
      // Se encontrarmos um link ativo, calculamos sua posição e largura
      const left = activeLink.offsetLeft;
      const width = activeLink.offsetWidth;
      // E atualizamos o estilo do nosso traço
      setUnderlineStyle({ left, width, opacity: 1 });
    }
  }, [location]); // A dependência [location] faz isso rodar a cada mudança de URL

  return (
    <nav className="submenu-nav">
      {/* Adicionamos a 'ref' aqui */}
      <ul ref={navRef}>
        <li>
          <NavLink to="/operacoes" end>Alertas</NavLink>
        </li>
        <li>
          <NavLink to="/operacoes/politicas">Políticas</NavLink>
        </li>
        <li>
          <NavLink to="/operacoes/produtividade">Produtividade</NavLink>
        </li>
        {/* Este é o nosso traço animado. Os estilos são aplicados dinamicamente */}
        <div className="underline" style={underlineStyle} />
      </ul>
    </nav>
  );
}
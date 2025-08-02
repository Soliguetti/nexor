import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// --- IMPORTS PRINCIPAIS ---
import Layout from './components/Layout';

// --- PÁGINAS DE OPERAÇÕES ---
import Operacoes from './pages/operations/Operations.jsx';
import Alertas from './pages/operations/Alertas.jsx';
import Politicas from './pages/operations/Politicas.jsx';
import Produtividade from './pages/operations/Produtividade.jsx';

// --- PÁGINAS DE GERENCIAMENTO (NOVOS IMPORTS) ---
import Gerenciamento from './pages/management/Gerenciamento'; 
import ControleAcesso from './pages/management/ControleAcesso';
import Modelos from './pages/management/Modelos';
import AlertasTransacionais from './pages/management/AlertasTransacionais';
import AlertasMonitoramento from './pages/management/AlertasMonitoramento';
import PoliticasPLDFTP from './pages/management/PoliticasPLDFTP';
import MonitoramentoPage from './pages/management/MonitoramentoPage';

// --- PÁGINAS PLACEHOLDER (MANTIDAS COMO ESTAVAM) ---
const Dashboard = () => <div><h1>Dashboard</h1></div>;
const Monitoramento = () => <div><h1>Monitoramento</h1></div>;
const Auditoria = () => <div><h1>Auditoria</h1></div>;


// --- CONFIGURAÇÃO DO ROTEADOR ATUALIZADA ---
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'operacoes',
        element: <Operacoes />,
        children: [
          {
            // A rota para /operacoes vai renderizar Alertas por padrão
            index: true, 
            element: <Alertas />,
          },
          // A rota duplicada para 'alertas' foi removida para consistência.
          // O NavLink para /operacoes com a prop 'end' já cuida disso.
          {
            path: 'politicas',
            element: <Politicas />,
          },
          {
            path: 'produtividade',
            element: <Produtividade />,
          },
        ],
      },
      {
        path: 'monitoramento',
        element: <Monitoramento />,
      },
      {
        path: 'auditoria',
        element: <Auditoria />,
      },
      {
        // --- ROTA DE GERENCIAMENTO ATUALIZADA ---
        // A rota simples foi substituída pela estrutura completa com sub-rotas
        path: 'gerenciamento',
        element: <Gerenciamento />,
        children: [
          { index: true, element: <ControleAcesso /> },
          { path: 'modelos', element: <Modelos /> },
          { path: 'alertas-transacionais', element: <AlertasTransacionais /> },
          { path: 'alertas-monitoramento', element: <AlertasMonitoramento /> },
          { path: 'politicas-pld-ftp', element: <PoliticasPLDFTP /> },
          { path: 'monitoramento', element: <MonitoramentoPage /> },
        ]
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
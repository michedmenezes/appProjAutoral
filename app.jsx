import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  Map, 
  Settings, 
  User, 
  CheckCircle, 
  Lock, 
  Layout, 
  ExternalLink, 
  Plus, 
  MessageSquare,
  Award,
  ChevronRight,
  Eye,
  BarChart
} from 'lucide-react';

const App = () => {
  // --- Estados Globais ---
  const [view, setView] = useState('student'); // 'student' ou 'teacher'
  const [activeTab, setActiveTab] = useState('map');
  const [currentUserGroup, setCurrentUserGroup] = useState('Grupo_01_8A');
  
  // --- Dados do Jogo (Mock) ---
  const [groups, setGroups] = useState([
    { id: 1, name: 'Grupo_01_8A', xp: 450, badges: ['Inovação', 'Escrita Ágil'], progress: 2 },
    { id: 2, name: 'EcoTech_9B', xp: 520, badges: ['Mestre da Justificativa'], progress: 3 },
    { id: 3, name: 'Futuro_Sustentável', xp: 300, badges: [], progress: 1 },
  ]);

  const [phases, setPhases] = useState([
    { id: 1, title: 'O Despertar', subtitle: 'Aulas 1-3', description: 'Escolha do tema e problema.', status: 'completed', content: 'Defina o tema e valide com o professor no Diário de Bordo.' },
    { id: 2, title: 'Caminho para a Solução', subtitle: 'Aulas 4-6', description: 'Justificativa e Canvas.', status: 'unlocked', content: 'Preencha o Canvas de Desenvolvimento e escreva por que seu projeto importa.' },
    { id: 3, title: 'Laboratório de Ideias', subtitle: 'Aulas 7-9', description: 'Metodologia e Referencial.', status: 'locked', content: 'Pesquise fontes e defina como o protótipo será construído.' },
    { id: 4, title: 'Prototipagem Mão na Massa', subtitle: 'Aulas 10-12', description: 'Desenvolvimento do MVP.', status: 'locked', content: 'Hora de construir! Use Tinkercad, Figma ou materiais físicos.' },
    { id: 5, title: 'Ajustes e Melhorias', subtitle: 'Aulas 13-15', description: 'Testes e Resultados.', status: 'locked', content: 'Teste seu protótipo e anote o que precisa melhorar.' },
    { id: 6, title: 'Compartilhamento', subtitle: 'Aulas 16-18', description: 'Relatório e Mostra Inovapoio.', status: 'locked', content: 'Finalize o relatório e prepare o seu Pitch de 3 minutos.' },
  ]);

  const badgesLib = [
    { id: 'Inovação', icon: '🚀', desc: 'Ideia fora da caixa' },
    { id: 'Escrita Ágil', icon: '✍️', desc: 'Entrega documental no prazo' },
    { id: 'Mestre da Justificativa', icon: '🎯', desc: 'Problema muito bem definido' },
    { id: 'Prototipador', icon: '🛠️', desc: 'Primeiro MVP funcional' },
  ];

  // --- Lógica do Estudante ---
  const handleCompleteTask = (id) => {
    setPhases(phases.map(p => p.id === id ? { ...p, status: 'pending' } : p));
  };

  // --- Lógica do Professor ---
  const togglePhaseStatus = (id) => {
    setPhases(phases.map(p => {
      if (p.id === id) {
        const nextStatus = p.status === 'locked' ? 'unlocked' : 'locked';
        return { ...p, status: nextStatus };
      }
      return p;
    }));
  };

  // --- Componentes de Interface ---

  const Sidebar = () => (
    <div className="w-64 bg-slate-900 text-white flex flex-col h-screen sticky top-0">
      <div className="p-6 border-b border-slate-800 flex items-center gap-3">
        <div className="bg-blue-600 p-2 rounded-lg">
          <Award size={24} />
        </div>
        <h1 className="font-bold text-lg leading-tight text-white">Missão Autoral</h1>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        <button 
          onClick={() => setActiveTab('map')}
          className={`w-full flex items-center gap-3 p-3 rounded-lg transition ${activeTab === 'map' ? 'bg-blue-600' : 'hover:bg-slate-800'}`}
        >
          <Map size={20} /> Mapa do Percurso
        </button>
        <button 
          onClick={() => setActiveTab('ranking')}
          className={`w-full flex items-center gap-3 p-3 rounded-lg transition ${activeTab === 'ranking' ? 'bg-blue-600' : 'hover:bg-slate-800'}`}
        >
          <Trophy size={20} /> Ranking
        </button>
        {view === 'teacher' && (
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 p-3 rounded-lg transition ${activeTab === 'dashboard' ? 'bg-blue-600' : 'hover:bg-slate-800'}`}
          >
            <BarChart size={20} /> Dashboard
          </button>
        )}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center gap-3 p-3 mb-4 bg-slate-800 rounded-lg">
          <User size={20} className="text-blue-400" />
          <div className="text-sm overflow-hidden truncate">
            <p className="font-semibold">{view === 'teacher' ? 'Prof. Coordenador' : currentUserGroup}</p>
            <p className="text-xs text-slate-400 capitalize">{view}</p>
          </div>
        </div>
        <button 
          onClick={() => setView(view === 'student' ? 'teacher' : 'student')}
          className="w-full text-xs text-slate-400 hover:text-white flex items-center justify-center gap-2 border border-slate-700 p-2 rounded hover:bg-slate-800"
        >
          <Settings size={14} /> Trocar para {view === 'student' ? 'Professor' : 'Estudante'}
        </button>
      </div>
    </div>
  );

  const StudentMap = () => (
    <div className="p-8 max-w-5xl mx-auto">
      <header className="mb-8">
        <h2 className="text-3xl font-bold text-slate-800">Sua Jornada</h2>
        <p className="text-slate-500 italic">Cada passo no mapa é um avanço na sua invenção.</p>
      </header>

      <div className="grid gap-6">
        {phases.map((phase, idx) => (
          <div 
            key={phase.id}
            className={`relative flex items-start gap-6 p-6 rounded-2xl border-2 transition-all ${
              phase.status === 'locked' ? 'bg-slate-50 border-slate-100 opacity-60' : 
              phase.status === 'completed' ? 'bg-white border-green-200 shadow-sm' : 'bg-white border-blue-200 shadow-md ring-2 ring-blue-50'
            }`}
          >
            <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${
              phase.status === 'completed' ? 'bg-green-100 text-green-600' : 
              phase.status === 'unlocked' ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-200 text-slate-500'
            }`}>
              {phase.status === 'completed' ? <CheckCircle size={24} /> : phase.id}
            </div>

            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-slate-800">{phase.title}</h3>
                  <span className="text-sm font-medium text-slate-400">{phase.subtitle}</span>
                </div>
                {phase.status === 'locked' && <Lock size={18} className="text-slate-300" />}
              </div>
              <p className="text-slate-600 mt-2">{phase.description}</p>
              
              {phase.status !== 'locked' && (
                <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <p className="text-sm text-slate-700 font-medium mb-3">Missão da Semana:</p>
                  <p className="text-sm text-slate-600 mb-4">{phase.content}</p>
                  
                  {phase.status === 'unlocked' && (
                    <button 
                      onClick={() => handleCompleteTask(phase.id)}
                      className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded-lg flex items-center gap-2 transition"
                    >
                      <CheckCircle size={16} /> Marcar Etapa como Feita
                    </button>
                  )}
                  {phase.status === 'pending' && (
                    <span className="inline-flex items-center gap-2 text-orange-600 text-sm font-bold bg-orange-50 px-3 py-1 rounded-full">
                      Aguardando Validação do Professor
                    </span>
                  )}
                </div>
              )}
            </div>

            {idx < phases.length - 1 && (
              <div className="absolute left-12 bottom-[-1.5rem] w-0.5 h-6 bg-slate-200 -z-10" />
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const Ranking = () => (
    <div className="p-8 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
        <Trophy className="text-yellow-500" /> Top das Galáxias (Ranking)
      </h2>
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="p-4 font-bold text-slate-600 text-sm">Posição</th>
              <th className="p-4 font-bold text-slate-600 text-sm">Grupo</th>
              <th className="p-4 font-bold text-slate-600 text-sm">Etapa Atual</th>
              <th className="p-4 font-bold text-slate-600 text-sm text-right">XP Total</th>
            </tr>
          </thead>
          <tbody>
            {[...groups].sort((a, b) => b.xp - a.xp).map((group, idx) => (
              <tr key={group.id} className={`border-b border-slate-50 hover:bg-slate-50 transition ${group.name === currentUserGroup ? 'bg-blue-50' : ''}`}>
                <td className="p-4 font-bold text-slate-400">#{idx + 1}</td>
                <td className="p-4">
                  <span className="font-bold text-slate-800">{group.name}</span>
                  <div className="flex gap-1 mt-1">
                    {group.badges.map(b => (
                      <span key={b} title={b} className="text-xs bg-white p-1 border border-slate-200 rounded">
                        {badgesLib.find(lib => lib.id === b)?.icon}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="p-4 text-sm text-slate-600">Fase {group.progress}</td>
                <td className="p-4 text-right font-mono font-bold text-blue-600">{group.xp} XP</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const TeacherDashboard = () => (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">Painel de Controle</h2>
        <div className="flex gap-2">
          <button className="bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2">
            <Plus size={16} /> Criar Novo Grupo
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <Map className="text-blue-500" size={20} /> Controle do Mapa do Percurso
          </h3>
          <div className="space-y-3">
            {phases.map(phase => (
              <div key={phase.id} className="flex items-center justify-between p-3 border border-slate-100 rounded-xl">
                <div>
                  <p className="text-sm font-bold text-slate-800">{phase.title}</p>
                  <p className="text-xs text-slate-500">{phase.description}</p>
                </div>
                <button 
                  onClick={() => togglePhaseStatus(phase.id)}
                  className={`text-xs px-3 py-1 rounded-full font-bold ${
                    phase.status === 'locked' ? 'bg-slate-100 text-slate-400' : 'bg-green-100 text-green-600'
                  }`}
                >
                  {phase.status === 'locked' ? 'Habilitar' : 'Ativa'}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <CheckCircle className="text-orange-500" size={20} /> Validação de Entregas
          </h3>
          <div className="space-y-4">
            <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
              <div className="flex justify-between items-start mb-2">
                <span className="font-bold text-orange-800 text-sm">Grupo_01_8A</span>
                <span className="text-[10px] uppercase font-bold text-orange-600">Pendente</span>
              </div>
              <p className="text-xs text-orange-700 mb-3 italic">"Enviamos a justificativa no Moodle e preenchemos o Canvas físico."</p>
              <div className="flex gap-2">
                <button className="flex-1 bg-white text-green-600 border border-green-200 py-1.5 rounded-lg text-xs font-bold hover:bg-green-50 transition">
                  Aprovar +50 XP
                </button>
                <button className="flex-1 bg-white text-slate-500 border border-slate-200 py-1.5 rounded-lg text-xs font-bold hover:bg-slate-50 transition">
                  Pedir Ajuste
                </button>
              </div>
            </div>
            
            <p className="text-center text-xs text-slate-400">Nenhuma outra entrega pendente.</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
          <Layout className="text-purple-500" size={20} /> Links e Desafios Semanais
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border border-slate-100 rounded-xl hover:border-blue-200 transition cursor-pointer">
            <div className="bg-blue-50 w-8 h-8 rounded-lg flex items-center justify-center text-blue-600 mb-3">
              <ExternalLink size={16} />
            </div>
            <p className="font-bold text-sm text-slate-800">Moodle Institucional</p>
            <p className="text-xs text-slate-500">Repositório de arquivos</p>
          </div>
          <div className="p-4 border border-slate-100 rounded-xl hover:border-purple-200 transition cursor-pointer">
            <div className="bg-purple-50 w-8 h-8 rounded-lg flex items-center justify-center text-purple-600 mb-3">
              <MessageSquare size={16} />
            </div>
            <p className="font-bold text-sm text-slate-800">Fórum de Dúvidas</p>
            <p className="text-xs text-slate-500">Suporte técnico</p>
          </div>
          <div className="p-4 border border-dashed border-slate-200 rounded-xl flex items-center justify-center text-slate-400 hover:bg-slate-50 transition cursor-pointer">
            <span className="text-xs font-bold flex items-center gap-2">
              <Plus size={14} /> Adicionar Link
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  const StudentResources = () => (
    <div className="fixed bottom-6 right-6 flex flex-col gap-3">
      <div className="bg-white p-4 rounded-2xl shadow-xl border border-slate-100 max-w-[280px]">
        <h4 className="font-bold text-slate-800 text-sm mb-3 border-b pb-2 flex items-center gap-2">
          <Award className="text-blue-600" size={16} /> Conquistas do Grupo
        </h4>
        <div className="flex flex-wrap gap-2">
          {groups.find(g => g.name === currentUserGroup)?.badges.map(b => (
            <div key={b} className="group relative">
              <span className="cursor-help text-2xl bg-slate-50 w-10 h-10 flex items-center justify-center rounded-xl border border-slate-100 hover:scale-110 transition">
                {badgesLib.find(lib => lib.id === b)?.icon}
              </span>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-32 bg-slate-800 text-white text-[10px] p-2 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition">
                <p className="font-bold">{b}</p>
                <p>{badgesLib.find(lib => lib.id === b)?.desc}</p>
              </div>
            </div>
          ))}
          <div className="w-10 h-10 flex items-center justify-center rounded-xl border-2 border-dashed border-slate-100 text-slate-300">
            ?
          </div>
        </div>
      </div>

      <div className="bg-blue-600 text-white p-4 rounded-2xl shadow-xl flex items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-lg">
            <Trophy size={20} />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-blue-200">Total de XP</p>
            <p className="text-xl font-bold leading-none">{groups.find(g => g.name === currentUserGroup)?.xp}</p>
          </div>
        </div>
        <ChevronRight size={20} className="text-blue-300" />
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900">
      <Sidebar />
      
      <main className="flex-1 pb-24">
        {activeTab === 'map' && <StudentMap />}
        {activeTab === 'ranking' && <Ranking />}
        {activeTab === 'dashboard' && view === 'teacher' && <TeacherDashboard />}
        
        {view === 'student' && <StudentResources />}
      </main>

      {/* Botão de Floating Feedback (Apenas Visual) */}
      <div className="fixed bottom-6 left-[280px] bg-white border border-slate-200 px-4 py-2 rounded-full shadow-lg flex items-center gap-2 text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer">
        <MessageSquare size={14} /> Falar com o Professor
      </div>
    </div>
  );
};

export default App;

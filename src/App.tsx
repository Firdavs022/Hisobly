import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  MessageSquare, 
  Receipt, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  Wallet,
  Bell,
  Search
} from 'lucide-react';
import { Dashboard } from './components/Dashboard';
import { Chat } from './components/Chat';
import { TransactionsList } from './components/TransactionsList';
import { Transaction } from './types';
import { motion, AnimatePresence } from 'motion/react';

// Mock initial data
const INITIAL_TRANSACTIONS: Transaction[] = [
  { id: '1', date: '2026-03-15', type: 'income', category: 'Sotuv', amount: 12500000, description: 'Asosiy mahsulot sotuvi' },
  { id: '2', date: '2026-03-16', type: 'expense', category: 'Ijara', amount: 3000000, description: 'Ofis ijarasi' },
  { id: '3', date: '2026-03-17', type: 'expense', category: 'Marketing', amount: 1500000, description: 'Instagram reklama' },
  { id: '4', date: '2026-03-18', type: 'income', category: 'Xizmatlar', amount: 4200000, description: 'Konsultatsiya xizmati' },
  { id: '5', date: '2026-03-19', type: 'expense', category: 'Ish haqi', amount: 5000000, description: 'Xodimlar maoshi' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'chat' | 'transactions'>('dashboard');
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const addTransaction = (newTx: Omit<Transaction, 'id'>) => {
    const tx: Transaction = {
      ...newTx,
      id: Math.random().toString(36).substr(2, 9)
    };
    setTransactions(prev => [...prev, tx]);
  };

  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  return (
    <div className="flex h-screen bg-zinc-50 overflow-hidden">
      {/* Sidebar */}
      <aside className={`
        ${isSidebarOpen ? 'w-64' : 'w-20'} 
        bg-zinc-900 border-r border-zinc-800 flex flex-col transition-all duration-300 z-50
      `}>
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
            <Wallet className="w-5 h-5 text-white" />
          </div>
          {isSidebarOpen && <span className="text-xl font-bold text-white tracking-tight">Hisobly</span>}
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          <NavItem 
            icon={<LayoutDashboard className="w-5 h-5" />} 
            label="Dashboard" 
            active={activeTab === 'dashboard'} 
            onClick={() => setActiveTab('dashboard')}
            collapsed={!isSidebarOpen}
          />
          <NavItem 
            icon={<MessageSquare className="w-5 h-5" />} 
            label="AI Direktor" 
            active={activeTab === 'chat'} 
            onClick={() => setActiveTab('chat')}
            collapsed={!isSidebarOpen}
          />
          <NavItem 
            icon={<Receipt className="w-5 h-5" />} 
            label="Tranzaksiyalar" 
            active={activeTab === 'transactions'} 
            onClick={() => setActiveTab('transactions')}
            collapsed={!isSidebarOpen}
          />
        </nav>

        <div className="p-4 border-t border-zinc-800 space-y-2">
          <NavItem 
            icon={<Settings className="w-5 h-5" />} 
            label="Sozlamalar" 
            onClick={() => {}}
            collapsed={!isSidebarOpen}
          />
          <NavItem 
            icon={<LogOut className="w-5 h-5" />} 
            label="Chiqish" 
            onClick={() => {}}
            collapsed={!isSidebarOpen}
          />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-zinc-200 flex items-center justify-between px-8">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-zinc-100 rounded-lg text-zinc-500 transition-colors"
            >
              {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div className="relative hidden md:block">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input 
                type="text" 
                placeholder="Qidiruv..." 
                className="pl-10 pr-4 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/5 focus:border-zinc-900 transition-all w-64"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-zinc-100 rounded-lg text-zinc-500 relative transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white" />
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-zinc-200">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-zinc-900">Firdavs</p>
                <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Tadbirkor</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-600 font-bold">
                F
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto bg-zinc-50/50">
          <div className="max-w-7xl mx-auto h-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="h-full"
              >
                {activeTab === 'dashboard' && <Dashboard transactions={transactions} />}
                {activeTab === 'chat' && (
                  <div className="p-6 h-full flex flex-col">
                    <Chat transactions={transactions} />
                  </div>
                )}
                {activeTab === 'transactions' && (
                  <div className="p-6">
                    <TransactionsList 
                      transactions={transactions} 
                      onAdd={addTransaction} 
                      onDelete={deleteTransaction} 
                    />
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick: () => void;
  collapsed?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, active, onClick, collapsed }) => {
  return (
    <button
      onClick={onClick}
      className={`
        w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200
        ${active 
          ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' 
          : 'text-zinc-400 hover:text-white hover:bg-zinc-800'}
      `}
    >
      <div className="flex-shrink-0">{icon}</div>
      {!collapsed && <span className="text-sm font-medium">{label}</span>}
      {active && !collapsed && (
        <motion.div 
          layoutId="active-pill"
          className="ml-auto w-1.5 h-1.5 rounded-full bg-white" 
        />
      )}
    </button>
  );
}

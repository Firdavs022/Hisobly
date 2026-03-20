import React, { useState } from 'react';
import { Plus, Search, Filter, Download, Trash2, Edit2, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import { Transaction } from '../types';
import { formatCurrency } from '../lib/utils';
import { format, parseISO } from 'date-fns';

interface TransactionsListProps {
  transactions: Transaction[];
  onAdd: (t: Omit<Transaction, 'id'>) => void;
  onDelete: (id: string) => void;
}

export const TransactionsList: React.FC<TransactionsListProps> = ({ transactions, onAdd, onDelete }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newTx, setNewTx] = useState<Omit<Transaction, 'id'>>({
    date: new Date().toISOString().split('T')[0],
    type: 'income',
    category: 'Sotuv',
    amount: 0,
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(newTx);
    setIsAdding(false);
    setNewTx({
      date: new Date().toISOString().split('T')[0],
      type: 'income',
      category: 'Sotuv',
      amount: 0,
      description: ''
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-zinc-100 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-zinc-900">Tranzaksiyalar</h3>
        <button 
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 px-4 py-2 bg-zinc-900 text-white rounded-xl hover:bg-zinc-800 transition-colors text-sm font-medium"
        >
          <Plus className="w-4 h-4" />
          Qo'shish
        </button>
      </div>

      {isAdding && (
        <div className="p-6 bg-zinc-50 border-b border-zinc-100">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-zinc-500 uppercase">Sana</label>
              <input 
                type="date" 
                required
                value={newTx.date}
                onChange={e => setNewTx({...newTx, date: e.target.value})}
                className="w-full p-2 bg-white border border-zinc-200 rounded-lg text-sm"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-zinc-500 uppercase">Tur</label>
              <select 
                value={newTx.type}
                onChange={e => setNewTx({...newTx, type: e.target.value as 'income' | 'expense'})}
                className="w-full p-2 bg-white border border-zinc-200 rounded-lg text-sm"
              >
                <option value="income">Daromad</option>
                <option value="expense">Xarajat</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-zinc-500 uppercase">Kategoriya</label>
              <input 
                type="text" 
                required
                placeholder="Masalan: Ijara"
                value={newTx.category}
                onChange={e => setNewTx({...newTx, category: e.target.value})}
                className="w-full p-2 bg-white border border-zinc-200 rounded-lg text-sm"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-zinc-500 uppercase">Summa</label>
              <input 
                type="number" 
                required
                placeholder="0"
                value={newTx.amount || ''}
                onChange={e => setNewTx({...newTx, amount: Number(e.target.value)})}
                className="w-full p-2 bg-white border border-zinc-200 rounded-lg text-sm"
              />
            </div>
            <div className="flex items-end gap-2">
              <button 
                type="submit"
                className="flex-1 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium"
              >
                Saqlash
              </button>
              <button 
                type="button"
                onClick={() => setIsAdding(false)}
                className="px-4 py-2 bg-zinc-200 text-zinc-700 rounded-lg hover:bg-zinc-300 transition-colors text-sm font-medium"
              >
                Bekor
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-zinc-50/50">
              <th className="px-6 py-3 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Sana</th>
              <th className="px-6 py-3 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Kategoriya</th>
              <th className="px-6 py-3 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Tavsif</th>
              <th className="px-6 py-3 text-[10px] font-bold text-zinc-400 uppercase tracking-wider text-right">Summa</th>
              <th className="px-6 py-3 text-[10px] font-bold text-zinc-400 uppercase tracking-wider text-right">Amallar</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {transactions.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-zinc-400 italic">
                  Hozircha tranzaksiyalar yo'q.
                </td>
              </tr>
            ) : (
              transactions.sort((a, b) => b.date.localeCompare(a.date)).map((tx) => (
                <tr key={tx.id} className="hover:bg-zinc-50/50 transition-colors group">
                  <td className="px-6 py-4 text-sm text-zinc-600 font-mono">
                    {format(parseISO(tx.date), 'dd.MM.yyyy')}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                      tx.type === 'income' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                    }`}>
                      {tx.type === 'income' ? <ArrowUpCircle className="w-3 h-3" /> : <ArrowDownCircle className="w-3 h-3" />}
                      {tx.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-zinc-500">
                    {tx.description || '-'}
                  </td>
                  <td className={`px-6 py-4 text-sm font-bold text-right font-mono ${
                    tx.type === 'income' ? 'text-emerald-600' : 'text-rose-600'
                  }`}>
                    {tx.type === 'income' ? '+' : '-'}{formatCurrency(tx.amount)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => onDelete(tx.id)}
                      className="p-2 text-zinc-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

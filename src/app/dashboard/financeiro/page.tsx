'use client'

import { useState } from 'react'
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import styles from './Financeiro.module.css'

interface Transacao {
  id: number
  data: string
  desc: string
  cat: string
  tipo: 'entrada' | 'saida'
  valor: number
}

const INITIAL_TX: Transacao[] = [
  { id: 1, data: "15/03/2026", desc: "Doação Anônima", cat: "Doações", tipo: "entrada", valor: 500.00 },
  { id: 2, data: "16/03/2026", desc: "Compra de Velas e Charutos", cat: "Materiais", tipo: "saida", valor: 150.00 },
  { id: 3, data: "18/03/2026", desc: "Mensalidade Membros", cat: "Doações", tipo: "entrada", valor: 300.00 },
  { id: 4, data: "19/03/2026", desc: "Conta de Luz", cat: "Manutenção", tipo: "saida", valor: 250.00 },
]

const COLORS = ['#16a34a', '#dc2626', '#eab308', '#2563eb', '#9333ea', '#ea580c']

export default function FinanceiroPage() {
  const [transactions, setTransactions] = useState<Transacao[]>(INITIAL_TX)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTx, setEditingTx] = useState<Transacao | null>(null)
  const [formData, setFormData] = useState({ data: '', desc: '', cat: 'Doações', tipo: 'entrada', valor: '' })

  const totalEntradas = transactions.filter(t => t.tipo === 'entrada').reduce((acc, curr) => acc + curr.valor, 0)
  const totalSaidas = transactions.filter(t => t.tipo === 'saida').reduce((acc, curr) => acc + curr.valor, 0)
  const saldo = totalEntradas - totalSaidas

  // Prepare Chart Data (Entradas vs Saídas)
  const barData = [
    { name: 'Fluxo Mensal', Entradas: totalEntradas, Saídas: totalSaidas }
  ]

  // Prepare Chart Data (Saídas por Categoria)
  const categoryData = transactions.reduce((acc: any, curr) => {
    if (curr.tipo === 'saida') {
      const existing = acc.find((val: any) => val.name === curr.cat)
      if (existing) {
        existing.value += curr.valor
      } else {
        acc.push({ name: curr.cat, value: curr.valor })
      }
    }
    return acc
  }, [])

  const openAddModal = () => {
    setEditingTx(null)
    const today = new Date().toLocaleDateString('pt-BR')
    setFormData({ data: today, desc: '', cat: 'Doações', tipo: 'entrada', valor: '' })
    setIsModalOpen(true)
  }

  const openEditModal = (tx: Transacao) => {
    setEditingTx(tx)
    setFormData({ data: tx.data, desc: tx.desc, cat: tx.cat, tipo: tx.tipo, valor: tx.valor.toString() })
    setIsModalOpen(true)
  }

  const handleSave = () => {
    if (editingTx) {
      setTransactions(prev => prev.map(t => t.id === editingTx.id ? { 
        ...t, 
        ...formData, 
        tipo: formData.tipo as 'entrada' | 'saida',
        valor: Number(formData.valor) 
      } : t))
    } else {
      setTransactions(prev => [{
        id: Date.now(),
        data: formData.data,
        desc: formData.desc,
        cat: formData.cat,
        tipo: formData.tipo as 'entrada' | 'saida',
        valor: Number(formData.valor)
      }, ...prev])
    }
    setIsModalOpen(false)
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Controle Financeiro</h1>
        <button className={styles.btnCreate} onClick={openAddModal}>+ Nova Transação</button>
      </div>

      <div className={styles.summary}>
        <div className={styles.card}>
          <div className={styles.cardLabel}>Entradas</div>
          <div className={`${styles.cardValue} ${styles.valEntrada}`}>R$ {totalEntradas.toFixed(2)}</div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardLabel}>Saídas</div>
          <div className={`${styles.cardValue} ${styles.valSaida}`}>R$ {totalSaidas.toFixed(2)}</div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardLabel}>Saldo em Caixa</div>
          <div className={`${styles.cardValue} ${styles.valSaldo}`}>R$ {saldo.toFixed(2)}</div>
        </div>
      </div>

      <div className={styles.chartsRow}>
        <div className={styles.chartCard} style={{ cursor: 'crosshair'}}>
          <h3 className={styles.chartTitle}>Entradas x Saídas</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => `R$ ${Number(value).toFixed(2)}`} />
              <Legend />
              <Bar dataKey="Entradas" fill="#16a34a" />
              <Bar dataKey="Saídas" fill="#dc2626" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className={styles.chartCard} style={{ cursor: 'crosshair'}}>
          <h3 className={styles.chartTitle}>Despesas por Categoria</h3>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
                nameKey="name"
                label={({ name, percent = 0 }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {categoryData.map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `R$ ${Number(value).toFixed(2)}`} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>Data</th>
              <th className={styles.th}>Descrição</th>
              <th className={styles.th}>Categoria</th>
              <th className={styles.th}>Tipo</th>
              <th className={styles.th}>Valor</th>
              <th className={styles.th}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(t => (
              <tr key={t.id}>
                <td className={styles.td}>{t.data}</td>
                <td className={styles.td}><strong>{t.desc}</strong></td>
                <td className={styles.td}>{t.cat}</td>
                <td className={styles.td}>
                  <span className={`${styles.badge} ${t.tipo === 'entrada' ? styles.badgeEntrada : styles.badgeSaida}`}>
                    {t.tipo.toUpperCase()}
                  </span>
                </td>
                <td className={styles.td} style={{ fontWeight: 600, color: t.tipo === 'entrada' ? '#16a34a' : '#dc2626' }}>
                  {t.tipo === 'entrada' ? '+' : '-'} R$ {t.valor.toFixed(2)}
                </td>
                <td className={styles.td}>
                  <button className={styles.btnEdit} onClick={() => openEditModal(t)}>Editar</button>
                </td>
              </tr>
            ))}
            {transactions.length === 0 && (
              <tr><td colSpan={6} style={{ textAlign: 'center', padding: '2rem', color: '#888' }}>Nenhuma transação encontrada.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2 className={styles.modalTitle}>{editingTx ? 'Editar Lançamento' : 'Novo Lançamento'}</h2>
            
            <div className={styles.formGroup} style={{flexDirection: 'row', gap: '1rem'}}>
              <div style={{flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
                <label className={styles.label}>Data</label>
                <input type="text" className={styles.input} value={formData.data} onChange={e => setFormData({...formData, data: e.target.value})} placeholder="DD/MM/AAAA" />
              </div>
              <div style={{flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
                <label className={styles.label}>Tipo</label>
                <select className={styles.select} value={formData.tipo} onChange={e => setFormData({...formData, tipo: e.target.value})}>
                  <option value="entrada">Entrada</option>
                  <option value="saida">Saída</option>
                </select>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Descrição</label>
              <input type="text" className={styles.input} value={formData.desc} onChange={e => setFormData({...formData, desc: e.target.value})} placeholder="Ex: Doação em dinheiro" />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Categoria</label>
              <select className={styles.select} value={formData.cat} onChange={e => setFormData({...formData, cat: e.target.value})}>
                <option value="Doações">Doações</option>
                <option value="Mensalidade">Mensalidade</option>
                <option value="Materiais">Materiais</option>
                <option value="Manutenção">Manutenção</option>
                <option value="Outros">Outros</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Valor (R$)</label>
              <input type="number" step="0.01" className={styles.input} value={formData.valor} onChange={e => setFormData({...formData, valor: e.target.value})} placeholder="Ex: 50.00" />
            </div>

            <div className={styles.modalActions}>
              <button className={styles.btnCancel} onClick={() => setIsModalOpen(false)}>Cancelar</button>
              <button className={styles.btnSave} onClick={handleSave}>Salvar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

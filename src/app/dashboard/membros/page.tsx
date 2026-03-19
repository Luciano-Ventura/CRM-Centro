'use client'

import { useState } from 'react'
import styles from './Membros.module.css'

type Role = 'admin' | 'gestao' | 'membro' | 'visitante'

interface Member {
  id: number
  nome: string
  email: string
  tel: string
  role: Role
  status: string
}

const INITIAL_MEMBERS: Member[] = [
  { id: 1, nome: "João Silva", email: "joao@mock.com", tel: "(11) 99999-1111", role: "admin", status: "Ativo" },
  { id: 2, nome: "Maria Oliveira", email: "maria@mock.com", tel: "(11) 98888-2222", role: "gestao", status: "Ativo" },
  { id: 3, nome: "Carlos Souza", email: "carlos@mock.com", tel: "(11) 97777-3333", role: "membro", status: "Ativo" },
  { id: 4, nome: "Ana Costa", email: "ana@mock.com", tel: "(11) 96666-4444", role: "visitante", status: "Inativo" },
]

export default function MembrosPage() {
  const [members, setMembers] = useState<Member[]>(INITIAL_MEMBERS)
  const [search, setSearch] = useState('')
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingMember, setEditingMember] = useState<Member | null>(null)
  const [formData, setFormData] = useState({ nome: '', email: '', tel: '', role: 'visitante', status: 'Ativo' })

  const filtered = members.filter(m => m.nome.toLowerCase().includes(search.toLowerCase()) || m.email.toLowerCase().includes(search.toLowerCase()))

  const openAddModal = () => {
    setEditingMember(null)
    setFormData({ nome: '', email: '', tel: '', role: 'visitante', status: 'Ativo' })
    setIsModalOpen(true)
  }

  const openEditModal = (member: Member) => {
    setEditingMember(member)
    setFormData({ nome: member.nome, email: member.email, tel: member.tel, role: member.role, status: member.status })
    setIsModalOpen(true)
  }

  const handleSave = () => {
    if (editingMember) {
      setMembers(prev => prev.map(m => m.id === editingMember.id ? { ...m, ...formData } as Member : m))
    } else {
      const newMember: Member = { 
        id: Date.now(), 
        nome: formData.nome, 
        email: formData.email, 
        tel: formData.tel, 
        role: formData.role as Role, 
        status: formData.status 
      }
      setMembers(prev => [...prev, newMember])
    }
    setIsModalOpen(false)
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Gestão de Membros</h1>
        <div className={styles.searchBox}>
          <input 
            type="text" 
            placeholder="Buscar por nome ou email..." 
            className={styles.searchInput}
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <button className={styles.btnCreate} onClick={openAddModal}>+ Novo Membro</button>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>Nome</th>
              <th className={styles.th}>Email</th>
              <th className={styles.th}>Telefone</th>
              <th className={styles.th}>Função</th>
              <th className={styles.th}>Status</th>
              <th className={styles.th}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(m => (
              <tr key={m.id}>
                <td className={styles.td}><strong>{m.nome}</strong></td>
                <td className={styles.td}>{m.email}</td>
                <td className={styles.td}>{m.tel}</td>
                <td className={styles.td}>
                  <span className={`${styles.roleBadge} ${styles['role_' + m.role]}`}>
                    {m.role.toUpperCase()}
                  </span>
                </td>
                <td className={styles.td}>{m.status}</td>
                <td className={styles.td}>
                  <button className={styles.btnEdit} onClick={() => openEditModal(m)}>Editar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2 className={styles.modalTitle}>{editingMember ? 'Editar Membro' : 'Novo Membro'}</h2>
            
            <div className={styles.formGroup}>
              <label className={styles.label}>Nome</label>
              <input type="text" className={styles.input} value={formData.nome} onChange={e => setFormData({...formData, nome: e.target.value})} />
            </div>
            
            <div className={styles.formGroup}>
              <label className={styles.label}>Email</label>
              <input type="email" className={styles.input} value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Telefone</label>
              <input type="text" className={styles.input} value={formData.tel} onChange={e => setFormData({...formData, tel: e.target.value})} />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Função (Role)</label>
              <select className={styles.select} value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})}>
                <option value="visitante">Visitante</option>
                <option value="membro">Membro</option>
                <option value="gestao">Gestão</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Status</label>
              <select className={styles.select} value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
                <option value="Ativo">Ativo</option>
                <option value="Inativo">Inativo</option>
              </select>
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

'use client'

import { useState } from 'react'
import styles from './Membros.module.css'

const INITIAL_MEMBERS = [
  { id: 1, nome: "João Silva", email: "joao@mock.com", tel: "(11) 99999-1111", role: "admin", status: "Ativo" },
  { id: 2, nome: "Maria Oliveira", email: "maria@mock.com", tel: "(11) 98888-2222", role: "gestao", status: "Ativo" },
  { id: 3, nome: "Carlos Souza", email: "carlos@mock.com", tel: "(11) 97777-3333", role: "membro", status: "Ativo" },
  { id: 4, nome: "Ana Costa", email: "ana@mock.com", tel: "(11) 96666-4444", role: "visitante", status: "Inativo" },
]

export default function MembrosPage() {
  const [search, setSearch] = useState('')

  const filtered = INITIAL_MEMBERS.filter(m => m.nome.toLowerCase().includes(search.toLowerCase()) || m.email.toLowerCase().includes(search.toLowerCase()))

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
                  <button className={styles.btnEdit}>Editar Cargo</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

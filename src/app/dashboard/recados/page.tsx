'use client'

import { useState } from 'react'
import styles from './Recados.module.css'

interface Recado {
  id: number
  titulo: string
  mensagem: string
  data: string
  autor: string
  importante: boolean
  concluido: boolean
}

const INITIAL_NOTES: Recado[] = [
  { id: 1, titulo: "Campanha do Agasalho 2026", mensagem: "Irmãos, iniciamos neste mês nossa tradicional campanha do agasalho. Quem puder contribuir com cobertores e roupas de frio em bom estado, favor entregar na secretaria antes ou após as giras.", data: "17/03/2026", autor: "Administração", importante: true, concluido: false },
  { id: 2, titulo: "Atenção: Mudança de Horário Sábado", mensagem: "A gira deste sábado excepcionalmente se iniciará às 19h para podermos realizar as bençãos extras das crianças da comunidade. Cheguem com 30min de antecedência.", data: "15/03/2026", autor: "Pai de Santo", importante: false, concluido: false },
  { id: 3, titulo: "Limpeza do Terreiro", mensagem: "Agradecemos profundamente a todos os filhos que ajudaram no mutirão de limpeza geral no último domingo. A casa de Pai Oxalá agradece!", data: "10/03/2026", autor: "Gestão", importante: false, concluido: true },
]

export default function RecadosPage() {
  const [notes, setNotes] = useState<Recado[]>(INITIAL_NOTES)
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingNote, setEditingNote] = useState<Recado | null>(null)
  const [formData, setFormData] = useState({ titulo: '', mensagem: '', importante: false })

  const openAddModal = () => {
    setEditingNote(null)
    setFormData({ titulo: '', mensagem: '', importante: false })
    setIsModalOpen(true)
  }

  const openEditModal = (note: Recado) => {
    setEditingNote(note)
    setFormData({ titulo: note.titulo, mensagem: note.mensagem, importante: note.importante })
    setIsModalOpen(true)
  }

  const handleSave = () => {
    if (editingNote) {
      setNotes(prev => prev.map(n => n.id === editingNote.id ? { ...n, ...formData } : n))
    } else {
      const newNote: Recado = {
        id: Date.now(),
        titulo: formData.titulo,
        mensagem: formData.mensagem,
        data: new Date().toLocaleDateString('pt-BR'),
        autor: "Administração (Você)",
        importante: formData.importante,
        concluido: false
      }
      setNotes(prev => [newNote, ...prev])
    }
    setIsModalOpen(false)
  }

  const toggleConcluido = (id: number) => {
    setNotes(prev => prev.map(n => n.id === id ? { ...n, concluido: !n.concluido } : n))
  }

  const toggleImportante = (id: number) => {
    setNotes(prev => prev.map(n => n.id === id ? { ...n, importante: !n.importante } : n))
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Mural de Recados</h1>
        <button className={styles.btnCreate} onClick={openAddModal}>+ Novo Recado</button>
      </div>

      <div className={styles.feed}>
        {notes.map(note => (
          <div key={note.id} className={`${styles.card} ${note.importante && !note.concluido ? styles.cardImportant : ''} ${note.concluido ? styles.cardCompleted : ''}`}>
            <div className={styles.cardHeader}>
              <div>
                <h3 className={styles.cardTitle}>
                  {note.importante && !note.concluido && '🚨 '}
                  {note.titulo}
                  {note.concluido && ' ✅'}
                </h3>
                <div className={styles.cardMeta}>Postado por <strong>{note.autor}</strong> em {note.data}</div>
              </div>
              <div className={styles.cardActions}>
                <button 
                  className={`${styles.btnAction} ${note.importante ? styles.btnActionActive : ''}`} 
                  onClick={() => toggleImportante(note.id)}
                >
                  {note.importante ? '⭐ Importante' : 'Priorizar'}
                </button>
                <button 
                  className={`${styles.btnAction} ${note.concluido ? styles.btnActionActive : ''}`} 
                  onClick={() => toggleConcluido(note.id)}
                >
                  {note.concluido ? 'Reabrir' : '✔ Concluir'}
                </button>
                <button className={styles.btnAction} onClick={() => openEditModal(note)}>✏ Editar</button>
              </div>
            </div>
            <div className={styles.cardBody}>
              {note.mensagem}
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2 className={styles.modalTitle}>{editingNote ? 'Editar Recado' : 'Novo Recado'}</h2>
            
            <div className={styles.formGroup}>
              <label className={styles.label}>Título</label>
              <input type="text" className={styles.input} value={formData.titulo} onChange={e => setFormData({...formData, titulo: e.target.value})} placeholder="Assunto..." />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Mensagem</label>
              <textarea className={styles.textarea} value={formData.mensagem} onChange={e => setFormData({...formData, mensagem: e.target.value})} placeholder="Escreva os detalhes do aviso..." />
            </div>

            <div className={styles.formGroup} style={{ flexDirection: 'row', alignItems: 'center', gap: '0.8rem', marginTop: '0.5rem' }}>
              <input type="checkbox" id="importanteCheckbox" checked={formData.importante} onChange={e => setFormData({...formData, importante: e.target.checked})} style={{ width: '1.2rem', height: '1.2rem', accentColor: 'var(--color-primary)' }} />
              <label htmlFor="importanteCheckbox" className={styles.label} style={{ cursor: 'pointer' }}>Marcar como aviso Importante/Urgente</label>
            </div>

            <div className={styles.modalActions}>
              <button className={styles.btnCancel} onClick={() => setIsModalOpen(false)}>Cancelar</button>
              <button className={styles.btnSave} onClick={handleSave}>Salvar Recado</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

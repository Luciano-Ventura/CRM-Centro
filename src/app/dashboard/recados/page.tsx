'use client'

import styles from './Recados.module.css'

const INITIAL_NOTES = [
  { id: 1, titulo: "Campanha do Agasalho 2026", mensagem: "Irmãos, iniciamos neste mês nossa tradicional campanha do agasalho. Quem puder contribuir com cobertores e roupas de frio em bom estado, favor entregar na secretaria antes ou após as giras.", data: "17/03/2026", autor: "Administração" },
  { id: 2, titulo: "Atenção: Mudança de Horário Sábado", mensagem: "A gira deste sábado excepcionalmente se iniciará às 19h para podermos realizar as bençãos extras das crianças da comunidade. Cheguem com 30min de antecedência.", data: "15/03/2026", autor: "Pai de Santo" },
  { id: 3, titulo: "Limpeza do Terreiro", mensagem: "Agradecemos profundamente a todos os filhos que ajudaram no mutirão de limpeza geral no último domingo. A casa de Pai Oxalá agradece!", data: "10/03/2026", autor: "Gestão" },
]

export default function RecadosPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Mural de Recados</h1>
        <button className={styles.btnCreate}>+ Novo Recado</button>
      </div>

      <div className={styles.feed}>
        {INITIAL_NOTES.map(note => (
          <div key={note.id} className={styles.card}>
            <div className={styles.cardHeader}>
              <div>
                <h3 className={styles.cardTitle}>{note.titulo}</h3>
                <div className={styles.cardMeta}>Postado por <strong>{note.autor}</strong> em {note.data}</div>
              </div>
            </div>
            <div className={styles.cardBody}>
              {note.mensagem}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

'use client'

import styles from './Financeiro.module.css'

const INITIAL_TX = [
  { id: 1, data: "15/03/2026", desc: "Doação Anônima", cat: "Doações", tipo: "entrada", valor: 500.00 },
  { id: 2, data: "16/03/2026", desc: "Compra de Velas e Charutos", cat: "Materiais", tipo: "saida", valor: 150.00 },
  { id: 3, data: "18/03/2026", desc: "Mensalidade Membros", cat: "Doações", tipo: "entrada", valor: 300.00 },
  { id: 4, data: "19/03/2026", desc: "Conta de Luz", cat: "Manutenção", tipo: "saida", valor: 250.00 },
]

export default function FinanceiroPage() {
  const totalEntradas = INITIAL_TX.filter(t => t.tipo === 'entrada').reduce((acc, curr) => acc + curr.valor, 0)
  const totalSaidas = INITIAL_TX.filter(t => t.tipo === 'saida').reduce((acc, curr) => acc + curr.valor, 0)
  const saldo = totalEntradas - totalSaidas

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Controle Financeiro</h1>
        <button className={styles.btnCreate}>+ Nova Transação</button>
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

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>Data</th>
              <th className={styles.th}>Descrição</th>
              <th className={styles.th}>Categoria</th>
              <th className={styles.th}>Tipo</th>
              <th className={styles.th}>Valor</th>
            </tr>
          </thead>
          <tbody>
            {INITIAL_TX.map(t => (
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

'use client'

import styles from './Overview.module.css'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, Legend, CartesianGrid } from 'recharts'

const financeData = [
  { month: 'Set', Saldo: 2200 },
  { month: 'Out', Saldo: 2500 },
  { month: 'Nov', Saldo: 2100 },
  { month: 'Dez', Saldo: 3100 },
  { month: 'Jan', Saldo: 2800 },
  { month: 'Fev', Saldo: 3100 },
  { month: 'Mar', Saldo: 3450 },
]

const eventData = [
  { name: 'Baianos', Confirmados: 45, VagasEsgotadas: 5 },
  { name: 'Erês', Confirmados: 40, VagasEsgotadas: 10 },
  { name: 'Exu', Confirmados: 30, VagasEsgotadas: 0 },
  { name: 'Caboclos', Confirmados: 20, VagasEsgotadas: 30 },
]

export default function DashboardOverview() {
  return (
    <div>
      <h1 className={styles.title}>Visão Geral</h1>

      <div className={styles.grid}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            Membros Ativos
            <svg width="20" height="20" fill="none" stroke="var(--color-secondary)" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
          </div>
          <div className={styles.cardValue}>124</div>
          <div className={styles.cardSub}>+3 novos este mês</div>
        </div>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            Próxima Gira
            <svg width="20" height="20" fill="none" stroke="var(--color-primary)" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
          </div>
          <div className={styles.cardValue} style={{ fontSize: "1.4rem", marginTop: "0.5rem" }}>Sábado, 18h</div>
          <div className={styles.cardSub}>Pretos Velhos e Crianças</div>
        </div>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            Presenças Hoje
            <svg width="20" height="20" fill="none" stroke="#22c55e" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </div>
          <div className={styles.cardValue}>45/50</div>
          <div className={styles.cardSub}>5 vagas restantes</div>
        </div>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            Caixa Atual
            <svg width="20" height="20" fill="none" stroke="var(--color-primary-dark)" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </div>
          <div className={styles.cardValue}>R$ 3.450</div>
          <div className={styles.cardSub}>Saldo acumulado total</div>
        </div>
      </div>

      <div className={styles.chartsRow}>
        <div className={styles.chartPanel} style={{ cursor: 'crosshair'}}>
          <h2 className={styles.sectionTitle} style={{ marginBottom: '0.1rem' }}>Evolução do Saldo Mês a Mês</h2>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={financeData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorSaldo" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="month" stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `R$${value}`} />
              <Tooltip formatter={(value) => `R$${value}`} />
              <Area type="monotone" dataKey="Saldo" stroke="var(--color-primary)" fillOpacity={1} fill="url(#colorSaldo)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className={styles.chartPanel} style={{ cursor: 'crosshair'}}>
          <h2 className={styles.sectionTitle} style={{ marginBottom: '0.1rem' }}>Frequência Últimas Giras</h2>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={eventData} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
              <XAxis dataKey="name" stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip />
              <Legend iconType="circle" />
              <Bar dataKey="Confirmados" stackId="a" fill="var(--color-primary)" />
              <Bar dataKey="VagasEsgotadas" stackId="a" fill="#e5e5e5" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className={styles.sections}>
        <div className={styles.panel}>
          <h2 className={styles.sectionTitle}>Próximos Eventos</h2>
          <div className={styles.list}>
            <div className={styles.listItem}>
              <div>
                <strong>Gira de Pretos Velhos</strong><br/>
                <span className={styles.cardSub}>Sábado, 24 de Março - 18h00</span>
              </div>
              <span style={{ color: "#eab308", fontWeight: "600" }}>Quase Lotado (45/50)</span>
            </div>
            <div className={styles.listItem}>
              <div>
                <strong>Gira de Caboclos</strong><br/>
                <span className={styles.cardSub}>Quarta, 28 de Março - 20h00</span>
              </div>
              <span style={{ color: "#22c55e", fontWeight: "600" }}>30 Vagas (20/50)</span>
            </div>
          </div>
        </div>

        <div className={styles.panel}>
          <h2 className={styles.sectionTitle}>Mural de Recados</h2>
          <div className={styles.list}>
            <div className={styles.listItem} style={{ flexDirection: "column", gap: "0.5rem" }}>
              <strong>Campanha do Agasalho</strong>
              <span className={styles.cardSub}>Iniciamos a arrecadação de agasalhos. Traga sua doação na próxima gira.</span>
              <span style={{ fontSize: "0.75rem", color: "var(--color-primary)" }}>Por: Administração - Há 2 dias</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

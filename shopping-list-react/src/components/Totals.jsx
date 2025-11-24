import React from 'react'

function fmt(value) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
}

export default function Totals({ items = [] }) {
  const totalWish = items.filter(i => i.status !== 'acquired').reduce((s, i) => s + (i.price || 0) * (i.quantity || 1), 0)
  const totalAcquired = items.filter(i => i.status === 'acquired').reduce((s, i) => s + (i.price || 0) * (i.quantity || 1), 0)
  return (
    <div className="totals">
      <div className="box">
        <div className="label">Total (Desejos)</div>
        <div className="value">{fmt(totalWish)}</div>
      </div>
      <div className="box">
        <div className="label">Total (Adquiridos)</div>
        <div className="value">{fmt(totalAcquired)}</div>
      </div>
    </div>
  )
}

import React from 'react'

function fmt(value) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
}

export default function ItemCard({ item, onUpdate, onDelete, onEdit }) {
  function toggleAcquired() {
    const updated = { ...item }
    if (updated.status === 'acquired') {
      updated.status = 'wish'
      updated.acquiredAt = null
    } else {
      updated.status = 'acquired'
      updated.acquiredAt = new Date().toISOString()
    }
    onUpdate(updated)
  }

  function handleDelete() {
    if (confirm(`Remover "${item.name}"?`)) onDelete(item.id)
  }

  return (
    <div className={`item-card ${item.status === 'acquired' ? 'acquired' : ''}`}>
      <div className="info">
        <div className="title">{item.name}</div>
        <div className="meta">{item.quantity} x {fmt(item.price || 0)}</div>
        <div className="category">{item.category}</div>
        {item.notes && <div className="notes">{item.notes}</div>}
      </div>
      <div className="actions">
        <button onClick={toggleAcquired}>{item.status === 'acquired' ? 'Desmarcar' : 'Marcar comprado'}</button>
        <button onClick={() => onEdit && onEdit(item)}>Editar</button>
        <button onClick={handleDelete} className="danger">Remover</button>
      </div>
    </div>
  )
}

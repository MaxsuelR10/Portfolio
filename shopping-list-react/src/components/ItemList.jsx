import React from 'react'
import ItemCard from './ItemCard'

export default function ItemList({ items = [], onUpdate, onDelete, onEdit }) {
  if (!items.length) return <p className="empty">Nenhum item</p>
  return (
    <div className="item-list">
      {items.map(item => (
        <ItemCard key={item.id} item={item} onUpdate={onUpdate} onDelete={onDelete} onEdit={onEdit} />
      ))}
    </div>
  )
}

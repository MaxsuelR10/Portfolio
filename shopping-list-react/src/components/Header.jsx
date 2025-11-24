import React from 'react'

export default function Header({ onSearch, searchValue = '', categories = [], categoryValue = 'all', onCategoryChange, statusValue = 'all', onStatusChange }) {
  return (
    <header className="header">
      <h1>Lista de Compras</h1>
      <p className="subtitle">Desejos • A comprar • Adquiridos</p>
      <div style={{ marginTop: 8, display: 'flex', gap: 8, alignItems: 'center' }}>
        <input
          aria-label="Pesquisar itens"
          placeholder="Pesquisar por nome..."
          value={searchValue}
          onChange={e => onSearch && onSearch(e.target.value)}
          style={{ padding: '6px 8px', borderRadius: 6, border: '1px solid #e6eef8', width: 260 }}
        />

        <select aria-label="Filtrar por categoria" value={categoryValue} onChange={e => onCategoryChange && onCategoryChange(e.target.value)} style={{ padding: '6px 8px', borderRadius: 6, border: '1px solid #e6eef8' }}>
          <option value="all">Todas as categorias</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <select aria-label="Filtrar por status" value={statusValue} onChange={e => onStatusChange && onStatusChange(e.target.value)} style={{ padding: '6px 8px', borderRadius: 6, border: '1px solid #e6eef8' }}>
          <option value="all">Todos</option>
          <option value="wish">Desejos / A comprar</option>
          <option value="acquired">Adquiridos</option>
        </select>
      </div>
    </header>
  )
}

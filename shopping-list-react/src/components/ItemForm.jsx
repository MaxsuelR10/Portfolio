import React, { useState, useRef } from 'react'

function genId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7)
}

export default function ItemForm({ onAdd, onUpdate, editingItem, onCancel }) {
  const [name, setName] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('')
  const [notes, setNotes] = useState('')
  const nameRef = useRef(null)

  React.useEffect(() => {
    if (editingItem) {
      setName(editingItem.name || '')
      setQuantity(editingItem.quantity || 1)
      setPrice(editingItem.price != null ? String(editingItem.price) : '')
      setCategory(editingItem.category || '')
      setNotes(editingItem.notes || '')
      // foco no campo nome ao entrar em modo edição
      setTimeout(() => nameRef.current && nameRef.current.focus(), 40)
    }
  }, [editingItem])

  function handleSubmit(e) {
    e.preventDefault()
    // validações
    const n = name.trim()
    if (!n) {
      alert('Informe o nome do item')
      nameRef.current && nameRef.current.focus()
      return
    }
    const q = Number(quantity)
    if (!Number.isInteger(q) || q < 1) {
      alert('Quantidade deve ser um número inteiro maior ou igual a 1')
      return
    }
    const p = price === '' ? 0 : Number(parseFloat(price))
    if (Number.isNaN(p) || p < 0) {
      alert('Preço deve ser um número igual ou maior que 0')
      return
    }

    if (editingItem) {
      const updated = {
        ...editingItem,
        name: n,
        quantity: q,
        price: p,
        category: category.trim() || 'Geral',
        notes: notes.trim() || ''
      }
      onUpdate && onUpdate(updated)
    } else {
      const item = {
        id: genId(),
        name: n,
        quantity: q,
        price: p,
        currency: 'BRL',
        status: 'wish',
        category: category.trim() || 'Geral',
        notes: notes.trim() || '',
        createdAt: new Date().toISOString(),
        acquiredAt: null
      }
      onAdd && onAdd(item)
    }
    setName('')
    setQuantity(1)
    setPrice('')
    setCategory('')
    setNotes('')
  }

  return (
    <form className={`item-form ${editingItem ? 'editing' : ''}`} onSubmit={handleSubmit}>
      <h2>Adicionar item</h2>
      <div className="row">
        <label>
          Nome
          <input ref={nameRef} value={name} onChange={e => setName(e.target.value)} placeholder="Ex: Arroz" />
        </label>
        <label>
          Qt
          <input type="number" min="1" value={quantity} onChange={e => setQuantity(e.target.value)} />
        </label>
      </div>
      <div className="row">
        <label>
          Preço (unit.)
          <input value={price} onChange={e => setPrice(e.target.value)} placeholder="39.90" />
        </label>
        <label>
          Categoria
          <input value={category} onChange={e => setCategory(e.target.value)} placeholder="Alimentos" />
        </label>
      </div>
      <label>
        Observações
        <input value={notes} onChange={e => setNotes(e.target.value)} placeholder="Marca, promoção..." />
      </label>
      <div className="actions">
        <button type="submit">{editingItem ? 'Salvar' : 'Adicionar'}</button>
        {editingItem && (
          <button type="button" onClick={() => { onCancel && onCancel(); setName(''); setQuantity(1); setPrice(''); setCategory(''); setNotes('') }} style={{ marginLeft: 8 }}>Cancelar</button>
        )}
      </div>
    </form>
  )
}

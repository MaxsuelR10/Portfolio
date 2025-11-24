import React, { useReducer, useEffect, useState, useRef } from 'react'
import Header from './components/Header'
import ItemForm from './components/ItemForm'
import ItemList from './components/ItemList'
import Totals from './components/Totals'
import { loadItems, saveItems } from './services/storage'
import UndoToast from './components/UndoToast'

const initialState = { items: [] }

function reducer(state, action) {
  switch (action.type) {
    case 'LOAD':
      return { ...state, items: action.payload }
    case 'ADD':
      return { ...state, items: [action.payload, ...state.items] }
    case 'UPDATE':
      return { ...state, items: state.items.map(i => i.id === action.payload.id ? action.payload : i) }
    case 'DELETE':
      return { ...state, items: state.items.filter(i => i.id !== action.payload) }
    default:
      return state
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [editing, setEditing] = useState(null)
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [lastAction, setLastAction] = useState(null)
  const undoTimerRef = useRef(null)

  useEffect(() => {
    const items = loadItems()
    dispatch({ type: 'LOAD', payload: items })
  }, [])

  useEffect(() => {
    saveItems(state.items)
  }, [state.items])

  function handleAdd(item) {
    dispatch({ type: 'ADD', payload: item })
    setLastAction({ type: 'ADD', item })
    clearTimeout(undoTimerRef.current)
    undoTimerRef.current = setTimeout(() => setLastAction(null), 6000)
  }

  function handleUpdate(item) {
    dispatch({ type: 'UPDATE', payload: item })
    setEditing(null)
  }

  function handleDelete(id) {
    const toDelete = state.items.find(i => i.id === id)
    if (!toDelete) return
    dispatch({ type: 'DELETE', payload: id })
    if (editing && editing.id === id) setEditing(null)
    setLastAction({ type: 'DELETE', item: toDelete })
    clearTimeout(undoTimerRef.current)
    undoTimerRef.current = setTimeout(() => setLastAction(null), 6000)
  }

  function handleEdit(item) {
    setEditing(item)
  }

  function handleToggle(itemBefore, itemAfter) {
    dispatch({ type: 'UPDATE', payload: itemAfter })
    setLastAction({ type: 'TOGGLE', before: itemBefore, after: itemAfter })
    clearTimeout(undoTimerRef.current)
    undoTimerRef.current = setTimeout(() => setLastAction(null), 6000)
  }

  function handleUndo() {
    if (!lastAction) return
    const a = lastAction
    if (a.type === 'DELETE') {
      dispatch({ type: 'ADD', payload: a.item })
    } else if (a.type === 'TOGGLE') {
      dispatch({ type: 'UPDATE', payload: a.before })
    } else if (a.type === 'ADD') {
      dispatch({ type: 'DELETE', payload: a.item.id })
    }
    setLastAction(null)
    clearTimeout(undoTimerRef.current)
  }

  // unique categories for filter dropdown (include 'all')
  const categories = Array.from(new Set(state.items.map(i => i.category).filter(Boolean))).sort()

  const filtered = state.items.filter(i => {
    const q = search.trim().toLowerCase()
    if (q && !i.name.toLowerCase().includes(q)) return false
    if (categoryFilter && categoryFilter !== 'all' && i.category !== categoryFilter) return false
    if (statusFilter && statusFilter !== 'all') {
      if (statusFilter === 'wish' && i.status === 'acquired') return false
      if (statusFilter === 'acquired' && i.status !== 'acquired') return false
    }
    return true
  })

  return (
    <div className="app">
      <Header
        onSearch={setSearch}
        searchValue={search}
        categories={categories}
        categoryValue={categoryFilter}
        onCategoryChange={setCategoryFilter}
        statusValue={statusFilter}
        onStatusChange={setStatusFilter}
      />
      <main className="container">
        <section className="left">
          <ItemForm onAdd={handleAdd} onUpdate={handleUpdate} editingItem={editing} onCancel={() => setEditing(null)} />
          <Totals items={state.items} />
        </section>
        <section className="right">
          <h2>Desejos</h2>
          <ItemList
            items={filtered.filter(i => i.status !== 'acquired')}
            onUpdate={item => dispatch({ type: 'UPDATE', payload: item })}
            onDelete={handleDelete}
            onEdit={handleEdit}
            onToggle={(before, after) => handleToggle(before, after)}
          />

          <h2>Adquiridos</h2>
          <ItemList
            items={filtered.filter(i => i.status === 'acquired')}
            onUpdate={item => dispatch({ type: 'UPDATE', payload: item })}
            onDelete={handleDelete}
            onEdit={handleEdit}
            onToggle={(before, after) => handleToggle(before, after)}
          />
        </section>
      </main>
      <UndoToast action={lastAction} onUndo={handleUndo} />
    </div>
  )
}

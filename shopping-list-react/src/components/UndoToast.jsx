import React from 'react'

export default function UndoToast({ action, onUndo }) {
  if (!action) return null

  let message = ''
  if (action.type === 'DELETE') message = `"${action.item.name}" removido.`
  else if (action.type === 'TOGGLE') message = `Alteração de status em "${action.after.name}".`
  else if (action.type === 'ADD') message = `"${action.item.name}" adicionado.`

  return (
    <div className="undo-toast" role="status" aria-live="polite">
      <div className="msg">{message}</div>
      <button className="undo-btn" onClick={onUndo}>Desfazer</button>
    </div>
  )
}

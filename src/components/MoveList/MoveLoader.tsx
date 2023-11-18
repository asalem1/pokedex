import React from 'react'
import './MoveList.css'

export function MoveLoader() {
  return (
    <div className="move-entry__wrapper">
      <div>
        <div className="move-entry__name" style={{ textTransform: 'none' }}>
          xxxxx xxxxx
        </div>
        <div className="move-entry__stat">
          <span>Accuracy</span>
          <span>xx</span>
        </div>
        <div className="move-entry__stat">
          <span>Power</span>
          <span>xx</span>
        </div>
        <div className="move-entry__stat">
          <span>PP</span>
          <span>xx</span>
        </div>
      </div>
      <div className="move-entry__right-panel">
        <div className="move-entry__type">Type: xxxxx</div>
        <div className="move-entry__learn">Learn: Lvl xx</div>
      </div>
    </div>
  )
}

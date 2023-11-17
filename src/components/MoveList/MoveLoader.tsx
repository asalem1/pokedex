import React from "react";
import './MoveLoader.css';

export function MoveLoader() {
  return (
    <div className="move-loader__body">
      <div>
        <div className="move-loader__name-name" style={{textTransform: 'none'}}>
          xxxxx xxxxx
        </div>
        <div className="move-loader__stat">
          <span>Accuracy</span>
          <span>xx</span>
        </div>
        <div className="move-loader__stat">
          <span>Power</span>
          <span>xx</span>
        </div>
        <div className="move-loader__stat">
          <span>PP</span>
          <span>xx</span>
        </div>
      </div>
      <div className="move-loader__right-panel">
        <div className="move-loader__type">Type: xxxxx</div>
        <div className="move-loader__learn">Learn: Lvl xx</div>
      </div>
    </div>
  );
}

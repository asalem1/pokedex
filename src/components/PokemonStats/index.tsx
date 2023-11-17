import React from 'react'
import { Stat } from '../../types';
import './PokemonStats.css'

interface Props {
  stats: Stat[]
}

export function PokemonStats({ stats }: Props) {
  return (
    <div className="screen stats">
      {stats.map((s) => {
        const name = s.stat.name;
        const value = s.base_stat ?? 'xx';

        return (
          <div className="stat-line">
            <span>{name}</span>
            <span>{value}</span>
          </div>
        );
      })}
    </div>
  );
}

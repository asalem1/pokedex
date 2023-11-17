export interface PartialPokemon {
  name: string;
  url: string;
}

interface Ability {
  ability: {
    name: string;
    url: string;
  }
  is_hidden: boolean;
  slot: number;
}

interface GameIndex {
  game_index: number;
  version: {
    name: string;
    url: string;
  }
}

interface VersionGroupDetail {
  level_learned_at: number;
  move_learn_method: {
    name: string;
    url: string;
  };
  version_group: {
    name: string;
    url: string
  }
}

interface Move {
  move: {
    name: string;
    url: string;
  };
  version_group_details: VersionGroupDetail[],
}

interface Sprite {} // TODO: tighten TS

export interface Stat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  }
}

interface Type {
  slot: number;
  type: {
    name: string;
    url: string;
  };
};

export interface Pokemon extends PartialPokemon {
  abilities: Ability[];
  base_experience: number;
  forms: Array<{
    name: string;
    url: string;
  }>
  game_indices: GameIndex;
  height: number;
  held_items: any[]; // TODO: tighten TS
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: Move[]
  name: string;
  order: number;
  past_abilities: any[]; // TODO: tighten TS
  past_types: any[]; // TODO: tighten TS
  species: {
    name: string;
    url: string;
  };
  sprites: Sprite;
  stats: Stat[];
  type: Type[];
  weight: number;
}

interface Language {
  name: string
  url: string
}

interface EffectEntry {
  effect: string
  language: Language
  short_effect: string
}

interface VersionGroup {
  name: string
  url: string
}

export interface FlavorTextEntry {
  flavor_text: string
  language: Language
  version_group: VersionGroup
}

export interface Move {
  accuracy: number
  contest_combos: null | any
  contest_effect: {
    url: string
  }
  contest_type: {
    name: string
    url: string
  }
  damage_class: {
    name: string
    url: string
  }
  effect_change: null | any
  effect_changes: any[]
  effect_entries: EffectEntry[]
  flavor_text_entries: FlavorTextEntry[]
  generation: {
    name: string
    url: string
  }
  id: number
  learned_by_pokemon: Array<{
    name: string
    url: string
  }>
  machines: {
    machine: {
      url: string
      version_group: VersionGroup
    }
  }
  meta: any // TODO: tighten TS
  name: string
  names: Array<{
    language: Language
    name: string
  }>
  past_values: any[] // TODO: tighten TS
  power: number
  pp: number
  priority: number
  stat_changes: any[] // TODO: tighten TS
  super_contest_effect: {
    url: string
  }
  target: {
    name: string
    url: string
  }
  type: {
    name: string
    url: string
  }
}

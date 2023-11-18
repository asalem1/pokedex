export interface Evolution {
  baby_trigger_item: any | null;
  chain: {
    evolution_details: any[];
    evolves_to: any[];
    is_baby: boolean;
    species: {
      name: string;
      url: string;
    };
  };
  id: number;
}

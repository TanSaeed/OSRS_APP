export interface DemoLoadoutEquipment {
  head?: string;
  body?: string;
  legs?: string;
  weapon?: string;
  shield?: string;
  cape?: string;
  amulet?: string;
  ring?: string;
  boots?: string;
  gloves?: string;
}

export interface DemoLoadout {
  id: number;
  userId: number | null;
  equipment: DemoLoadoutEquipment | null;
}

export const demoLoadouts: DemoLoadout[] = [
  {
    id: 1,
    userId: 101,
    equipment: {
      head: "Armadyl helmet",
      body: "Armadyl chestplate",
      legs: "Armadyl chainskirt",
      weapon: "Twisted bow",
      cape: "Ava's assembler",
      amulet: "Necklace of anguish",
      ring: "Archers' ring (i)",
      boots: "Pegasian boots",
      gloves: "Zaryte vambraces",
    },
  },
  {
    id: 2,
    userId: 202,
    equipment: {
      head: "Ancestral hat",
      body: "Ancestral robe top",
      legs: "Ancestral robe bottom",
      weapon: "Kodai wand",
      shield: "Arcane spirit shield",
      cape: "Imbued god cape",
      amulet: "Occult necklace",
      ring: "Seers' ring (i)",
      boots: "Eternal boots",
      gloves: "Barrows gloves",
    },
  },
  {
    id: 3,
    userId: null,
    equipment: {
      head: "Initiate sallet",
      body: "Initiate hauberk",
      legs: "Initiate cuisse",
      weapon: "Dragon scimitar",
      shield: "Dragon defender",
      cape: "Fire cape",
      amulet: "Amulet of torture",
      ring: "Berserker ring (i)",
      boots: "Guardian boots",
      gloves: "Ferocious gloves",
    },
  },
];

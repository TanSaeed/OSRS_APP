export interface DemoLoot {
  lootId: number;
  quantity: number;
  addedBy: number | null;
  clanId: number | null;
}

export const demoLoot: DemoLoot[] = [
  {
    lootId: 11802,
    quantity: 1,
    addedBy: 101,
    clanId: 1,
  },
  {
    lootId: 20997,
    quantity: 1,
    addedBy: 102,
    clanId: 1,
  },
  {
    lootId: 22486,
    quantity: 3,
    addedBy: 201,
    clanId: 2,
  },
];

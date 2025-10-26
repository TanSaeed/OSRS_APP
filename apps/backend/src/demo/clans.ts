export interface DemoClanMember {
  id: number;
  username: string;
  userRole: "member" | "leader" | "admin";
}

export interface DemoClan {
  id: number;
  clanName: string | null;
  leaderId: number | null;
  estAt: string | null;
  leader?: DemoClanMember | null;
  members?: DemoClanMember[];
}

export const demoClans: DemoClan[] = [
  {
    id: 1,
    clanName: "Lumbridge Legends",
    leaderId: 101,
    estAt: "2024-01-15T10:00:00.000Z",
    leader: { id: 101, username: "demo_leader", userRole: "leader" },
    members: [
      { id: 101, username: "demo_leader", userRole: "leader" },
      { id: 102, username: "demo_member1", userRole: "member" },
      { id: 103, username: "demo_member2", userRole: "member" },
    ],
  },
  {
    id: 2,
    clanName: "Varrock Vanguard",
    leaderId: 201,
    estAt: "2023-11-02T18:30:00.000Z",
    leader: { id: 201, username: "demo_vanguard", userRole: "leader" },
    members: [
      { id: 201, username: "demo_vanguard", userRole: "leader" },
      { id: 202, username: "demo_scout", userRole: "member" },
    ],
  },
  {
    id: 3,
    clanName: "Falador Forged",
    leaderId: null,
    estAt: "2022-07-01T00:00:00.000Z",
    leader: null,
    members: [
      { id: 301, username: "demo_smith", userRole: "member" },
      { id: 302, username: "demo_knight", userRole: "member" },
    ],
  },
];

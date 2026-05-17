import type { UserRole } from "../models/user.model.js";

export interface DemoUser {
  id: number;
  username: string;
  userRole: UserRole;
  clanId: number | null;
  createdAt: string;
}

export const demoUsers: DemoUser[] = [
  {
    id: 101,
    username: "demo_leader",
    userRole: "leader",
    clanId: 1,
    createdAt: "2024-01-15T10:00:00.000Z",
  },
  {
    id: 102,
    username: "demo_member1",
    userRole: "member",
    clanId: 1,
    createdAt: "2024-02-02T12:30:00.000Z",
  },
  {
    id: 201,
    username: "demo_vanguard",
    userRole: "leader",
    clanId: 2,
    createdAt: "2023-11-02T18:30:00.000Z",
  },
];

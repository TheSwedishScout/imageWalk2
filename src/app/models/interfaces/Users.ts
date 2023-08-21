export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  userHistories: UserHistory[];
}

export interface UserHistory {
  trackId: number;
  score: number;
  created: string;
}

export interface User {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
}

export interface UserDetails {
  uid: string;
  email: string;
  username: string;
  gender: string;
  ageGroup: string;
  locality: string;
  riskGroup: string;
  temperature: boolean;
  cardiac: boolean;
  oxigen: boolean;
  arterialTension: boolean;
  glicemic: boolean;
  respiratoryCapacity: boolean;
  headthroatpain: boolean;
}

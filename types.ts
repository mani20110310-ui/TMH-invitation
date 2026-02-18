
export enum Role {
  PLANNER = 'PLANNER',
  SPOKESPERSON = 'SPOKESPERSON'
}

export interface SocialNote {
  id: number;
  location: string;
  name: string;
  content: string;
  type: 'note' | 'bullet';
}

export interface BenefitItem {
  id: string;
  title: string;
  icon: string;
  desc: string;
  color: string;
}

export interface UserNotification {
  id: number;
  title: string;
  text: string;
  action?: {
    type: "button";
    label: string;
    labelSuccess: string;
    url: string;
    payload?: any;
  };
  links?: Link[];
  leftImage: string | null;

  type: string;
  createdAt: Date;
}

interface Link {
  type: LinkType;
  id: number;
  start: number;
  end: number;
}

export type LinkType = "user" | "lobby" | "guild";
export enum LinkTypeEnum {
  user = "user",
  lobby = "lobby",
  guild = "guild",
}

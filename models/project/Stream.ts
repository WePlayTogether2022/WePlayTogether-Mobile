export interface Stream {
  type: "youtube" | "twitch";
  icon: string;
  iconColor: string;
  iconBackgroundColor: string;
  stream: {
    viewerCount: number;
    title: string;
    description: string | null;
    link: string | null;
    thumbnails: {
      default: {
        url: string;
        width: number;
        height: number;
      };
      medium: {
        url: string;
        width: number;
        height: number;
      };
      high: {
        url: string;
        width: number;
        height: number;
      };
    };
  };
  user: {
    profileImageUrl: string;
    displayName: string;
  };
}

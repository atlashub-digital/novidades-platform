export type VideoProvider =
  | "vps"
  | "telegram"
  | "youtube"
  | "cloudflare_stream";

export type LessonMediaManifest = {
  lessonId: string;
  title: string;
  provider: VideoProvider;
  providerAssetId?: string;
  protectedPath?: string;
  telegramChannelKey?: string;
  preview: boolean;
  durationSeconds?: number;
};

export function isDirectWebPlayerProvider(provider: VideoProvider) {
  return provider === "vps" || provider === "youtube" || provider === "cloudflare_stream";
}

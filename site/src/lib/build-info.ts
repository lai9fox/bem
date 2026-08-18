export const buildTime: string = import.meta.env.PUBLIC_BUILD_TIME;
export const gitSha: string = import.meta.env.PUBLIC_GIT_SHA;
export const gitShaFull: string = import.meta.env.PUBLIC_GIT_SHA_FULL;

export function formatBuildTime(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  const pad = (value: number) => String(value).padStart(2, '0');
  return `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(date.getUTCDate())} ${pad(date.getUTCHours())}:${pad(date.getUTCMinutes())} UTC`;
}

export function formatTime(totalSeconds: number): string {
  const s = Math.max(0, Math.round(totalSeconds));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  const pad = (n: number) => String(n).padStart(2, "0");
  return h > 0 ? `${h}:${pad(m)}:${pad(sec)}` : `${m}:${pad(sec)}`;
}

export function getRemainingReal(media: HTMLMediaElement): number | null {
  const { duration, currentTime, playbackRate } = media;
  if (!isFinite(duration) || playbackRate <= 0) return null; // live / invalid
  return (duration - currentTime) / playbackRate;
}

export function attachRemainingTime(
  media: HTMLMediaElement,
  el: HTMLElement
) {
  const update = () => {
    const r = getRemainingReal(media);
    el.textContent = r === null ? "" : `-${formatTime(r)}`;
  };
  media.addEventListener("timeupdate", update);
  media.addEventListener("ratechange", update);
  media.addEventListener("durationchange", update);
  update();
  return () => {
    media.removeEventListener("timeupdate", update);
    media.removeEventListener("ratechange", update);
    media.removeEventListener("durationchange", update);
  };
}

/**
 * URL에서 호스트명을 추출합니다.
 * @param url - 호스트명을 추출할 URL
 * @returns 호스트명 또는 원본 URL (파싱 실패 시)
 */
export function getHostname(url: string): string {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
}

/**
 * URL이 유효한지 검증합니다.
 * @param url - 검증할 URL
 * @returns 유효성 여부
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}
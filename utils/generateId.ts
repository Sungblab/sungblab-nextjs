/**
 * 헤딩 텍스트를 HTML id 속성에 사용할 수 있는 형태로 변환합니다.
 * 한글, 영문, 숫자를 지원하며, TOC 링크와 실제 헤딩 id가 항상 일치합니다.
 */
export function generateId(text: string): string {
  return text
    .toString()
    .replace(/[^가-힣a-zA-Z0-9\s]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .toLowerCase();
}

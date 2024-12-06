export const stripMarkdown = (markdown: string): string => {
  return markdown
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // 링크 제거
    .replace(/[*_~`]/g, "") // 강조 문법 제거
    .replace(/#{1,6}\s/g, "") // 제목 문법 제거
    .replace(/(?:^|\n)>[^\n]*/g, "") // 인용구 제거
    .replace(/```[\s\S]*?```/g, "") // 코드 블록 제거
    .replace(/\n/g, " ") // 줄바꿈을 공백으로 변환
    .trim();
};

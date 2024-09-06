import { StaticImageData } from "next/image";
import sbImage from "../img/pr1.png";
import clImage from "../img/pr2.png";
import wdjImage from "../img/pr3.png";
import attImage from "../img/pr4.png";
import aiImage from "../img/pr5.png";
import qrImage from "../img/pr6.png";
import llamaImage from "../img/pr7.png";

export interface Project {
  id: number;
  title: string;
  description: string;
  link: string;
  image: StaticImageData;
  technologies: string[];
  date: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Sungblab",
    description:
      "React와 Next.js를 사용하여 개발한 반응형 개인 포트폴리오 웹사이트입니다.",
    link: "https://github.com/Kimsungbin1/sungblab-nextjs",
    image: sbImage,
    technologies: ["React", "Next.js", "Tailwind CSS"],
    date: "2024-09-05",
  },
  {
    id: 2,
    title: "Codelab",
    description:
      "HTML과 Tailwind css를 사용하여 개발한 동아리 포트폴리오 사이트입니다.",
    link: "https://github.com/Kimsungbin1/Codelap",
    image: clImage,
    technologies: ["HTML", "Tailwind CSS"],
    date: "2024-05-27",
  },
  {
    id: 3,
    title: "WDJ",
    description:
      "완·대·전은 완도고등학교 대신 전해드립니다 의 줄임말로, 완도고등학교 학생들을 위한 종합 커뮤니티 플랫폼입니다. 우리 학교 학생들의 소통과 정보 공유를 위해 제작했습니다.",
    link: "https://wdj.kr/",
    image: wdjImage,
    technologies: ["HTML", "Tailwind CSS", "Node.js", "Express.js", "MongoDB"],
    date: "2024-08-03",
  },
  {
    id: 4,
    title: "sb_python_attendance_system",
    description:
      "고등학교 생활중 학급에서 얼굴인식 출결관리 시스템을 하면 좋겠다는 생각에 얼굴인식 기술을 활용해 파이썬으로 구현해 보았습니다.",
    link: "https://github.com/Kimsungbin1/SB_face_recognition_system",
    image: attImage,
    technologies: ["Python", "open_cv", "face_recognition"],
    date: "2024-05-21",
  },
  {
    id: 5,
    title: "ai_career_advisor",
    description:
      "고등학교 행사중 과학수학 페스티벌에 출전하기 위해 LLM api를 이용한 프롬프트 엔지니어링 인공지능 진로 탐색 서비스를 만들었습니다",
    link: "https://github.com/Kimsungbin1",
    image: aiImage,
    technologies: ["Python", "Flask", "Claude 3.5 sonnet api", "Tailwind CSS"],
    date: "2024-08-25",
  },
  {
    id: 6,
    title: "QR attend system",
    description:
      "이 프로젝트는 QR 코드를 사용한 출석 시스템입니다. 사용자는 모바일 웹을 통해 QR 코드를 스캔하여 출석을 확인할 수 있습니다. 제 학교 학급에서 실제로 사용하기 위해 개발했습니다. ",
    link: "https://github.com/Kimsungbin1",
    image: qrImage,
    technologies: ["HTML", "Tailwind CSS", "Node.js", "Express.js", "MongoDB"],
    date: "2024-08-07",
  },
  {
    id: 7,
    title: "llama3 fine-tuning EEVE-Korean-10.8B voice assistant",
    description:
      "이 프로젝트는 RTX 4070 ti super 모델을 ai 연산, 추론에 활용해보기위해 llama3 8b 한국어 파인튜닝 모델을 활용해서 음성인식 보이스 어시스턴트를 만들어 보았습니다.",
    link: "https://youtu.be/OIVoiqm4ZuU?si=vgzCIqXWaoPyy7Y-",
    image: llamaImage,
    technologies: [
      "pytorch",
      "Python",
      "hugging face",
      "Text-to-Speech",
      "transfomer",
    ],
    date: "2024-07-14",
  },
];

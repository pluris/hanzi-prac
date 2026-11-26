# 한자 탐험대 PWA

## Vercel 배포
1. 이 폴더를 GitHub 저장소에 업로드합니다.
2. Vercel에서 Add New → Project → 해당 저장소 Import를 선택합니다.
3. Framework Preset은 Next.js, Build Command는 `npm run build`로 둡니다. Output Directory는 비워 둡니다.
4. Deploy를 누릅니다.

## 로컬 실행
```bash
npm install
npm run dev
```

## 갤럭시 탭 설치
Chrome에서 배포 URL을 열고 메뉴 → 앱 설치 또는 홈 화면에 추가를 선택합니다.

학습 기록은 해당 브라우저의 localStorage에 저장됩니다. 현재 버전의 한자 뜻은 기본 학습용 초안이므로 시험 전 공식 배정표와 대조가 필요합니다.

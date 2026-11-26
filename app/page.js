'use client';
import {useEffect,useMemo,useState} from 'react';
const groups = [
['8급',`九 金 南 男 女 東 六 母 木 門 父 北 四 三 西 水 十 五 月 二 人 日 一 子 弟 七 土 八 兄 火`],
['7급',`江 口 內 年 大 目 白 山 上 小 手 外 右 入 足 左 中 靑 出 下`],
['6급',`犬 己 林 馬 名 百 生 石 先 姓 心 羊 魚 玉 牛 耳 地 川 千 天`],
['준5급',`車 巾 古 工 今 同 力 立 末 文 方 本 夫 不 士 夕 世 少 食 央 王 位 衣 字 自 正 主 寸 向 休`]
];
const meanings = {
'九':'아홉 구','金':'쇠 금','南':'남녘 남','男':'사내 남','女':'여자 녀','東':'동녘 동','六':'여섯 륙','母':'어미 모','木':'나무 목','門':'문 문','父':'아비 부','北':'북녘 북','四':'넉 사','三':'석 삼','西':'서녘 서','水':'물 수','十':'열 십','五':'다섯 오','月':'달 월','二':'두 이','人':'사람 인','日':'날 일','一':'한 일','子':'아들 자','弟':'아우 제','七':'일곱 칠','土':'흙 토','八':'여덟 팔','兄':'형 형','火':'불 화',
'江':'강 강','口':'입 구','內':'안 내','年':'해 년','大':'큰 대','目':'눈 목','白':'흰 백','山':'메 산','上':'위 상','小':'작을 소','手':'손 수','外':'바깥 외','右':'오른쪽 우','入':'들 입','足':'발 족','左':'왼쪽 좌','中':'가운데 중','靑':'푸를 청','出':'날 출','下':'아래 하',
'犬':'개 견','己':'몸 기','林':'수풀 림','馬':'말 마','名':'이름 명','百':'일백 백','生':'날 생','石':'돌 석','先':'먼저 선','姓':'성 성','心':'마음 심','羊':'양 양','魚':'물고기 어','玉':'구슬 옥','牛':'소 우','耳':'귀 이','地':'땅 지','川':'내 천','千':'일천 천','天':'하늘 천',
'車':'수레 차','巾':'수건 건','古':'옛 고','工':'장인 공','今':'이제 금','同':'한가지 동','力':'힘 력','立':'설 립','末':'끝 말','文':'글월 문','方':'모 방','本':'근본 본','夫':'지아비 부','不':'아닐 불','士':'선비 사','夕':'저녁 석','世':'세상 세','少':'적을 소','食':'먹을 식','央':'가운데 앙','王':'임금 왕','位':'자리 위','衣':'옷 의','字':'글자 자','自':'스스로 자','正':'바를 정','主':'주인 주','寸':'마디 촌','向':'향할 향','休':'쉴 휴'
};
const data=groups.flatMap(([grade,s])=>s.split(' ').map(h=>({h,grade,meaning:meanings[h]||'뜻 확인 필요'})));
function shuffle(a){return [...a].sort(()=>Math.random()-.5)}
export default function Home(){
 const [tab,setTab]=useState('home'),[grade,setGrade]=useState('전체'),[idx,setIdx]=useState(0),[quiz,setQuiz]=useState([]),[qi,setQi]=useState(0),[score,setScore]=useState(0),[wrong,setWrong]=useState([]),[done,setDone]=useState(0),[answer,setAnswer]=useState(null),[isExam,setIsExam]=useState(false),[responses,setResponses]=useState([]);
 useEffect(()=>{try{setWrong(JSON.parse(localStorage.getItem('hq-wrong')||'[]'));setDone(+localStorage.getItem('hq-done')||0)}catch{}},[]);
 const saveWrong=(v)=>{setWrong(v);localStorage.setItem('hq-wrong',JSON.stringify(v))};
 const list=useMemo(()=>grade==='전체'?data:data.filter(x=>x.grade===grade),[grade]);
 const start=(n=10,source=data,exam=false)=>{setQuiz(shuffle(source).slice(0,n));setQi(0);setScore(0);setAnswer(null);setResponses([]);setIsExam(exam);setTab('quiz')};
 const current=quiz[qi];
 const choose=(m)=>{setAnswer(m);if(isExam){setResponses(r=>{const next=[...r];next[qi]=m;return next});}};
 const next=()=>{if(answer===null)return;if(!isExam){if(answer===current.meaning)setScore(s=>s+1);else if(!wrong.includes(current.h))saveWrong([...wrong,current.h]);}if(qi+1>=quiz.length){if(isExam){const finalResponses=responses.map((v,i)=>i===qi?answer:v);const finalScore=quiz.reduce((n,q,i)=>n+(finalResponses[i]===q.meaning?1:0),0);setScore(finalScore);const missed=quiz.filter((q,i)=>finalResponses[i]!==q.meaning).map(q=>q.h);if(missed.length)saveWrong([...new Set([...wrong,...missed])]);}setDone(d=>{localStorage.setItem('hq-done',String(d+1));return d+1});setTab('result')}else{setQi(q=>q+1);setAnswer(null)}};
 const opts=useMemo(()=>current?shuffle([current.meaning,...shuffle(data.filter(x=>x.h!==current.h)).slice(0,3).map(x=>x.meaning)]):[],[current]);
 return <main>
 <header><div className="brand">漢 <span>한자 탐험대</span></div><small>준5급 누적 100자 학습</small></header>
 {tab==='home'&&<><section className="hero"><div className="mascot">🐯</div><div><h1>오늘도 한자 탐험!</h1><p>재미있게 배우고 별을 모아봐요.</p></div></section>
 <div className="stats"><div><b>{done}</b><small>완료한 학습</small></div><div><b>{wrong.length}</b><small>오답 한자</small></div><div><b>{data.length}</b><small>전체 한자</small></div></div>
 <div className="tiles"><button onClick={()=>{setIdx(0);setTab('daily')}}>🌱 오늘의 한자<small>5자씩 차근차근</small></button><button onClick={()=>setTab('dictionary')}>📚 한자 도감<small>급수별 100자 보기</small></button><button onClick={()=>start(10)}>✏️ 연습 퀴즈<small>10문항 도전</small></button><button onClick={()=>start(50,data,true)}>🏆 실전 모의고사<small>50문항 · 70점 합격</small></button><button onClick={()=>start(Math.min(50,wrong.length),data.filter(x=>wrong.includes(x.h)))} disabled={!wrong.length}>📝 오답 다시 풀기<small>{wrong.length}자 저장됨</small></button></div></>}
 {tab==='dictionary'&&<><h2>📚 한자 도감</h2><select value={grade} onChange={e=>setGrade(e.target.value)}>{['전체',...groups.map(g=>g[0])].map(x=><option>{x}</option>)}</select><div className="grid">{list.map(x=><article><strong>{x.h}</strong><b>{x.meaning}</b><small>{x.grade}</small></article>)}</div></>}
 {tab==='daily'&&<><h2>🌱 오늘의 한자</h2><p>하루에 다섯 글자씩 익혀요. ({idx+1} / 5)</p><article className="study"><strong>{data[idx].h}</strong><h2>{data[idx].meaning}</h2><small>{data[idx].grade}</small></article><div className="actions">{idx>0&&<button onClick={()=>setIdx(i=>Math.max(0,i-1))}>이전</button>}{idx<4?<button onClick={()=>setIdx(i=>Math.min(4,i+1))}>다음 한자</button>:<button onClick={()=>{setIdx(0);setTab('home')}}>오늘 학습 마치기</button>}</div></>}
 {tab==='quiz'&&current&&<><div className="quiztop"><span>{qi+1} / {quiz.length}</span><span>{isExam?"모의고사 진행 중":"정답 "+score}</span></div><div className="progress"><i style={{width:`${(qi/quiz.length)*100}%`}}/></div><section className="question"><small>이 한자의 훈음은?</small><strong>{current.h}</strong></section><div className={`answers ${answer!==null?'answered':''}`}>{opts.map(o=><button key={o} className={isExam?(answer===o?'selected':''):(answer!==null&&o===current.meaning?'correct':answer===o?'wrong':'')} onClick={()=>choose(o)}>{o}</button>)}</div><div className="quiz-actions"><button className="next-question" onClick={next} disabled={answer===null}>{qi+1===quiz.length?(isExam?'시험 제출':'결과 보기'):'다음 문제'}</button></div></>}
 {tab==='result'&&<section className="result"><div className="mascot">🏅</div><h1>{isExam?'모의고사 결과':'탐험 완료!'}</h1><h2>{score} / {quiz.length} 정답</h2><p>정답률 {Math.round(score/quiz.length*100)}% · 오답 {quiz.length-score}개</p>{isExam&&<h2>{score>=35?'합격 기준 달성! 🎉':'아쉽지만 불합격 · 다시 도전해봐요!'}</h2>}{isExam&&<div className="review"><h3>문제별 결과</h3>{quiz.map((q,i)=><div className={`reviewrow ${responses[i]===q.meaning?'review-ok':'review-no'}`} key={`${q.h}-${i}`}><strong>{i+1}. {q.h}</strong><span>내 답: {responses[i]||'미응답'}</span><span>정답: {q.meaning}</span><b>{responses[i]===q.meaning?'정답':'오답'}</b></div>)}</div>}<button onClick={()=>setTab('home')}>홈으로</button><button onClick={()=>start(quiz.length,data,isExam)}>다시 도전</button></section>}
 <footer>{['home','dictionary','daily'].includes(tab)&&<button onClick={()=>setTab('home')}>홈</button>}<button onClick={()=>setTab('dictionary')}>도감</button><button onClick={()=>setTab('daily')}>학습</button><button onClick={()=>setTab('home')}>메뉴</button></footer>
 </main>
}

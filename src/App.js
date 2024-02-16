import { useEffect, useMemo, useRef, useState } from 'react';
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';

function App() {
  const [data, setData] = useState([]);
  const dataId = useRef(0);

  const getData = async () => {
    const res = await fetch(
      'https://jsonplaceholder.typicode.com/comments'
    ).then((res) => res.json()); //res에는 객체 배열이 저장되어 있다.

    const initData = res.slice(0, 20).map((it) => {
      return {
        author: it.email,
        content: it.body,
        emotion: Math.floor(Math.random() * 5) + 1,
        create_dated: new Date().getTime(),
        id: dataId.current++,
      };
    });
    setData(initData);
  }; //API 호출 내장함수 fetch 사용

  useEffect(() => {
    getData();
  }, []);

  const onCreate = (author, content, emotion) => {
    const create_dated = new Date().getTime();
    const newData = {
      author,
      //키와 값의 이름이 동일하므로 (author: author) 축약하여 author라고만 쓸 수도 있다.
      content,
      emotion,
      create_dated,
      id: dataId.current,
    };
    dataId.current += 1;
    setData([newData, ...data]);
  };

  const onRemove = (targetId) => {
    console.log(`${targetId}가 삭제되었습니다.`);
    const newDiaryList = data.filter((it) => it.id !== targetId);
    setData(newDiaryList);
  };

  const onEdit = (targetId, newContent) => {
    //특정 일기 데이터를 수정하는 함수
    setData(
      data.map((it) =>
        it.id === targetId ? { ...it, content: newContent } : it
      )
    );
  };

  const getDiaryAnalysis = useMemo(() => {
    console.log('일기 분석 시작');

    const goodCount = data.filter((it) => it.emotion >= 3).length;
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount / data.length) * 100;

    return { goodCount, badCount, goodRatio }; //getDiaryAnalysis의 반환값은 객체
  }, [data.length]);

  const { goodCount, badCount, goodRatio } = getDiaryAnalysis;
  //getDiaryAnalysis는 UseMemo의 반환값인 객체를 가지고 있는 상수

  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate} />
      <div>전체 일기 : {data.length}</div>
      <div>기분 좋은 일기 개수 : {goodCount}</div>
      <div>기분 나쁜 일기 개수 : {badCount}</div>
      <div>기분 좋은 일기 비율 : {goodRatio} %</div>
      <DiaryList diaryList={data} onRemove={onRemove} onEdit={onEdit} />
    </div>
  );
}

export default App;

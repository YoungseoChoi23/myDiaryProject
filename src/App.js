import { useRef, useState } from 'react';
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';

function App() {
  const [data, setData] = useState([]);
  const dataId = useRef(0);

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

  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate} />
      <DiaryList diaryList={data} onRemove={onRemove} onEdit={onEdit} />
    </div>
  );
}

export default App;

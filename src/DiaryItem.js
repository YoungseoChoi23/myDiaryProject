import React, { useState, useRef, useEffect } from 'react';

const DiaryItem = ({
  id,
  author,
  content,
  emotion,
  create_dated,
  onRemove,
  onEdit,
}) => {
  useEffect(() => {
    console.log(`${id}번째 아이템 렌더`);
  });
  const localContentInput = useRef();

  const handleRemove = () => {
    if (window.confirm(`${id}번째 일기를 정말 삭제하시겠습니까?`)) onRemove(id);
  };

  const [isEdit, setIsEdit] = useState(false); //수정 중인지 아닌지의 값을 보관해놓는 변수 isEdit

  const toggleIsEdit = () => setIsEdit(!isEdit); //수정 상태를 반전시키는 함수

  const [localContent, setLocalContent] = useState(content);

  const handleQuitEdit = () => {
    //수정 상태에서 나감 (수정 취소)
    setIsEdit(false);
    setLocalContent(content);
  };

  const handleEdit = () => {
    if (localContent.length < 5) {
      localContentInput.current.focus();
      return;
    }
    if (window.confirm(`${id}번째 일기를 수정하시겠습니까?`)) {
      onEdit(id, localContent);
      toggleIsEdit();
    }
  };

  return (
    <div className="DiaryItem">
      <div className="info">
        <span>
          작성자:{author} | 감정 점수 : {emotion}
        </span>
        <br />
        <span className="date">{new Date(create_dated).toLocaleString()}</span>
      </div>
      <div className="content">
        {isEdit ? (
          <>
            <textarea
              ref={localContentInput}
              value={localContent}
              onChange={(e) => {
                setLocalContent(e.target.value);
              }}
            />
          </>
        ) : (
          <>{content}</>
        )}
      </div>
      {isEdit ? (
        <>
          <button onClick={handleQuitEdit}>수정취소</button>
          <button onClick={handleEdit}>수정완료</button>
        </>
      ) : (
        <>
          <button onClick={handleRemove}>삭제하기</button>
          <button onClick={toggleIsEdit}>수정하기</button>
        </>
      )}
    </div>
  );
};
export default React.memo(DiaryItem);

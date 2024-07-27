import React, { useState } from "react";

const DataDisplay = () => {
  const [dataBoard, setDataBoard] = useState([]);
  //setDataBoard는 dataBoard 상태를 업데이트하는 함수
  //빈 배열에 서버에서 받아온 게시판 데이터 저장

  const [board, setBoard] = useState({
    id: null,
    title: "",
    content: "",
    writer: "",
  });

  //데이터 가져오는 함수('http://localhost:8080/board'에서 데이터 가져옴)
  const loadBoard = async () => {
    await fetch("http://localhost:8080/board") //여기서 받은 응답을
      .then((resp) => {
        return resp.json(); //json형식으로 parsing
      })
      .then((result) => {
        setDataBoard(result); //parsing한 데이터를 dataBoard에 업데이트
      })
      .catch((error) => {
        console.error("Error fetching Board:", error);
      });
  };
  //커피숍에서 주문을 받고 음료를 만들고 음료를 서빙 후 다시 재 주문을 받고
  //음료를 만드는 것이 동기적 처리이며,
  //모든 사람의 주문을 한꺼번에 받고 음료가 완성되는 대로
  //사람들에게 서빙을 하는 것이 비동기적 처리이다.

  //데이터 추가하는 함수(비동기 함수)
  const addBoard = async () => {
    try {
      const response = await fetch("http://localhost:8080/board", {
        //fetch함수로 서버에 http 요청보냄
        //await 을 사용해서 fetch호출이 완료될 때 까지 기다림
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(board), //board 객체를 JSON문자열로 변환
      });
      const result = await response.json(); //서버의 응답을 JSON형식으로 변환
      //await을 사용하여 변환이 완료될 때까지 기다림
      setDataBoard({ title: "", content: "", writer: "" }); //초기상태로 리셋
      loadBoard(); //게시판 데이터를 다시 로드
    } catch (error) {
      console.error("Error adding Board:", error);
    }
  };

  const deleteBoard = async () => {
    try {
      const response = await fetch("http://localhost:8080/board", {
        method: "DELETE",
        headers: {
          Content_Type: "application/json",
        },
        body: JSON.stringify({ id: board.id }),
      });
      const result = await response.json();
      setDataBoard({ id: null, title: "", content: "", writer: "" });
      loadBoard();
    } catch (error) {
      console.error("Error adding Board:", error);
    }
  };

  const updateBoard = async () => {
    try {
      const response = await fetch(`http://localhost:8080/board`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(board),
      });
      const result = await response.json();
      setBoard({ id: null, title: "", content: "", writer: "" }); // 입력 폼 초기화
      loadBoard();
    } catch (error) {
      console.error("Error updating Board:", error);
    }
  };

  const handelChange = (e) => {
    const { name, value } = e.target; //e의 target속성에서 name, value 추출
    setBoard((prevState) => ({
      //싱태 업데이트
      ...prevState,
      [name]: value, //기존 상태를 ...prevState로 복사
      //새로운 값 설정
    }));
  };

  const handleSelect = (item) => {
    setBoard({
      id: item.id,
      title: item.title,
      content: item.content,
      writer: item.writer,
    });
  };

  //데이터 표시하는 함수
  const loadData = () => {
    return (
      <table align="center">
        <thead>
          <tr>
            <th>ID</th>
            <th>title</th>
            <th>writer</th>
            <th>content</th>
            <th>createDate</th>
          </tr>
        </thead>
        <tbody>
          {dataBoard.map(
            (
              board // dataBoard 배열의 요소 가져오기
            ) => (
              <tr key={board.id}>
                <td>{board.id}</td>
                <td>{board.title}</td>
                <td>{board.writer}</td>
                <td>{board.content}</td>
                <td>{board.createDate}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      <h2>Data DataDisplay</h2>
      <div>
        <form>
          <input
            type="text"
            name="title"
            value={board.title}
            placeholder="제목"
            onChange={handleChange}
          />
          <input
            type="text"
            name="content"
            value={board.content}
            placeholder="내용"
            onChange={handleChange}
          />
          <input
            type="text"
            name="writer"
            value={board.writer}
            placeholder="작성자"
            onChange={handleChange}
          />
          <div>
            <button type="button" onClick={addBoard}>
              추가하기
            </button>
            <button type="button" onClick={updateBoard}>
              수정하기
            </button>
            <button type="button" onClick={deleteBoard}>
              삭제하기
            </button>
          </div>
        </form>
      </div>
      <button onClick={() => loadBoard()}>Board</button>
      <div>{loadData()}</div>
    </div>
  );
};
export default DataDisplay;

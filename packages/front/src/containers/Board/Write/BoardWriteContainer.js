import React, { useContext, useState } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { useQuery, useMutation } from "@apollo/react-hooks";

import BoardWrite from "components/pages/Board/BoardWrite";
import { Context, types } from "components/Context";
import { useInput, useForm } from "components/CustomHooks";
import BoardSubmitModal from "components/pages/Board/BoardWrite/Modal";

import GqlTypes, {
  insertBoard,
  getBoardQuery,
  // updateBoardQuery,
} from "./queries";
import { titleValidation } from "../validation";

/**
 * @brief  파라미터를 입력받아 버튼을 만듬.
 * @param {id} string mode가 modify일때만 유효한값.
 * @param {mode} string editor의 mode. read, modify 두가지 존재
 */

const BoardWriteContainer = withRouter(({ id, history, mode }) => {
  let initEditorVal = "";
  let initTitleVal = "";

  const idNumber = Number.parseInt(id, 10);

  const [imgsObj, setImgsObj] = useState([]);
  const { state, dispatch } = useContext(Context);

  const modifyMode = () => {
    const { data: getBoardQueryData } = useQuery(GqlTypes.GET_BOARD, {
      variables: { id: idNumber },
    });

    const board = getBoardQueryData && getBoardQueryData[getBoardQuery];
    initEditorVal = board ? board.content : "";
    initTitleVal = board ? board.title : "";

    return { initEditorVal, initTitleVal };
  };

  const {
    data: {
      user: { username },
    },
  } = useQuery(GqlTypes.USER);

  const [insertBoardMutation, { loading }] = useMutation(
    GqlTypes.INSERT_BOARD_MUTATION,
  );

  const [updateBoardMutation, { loading: updateLoading }] = useMutation(
    GqlTypes.UPDATE_BOARD,
  );

  if (mode === "modify") {
    modifyMode();
  }

  const editorVal = useInput(initEditorVal);
  const titleVal = useInput(initTitleVal, { titleValidation });
  const imgVal = useInput("");

  // submit시 통과 조건
  const isValid = !imgVal.errors.isRequired && !titleVal.errors.titleValidation;

  // submit버튼의 클릭 유무가 isSubmit에 bool값으로 저장됨
  // handleSubmit은 콜백으로 정의된 함수가 실행됨.(isValid의 유무가 err의 값으로 넘어감)
  const { isSubmited, handleSubmit } = useForm(isValid, async err => {
    if (!err) {
      const queryData = {
        board: {
          username,
          title: titleVal.value,
          content: editorVal.value,
          represent_img: imgVal.value,
        },
      };
      const { data } =
        mode === "modify"
          ? await updateBoardMutation({
              variables: { ...queryData, id: idNumber },
            })
          : await insertBoardMutation({ variables: queryData });

      const insertId = data && data[insertBoard];

      console.log("mode:", mode);
      console.log("insertId:", insertId);
      if (insertId) {
        history.push(`/board/${insertId}`);
      }
    }
  });

  // editor에서 입력된 내용중 img태그의 src속성만 추출한다음 imgSrcs에 대입
  const handleOpenModal = e => {
    e.preventDefault();
    const imgSrcRegex = /<img[^>]*src=["']?([^>"']+)["']?[^>]*>/g;
    let matchRegex = imgSrcRegex.exec(editorVal.value);
    const imgsObjArr = [];

    if (!editorVal.value || !matchRegex) {
      if (typeof window !== "undefined") {
        window.alert("내용과 최소 한장의 사진이 있어야 합니다.");
      }
      return;
    }

    let i = 0;
    while (matchRegex) {
      i += 1;
      imgsObjArr.push({ id: i, src: matchRegex[1] });
      matchRegex = imgSrcRegex.exec(editorVal.value);
    }

    setImgsObj(imgsObjArr);
    dispatch({ type: types.OPEN_BOARD_SUBMIT_MODAL });
  };

  const handleCloseModal = () => {
    dispatch({ type: types.CLOSE_MODAL });
  };

  return state.isClickBoardWrite ? (
    <BoardSubmitModal
      titleVal={titleVal}
      imgVal={imgVal}
      mode={mode}
      onSubmit={handleSubmit}
      isSubmited={isSubmited}
      imgsObj={imgsObj}
      onClose={handleCloseModal}
      loading={loading || updateLoading}
    />
  ) : (
    <BoardWrite
      id={idNumber}
      handleOpenModal={handleOpenModal}
      editorVal={editorVal}
    />
  );
});

BoardWriteContainer.defaultProps = {
  mode: "read",
};

BoardWriteContainer.propTypes = {
  mode: PropTypes.string,
};

export default BoardWriteContainer;

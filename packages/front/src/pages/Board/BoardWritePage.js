import React from "react";
import BoardTemplate from "components/pages/Board";
import BoardWriteContainer from "containers/Board/Write/BoardWriteContainer";

function BoardWritePage() {
  return (
    <BoardTemplate>
      <BoardWriteContainer />
    </BoardTemplate>
  );
}

export default BoardWritePage;

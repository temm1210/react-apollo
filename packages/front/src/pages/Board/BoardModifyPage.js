import React from "react";
import BoardTemplate from "components/pages/Board";
import BoardWriteContainer from "containers/Board/Write/BoardWriteContainer";

// eslint-disable-next-line react/prop-types
function BoardModifyPage({ match }) {
  return (
    <BoardTemplate>
      <BoardWriteContainer mode="modify" id={match.params.id} />
    </BoardTemplate>
  );
}

export default BoardModifyPage;

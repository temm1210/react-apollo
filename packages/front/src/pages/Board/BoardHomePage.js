import React from "react";
import BoardTemplate from "components/pages/Board";
import BoardHomeContainer from "containers/Board/BoardHomeContainer";

function BoardHomePage() {
  return (
    <BoardTemplate>
      <BoardHomeContainer />
    </BoardTemplate>
  );
}

export default BoardHomePage;

import React from "react";
import Template from "components/pages/Template";
import BoardReadContainer from "containers/Board/Read";

// eslint-disable-next-line react/prop-types
function BoardReadPage({ match }) {
  return (
    <Template firstScroll>
      <BoardReadContainer id={match.params.id} />
    </Template>
  );
}

export default BoardReadPage;

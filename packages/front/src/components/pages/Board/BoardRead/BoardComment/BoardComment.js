import React, { useEffect } from "react";
import styled from "styled-components";
import { styleModify } from "helpers";
import { Button, Text } from "components/base";
import Editor, { ReadOnlyEditor } from "components/Editor";
import FlexContainer from "components/FlexContainer";

const Container = styled(FlexContainer)`
  max-width: 600px;
  margin: 0 auto;
  overflow: hidden;
`;

const TitleContainer = styled.div`
  margin-right: auto;
  margin-bottom: 1.5rem;
  margin-top: 2rem;
`;

const UserInfoContainer = styled.div``;
const CommentContainer = styled.div`
  padding: 1rem;
  background-color: white;
  margin-bottom: 1.2rem;
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.2);
`;

const EditorContainer = styled.div`
  margin-bottom: 1.2rem;
  width: 100%;

  ${props => props.shadow && { boxShadow: "0 0 1px rgba(0, 0, 0, 0.2)" }};
`;
const ButtonContainer = styled(FlexContainer)``;

const CommentListContainer = styled(FlexContainer)``;

const value = `<p><span class="ql-size-small">profile   username <span class="ql-size-small" style="color: rgb(187, 187, 187);">Jul 4,9 min read</span></span></p><br><strong class="ql-size-huge">Title</strong>`;
const value2 = `<p><span class="ql-size-small">profile   username <span class="ql-size-small" style="color: rgb(187, 187, 187);">Jul 4,9 min read</span></span></p><br><p>wiejfioejwafwifojaewifjaewjfoiajfoijfewijf.</p><p>ajsfdiasjmfweoifjawijfiojewafioejaoijewafoma jawefijeiowajfioajw jidsafj oijasdfoi jaofweo jaewfm awefm amsdfoimawefimawefmiwe mmfeai wmfm aweifm ewmfi aewmfimawmefi mldsf ewfm malew.</p>`;
function BoardComment() {
  useEffect(() => {
    styleModify("#comment-editor", {
      backgroundColor: "white",
      height: "100%",
    });
    styleModify("#comment-editor .ql-toolbar.ql-snow + .ql-container.ql-snow", {
      height: "100%",
    });
    styleModify("#comment-editor .ql-editor", {
      fontSize: "14px",
    });
  });

  return (
    <Container direction="column">
      <TitleContainer>
        <Text>Responses</Text>
      </TitleContainer>
      <CommentContainer>
        <UserInfoContainer>
          <Text bold color="#008E00">
            Dami
          </Text>
          <Text color="rgba(0,0,0,.54)">Jul 4, 2018</Text>
        </UserInfoContainer>
        <EditorContainer>
          <Editor id="comment-editor" placeholder="댓글을 입력하세요" />
        </EditorContainer>
        <ButtonContainer justify="flex-start">
          <Button>Test</Button>
        </ButtonContainer>
      </CommentContainer>
      <CommentListContainer direction="column" align="center">
        <EditorContainer shadow>
          <ReadOnlyEditor id="comment-read-editor-1" value={value} readOnly />
        </EditorContainer>
        <EditorContainer shadow>
          <ReadOnlyEditor id="comment-read-editor-2" value={value2} readOnly />
        </EditorContainer>
      </CommentListContainer>
    </Container>
  );
}

export default BoardComment;

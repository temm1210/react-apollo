import React from "react";
import styled from "styled-components";
import moment from "moment";
import PropTypes from "prop-types";

import { Text } from "components/base";
import Card from "components/Card";

const CardContainer = styled.div`
  width: 100%;
  margin: 2rem 0;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`; // CardContainer

const CardWrapper = styled(Card)`
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  flex: 1;

  &:last-child {
    border-bottom: none;
  }
  /* ${props => props.theme.tablet({ flexDirection: "column" })}; */
`;

const ContentText = styled(Text)`
  font-family: "Questrial", "Noto Sans", "Noto Sans KR", sans-serif;
  font-size: 1.03rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  line-height: 1;
  height: 2em;
  word-break: break-all;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  margin-top: 5px;
  opacity: 0.6;
  -webkit-box-orient: vertical;
`; // Item

const UsernameWrapper = styled.div`
  margin-top: 1.2rem;
`;

function BoardList({ data }) {
  const removeHTML = text => {
    const removeBrTag = text.replace(/<br\/>/gi, "\n");
    const pureStr = removeBrTag.replace(
      /<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/gi,
      "",
    );
    return pureStr;
  };

  const makeDate = date => {
    const now = moment();
    const dataDate = moment(date);
    const diff = now.diff(dataDate);
    return diff > 80000000
      ? moment(dataDate).format("YYYY-MM-DD HH:mm")
      : moment(date).fromNow();
  };

  return (
    <CardContainer>
      {data.map(board => (
        <CardWrapper key={board.id}>
          <Card.ItemGroup>
            <Card.Item to={`/board/${board.id}`} size="1.8rem" isBold>
              <Text bold size="1.4rem">
                {board.title}
              </Text>
            </Card.Item>
            <Card.Item to={`/board/${board.id}`} size="1rem" opacity="0.6">
              <ContentText>{removeHTML(board.content)}</ContentText>
            </Card.Item>
            <Card.Item>
              <UsernameWrapper>
                <Text size="1rem">{board.username}</Text>
              </UsernameWrapper>
            </Card.Item>
            <Card.Item>
              <Text size="0.9rem" opacity=".6">
                {makeDate(board.create_date)}, &nbsp; {board.views} read
              </Text>
            </Card.Item>
          </Card.ItemGroup>
          <Card.Image to={`/board/${board.id}`} src={board.represent_img} />
        </CardWrapper>
      ))}
    </CardContainer>
  );
}
BoardList.defaultProps = {
  data: [],
};

BoardList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
};

export default BoardList;

import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import FlexContainer from "components/FlexContainer";

const Container = styled(FlexContainer)`
  padding: 0 5%;
`;

const Wraper = styled.div`
  display: inline-block;
  padding: 0.5rem;
`;

const Row = styled.div`
  padding-right: 0.5rem;
  ${props => {
    const { size, bold } = props;
    return {
      fontSize: size
        ? props.theme.FontSize[size]
        : props.theme.FontSize.verySmall,
      fontWeight: bold ? "bold" : "0",
    };
  }}
  color: ${props => props.theme.FontColor.transBlack};
`;

function FooterList({ list }) {
  return (
    <Container direction="column">
      <FlexContainer wrap>
        {list.map(footer => {
          const { id, text, ...etc } = footer;
          return (
            <Wraper key={footer.id}>
              <Row {...etc}>{footer.text}</Row>
            </Wraper>
          );
        })}
      </FlexContainer>
    </Container>
  );
}

FooterList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default FooterList;

import React, { useEffect, useContext } from "react";
import styled from "styled-components";
import lottie from "lottie-web";
import { Context, types } from "components/Context";
import { Text, Button } from "components/base";
import FlexContainer from "components/FlexContainer";
import Modal from "components/Modal";

import signupSuccessLottie from "asset/lotties/signup-success.json";

const Container = styled.div``; // TextWrapper

const TitleWrapper = styled.div`
  text-align: center;
`; // TextWrapper

const ButtonContainer = styled(FlexContainer)`
  margin-top: 2rem;
`; // TextWrapper

const ButtonWrapper = styled.div`
  width: 13vh;
  margin: 0.5rem;
`; // TextWrapper

const SuccessContainer = styled.div`
  height: 40vh;
`; // SuccessContainer

function ChoiceModal() {
  const { dispatch } = useContext(Context);

  useEffect(() => {
    lottie.loadAnimation({
      container: document.getElementById(`lottie-success`), // the dom element that will contain the animation
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: signupSuccessLottie,
    });
  }, []);

  const handleClickLoginBtn = () => {
    dispatch({ type: types.OPEN_LOG_MODAL });
  };

  const handleCloseModal = () => {
    dispatch({ type: types.CLOSE_MODAL });
  };

  return (
    <Modal offTop="15vh" width="400" onClose={handleCloseModal}>
      <Container>
        <SuccessContainer id="lottie-success" />
        <TitleWrapper>
          <Text bold size="22px">
            회원가입이 완료되었습니다!
          </Text>
        </TitleWrapper>

        <ButtonContainer justify="center">
          <ButtonWrapper>
            <Button color="green" onClick={handleClickLoginBtn}>
              로그인
            </Button>
          </ButtonWrapper>
          <ButtonWrapper>
            <Button color="blue" onClick={handleCloseModal}>
              둘러보기
            </Button>
          </ButtonWrapper>
        </ButtonContainer>
      </Container>
    </Modal>
  );
}

export default ChoiceModal;

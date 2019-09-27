import React, { Fragment, useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { Text } from "components/base";

const ImgContainer = styled.div`
  width: 60%;
  height: ${props => (props.clickImg ? "100%" : "350px")};
  min-width: 400px;
  max-width: 600px;
  margin: 2px 25px;
  background-color: #eee;

  border: ${props => !props.isValid && "1px solid red"};
  overflow: ${props => (props.clickImg ? "hidden" : "auto")};
`;

const ImageWrapper = styled.div`
  max-width: ${props => (props.clickImg ? "100%" : "400px")};
  max-height: 400px;
  overflow: hidden;
  margin: ${props => (props.clickImg ? 0 : "1rem auto")};
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  outline-offset: -3px;

  ${props =>
    !props.clickImg
      ? css`
          display: block;
          &:hover {
            outline: 3px solid #007eff !important;
          }
        `
      : css`
          display: none;
        `}
`;

const TextWrapper = styled.div`
  margin-top: 0.5rem;
  margin-bottom: 1.5rem;
  cursor: pointer;
`;

function ImageForm({ imgsObj, imgVal, isSubmited }) {
  const imgContainer = useRef(null);

  const [scrollPos, setScrollPos] = useState(0);

  // 대표이지미 선택여부(clickImg), 선택한 이미지의 엘리먼트(setClickImg)
  const [clickImg, setClickImg] = useState({
    isClick: false,
    selectedImg: null,
  });

  const handleImageClick = e => {
    const element = e.target;
    element.style.display = "block";

    setClickImg({ isClick: true, selectedImg: element });
    imgVal.onChange(element.getAttribute("src"));
    setScrollPos(imgContainer.current.scrollTop);
  };

  // 대표이미지 설정후 다시선택하기 클릭시 실행. 다시 전체 이미지가 보여짐
  const handleReSelectClick = () => {
    clickImg.selectedImg.style = null;
    setClickImg({ isClick: false, selectedImg: null });
    imgVal.onChange(null);
  };

  // 다시클릭하기 버튼클릭때마다 스크롤 위치를 이전스크롤 위지로 이동
  useEffect(() => {
    imgContainer.current.scroll(0, scrollPos);
  }, [clickImg]);

  return (
    <Fragment>
      {clickImg.isClick && (
        <TextWrapper onClick={handleReSelectClick}>
          <Text>다시선택하기</Text>
        </TextWrapper>
      )}

      <ImgContainer
        ref={imgContainer}
        isValid={!(imgVal.errors.isRequired && isSubmited)}
        clickImg={clickImg.isClick}
      >
        {imgsObj.map(imgObj => (
          <ImageWrapper
            key={imgObj.id}
            clickImg={clickImg.isClick}
            onClick={handleImageClick}
          >
            <Image src={imgObj.src} clickImg={clickImg.isClick} />
          </ImageWrapper>
        ))}
      </ImgContainer>
      {imgVal.errors.isRequired && isSubmited && (
        <Text color="red">대표사진을 선택해주세요</Text>
      )}
    </Fragment>
  );
}

ImageForm.propTypes = {
  isSubmited: PropTypes.bool.isRequired,
  imgVal: PropTypes.object.isRequired,
  imgsObj: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ImageForm;

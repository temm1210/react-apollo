import React, { createContext, useReducer } from "react";
import PropTypes from "prop-types";

export const Context = createContext();

export const types = {
  SET_LAST_URL: "setLastUrl",
  SET_CLICK: "setIsClick", // 반응형 메뉴를 위한 상태관리
  OPEN_LOG_MODAL: "openLoginModal", // Login Modal Open
  OPEN_SIGNUP_MODAL: "openSignUpModal", // SignUp Modal Open
  OPEN_CHOICE_MODAL: "openChoiceModal", // 회원가입후 안내모달
  OPEN_BOARD_SUBMIT_MODAL: "openBoardSubmitModal",
  CLOSE_RESPONSIVE_MENU: "closeResponisveMenu",
  CLOSE_MODAL: "closeModal", // Modal Close
};

function reducer(state, action) {
  switch (action.type) {
    case types.SET_LAST_URL:
      return { ...state, lastUrl: action.lastUrl };

    case types.SET_CLICK:
      return { ...state, isClick: !state.isClick };

    case types.OPEN_LOG_MODAL:
      return {
        ...state,
        isClick: false,
        isClickLogin: true,
        isClickChoice: false,
        isClickSignUp: false,
        closeRespnsiveMenu: true,
        isClickBoardWrite: false,
      };

    case types.CLOSE_RESPONSIVE_MENU:
      return {
        ...state,
        isClick: false,
      };

    case types.OPEN_SIGNUP_MODAL:
      return {
        ...state,
        isClick: false,
        isClickChoice: false,
        isClickSignUp: true,
        isClickLogin: false,
        isClickBoardWrite: false,
      };

    case types.OPEN_CHOICE_MODAL:
      return {
        ...state,
        isClick: false,
        isClickSignUp: false,
        isClickLogin: false,
        isClickChoice: true,
        isClickBoardWrite: false,
      };

    case types.OPEN_BOARD_SUBMIT_MODAL:
      return {
        ...state,
        isClick: false,
        isClickSignUp: false,
        isClickLogin: false,
        isClickChoice: false,
        isClickBoardWrite: true,
      };

    case types.CLOSE_MODAL:
      return {
        ...state,
        isClickBoardWrite: false,
        isClickChoice: false,
        isClickLogin: false,
        isClickSignUp: false,
      };

    default:
      throw new Error(
        "action type이 정의되지 않았거나 잘못 정의되었습니다. 타입을 확인해주세요",
      );
  }
}

function ContextProvider({ children }) {
  // const [isClick, setIsClick] = useState(false);
  // const [isClickLogin, setisClickLogin] = useState(false);

  const [state, dispatch] = useReducer(reducer, {
    lastUrl: "/",
    isClick: false,
    isClickChoice: false,
    isClickBoardWrite: false,
    isClickLogin: false,
    isClickSignUp: false,
  });

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
}

ContextProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string])
    .isRequired,
};

export default ContextProvider;

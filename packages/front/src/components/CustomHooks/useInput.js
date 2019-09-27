/* eslint-disable */
import { useState, useEffect } from "react";

export default function useInput(initValue, validations) {
  const [inputValue, setInputValue] = useState(initValue);
  const [errors, setErrors] = useState({
    isRequired: false,
    isTouch: false,
    isBlur: false,
  });

  const onBlur = () => {
    setErrors({ ...errors, isBlur: true });
  };

  const onChange = (e, callback) => {
    const text = e && e.target ? e.target.value : e;
    setInputValue(() => {
      if (typeof callback === "function") callback(text);
      return text;
    });

    setErrors({ ...errors, isTouch: true });
  };

  // 배열로부터 key, values를 받아 object로 만듬
  const makeObjFromArr = (keys, values) => {
    const { length } = keys;
    const object = {};
    let i = 0;

    while (i < length) {
      object[keys[i]] = values[i];
      i += 1;
    }

    return object;
  };

  const init = () => {
    const validationObj = validations;
    let isRequiredState = true;

    if (inputValue) {
      isRequiredState = false;
    }

    if (!validationObj) {
      setErrors({ ...errors, isRequired: isRequiredState });
      return;
    }

    const { args } = validationObj;
    if (args) {
      delete validationObj.args;
    }

    // 사용자가 정의한 커스텀 벨리데이션을 errors객체에 추가하는 작업
    const validationKeys = Object.keys(validations);
    const validationValues = Object.values(validations).map(validation => {
      if (args) {
        return validation(inputValue, ...args);
      }
      return validation(inputValue);
    });
    const errorsObject = makeObjFromArr(validationKeys, validationValues);

    setErrors({ ...errors, ...errorsObject, isRequired: isRequiredState });
  };

  useEffect(() => {
    init();
  }, [inputValue]);

  useEffect(() => {
    setInputValue(initValue);
  }, [initValue]);

  return { value: inputValue, onChange, onBlur, errors };
}

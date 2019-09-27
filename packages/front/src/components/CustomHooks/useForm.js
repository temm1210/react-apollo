import { useState } from "react";

export default function useInput(validation, callback) {
  const [isSubmited, setIsSubmited] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();

    setIsSubmited(true);

    // 모든 입력값이 validation에 통과되었는지 확인
    if (validation) {
      setIsSubmited(false);
      return callback(null);
    }
    return callback("Submit Error");
  };

  return { isSubmited, handleSubmit };
}

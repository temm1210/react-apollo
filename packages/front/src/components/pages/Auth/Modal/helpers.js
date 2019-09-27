export const onBlur = (match, setState) => {
  if (match) {
    return setState(true);
  }
  return setState(false);
};

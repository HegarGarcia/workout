import { useReducer, useCallback } from 'react';

function reducer(state, action) {
  switch (action.type) {
    case 'change':
      return { ...state, [action.field]: action.payload };
    default:
      return state;
  }
}

export default function useForm(initialValues = {}) {
  const [values, dispatch] = useReducer(reducer, initialValues);

  const onChange = useCallback(({ target }) => {
    dispatch({ type: 'change', field: target.name, payload: target.value });
  }, []);

  return { values, onChange };
}

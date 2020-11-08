import { useEffect, useRef } from 'react';

import constant from 'lodash/constant';
import isFunction from 'lodash/isFunction';

const useReactiveRef = (state, functionDependencies = []) => {
  const isStateGetterFunction = isFunction(state);
  const dependencies = isStateGetterFunction ? functionDependencies : [state];
  const stateGetter = isStateGetterFunction ? state : constant(state);

  const reactiveRef = useRef();
  useEffect(() => {
    reactiveRef.current = stateGetter(reactiveRef.current);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return reactiveRef;
};

export default useReactiveRef;

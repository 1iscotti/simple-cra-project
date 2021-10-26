import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'

// import { getLoginUser } from '../../state/actions';
import { IStoreReducer } from '../../state/types';

function HomePage() {
  const commonReducer = useSelector((state: IStoreReducer) => state.commonReducer);
  const dispatch = useDispatch();
  console.log('commonReducer: ', commonReducer);

  useEffect(() => {
    // dispatch(getLoginUser());
  }, [dispatch]);
  return (
    <div>
      HomePage111
    </div>
  );
}

export default React.memo(HomePage);

import React, { useEffect, Suspense, useRef } from 'react';

const RemoteComponent = React.lazy(() =>
  import('remoteAppReact19/MyComponent')
);
// const VueContainer = React.lazy(() => import('./VueContainer'));

import VueContainer from './VueContainer';
import Button from './Button';

const App = () => {
  useEffect(() => {
    window.localStorage.setItem('hostApp_token', '这是hostApp_token');

    return () => {};
  }, []);

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <RemoteComponent />
      </Suspense>

      <VueContainer
        remoteName="remoteAppVue"
        remoteVueName="vue"
        remoteCompName="vueApp"
      />

      <Button />
    </div>
  );
};

export default App;

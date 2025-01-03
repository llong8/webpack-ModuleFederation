import React, { useEffect, Suspense, useRef, useState } from 'react';

export default function VueContainer({
  remoteName,
  remoteVueName,
  remoteCompName,
}) {
  const containerRef = useRef(null);
  useEffect(() => {
    import('remoteAppVue/vue')
      .then((Vue) => {
        const { createApp } = Vue; // 获取 Vue 的 createApp 方法
        if (createApp && containerRef.current) {
          // 加载远程 Vue 组件并挂载到容器
          import('remoteAppVue/vueApp')
            .then(({ default: VueComponent }) => {
              const app = createApp(VueComponent);
              app.mount(containerRef.current); // 将 Vue 组件挂载到 React 的 DOM 元素
            })
            .catch((error) => {
              console.error('从远程组件加载 vue组件出错', error);
            });
        } else {
          console.error('Vue createApp 不存在 or containerRef 不存在');
        }
      })
      .catch((error) => {
        console.error('从远程加载vue出错,请检查vue是否已共享', error);
      });
  }, []);

  return (
    <div>
      <div ref={containerRef}></div>
    </div>
  );
}

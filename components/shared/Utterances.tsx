import React, { useEffect, useRef } from 'react';

const Utterances = () => {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    console.log('123');
    const scriptElem = document.createElement('script');
    scriptElem.src = 'https://utteranc.es/client.js';
    scriptElem.async = true;
    scriptElem.setAttribute('repo', 'heesungjang/heelog.dev');
    scriptElem.setAttribute('issue-term', 'title');
    scriptElem.setAttribute('theme', 'github-light');
    scriptElem.setAttribute('label', 'blog-comment');
    scriptElem.crossOrigin = 'anonymous';
    if (ref.current) {
      ref.current.appendChild(scriptElem);
    }
  }, []);

  return <section style={{ width: '100%' }} ref={ref}></section>;
};

export default Utterances;

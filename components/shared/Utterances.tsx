import React, { useEffect, useRef } from 'react';

const Utterances = () => {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const scriptElem = document.createElement('script');
    scriptElem.src = 'https://utteranc.es/client.js';
    scriptElem.async = true;
    scriptElem.setAttribute('repo', 'heesungjang/frontendjoseph.io');
    scriptElem.setAttribute('issue-term', 'title');
    scriptElem.setAttribute('theme', 'github-light');
    scriptElem.setAttribute('label', 'blog-comment');
    scriptElem.crossOrigin = 'anonymous';
    if (ref.current) {
      ref.current.appendChild(scriptElem);
    }
  }, []);

  return (
    <section
      style={{ width: '100%', marginBottom: '50px' }}
      ref={ref}
    ></section>
  );
};

export default Utterances;

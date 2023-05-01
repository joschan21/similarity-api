'use client';

import { FC, useEffect, useState } from 'react';
import { Highlight, themes } from 'prism-react-renderer';
import { useTheme } from 'next-themes';
// import darkTheme from 'prism-react-renderer/themes/nightOwl';
// import lightTheme from 'prism-react-renderer/themes/nightOwlLight';

interface CodeProps {
  code: string;
  show: boolean;
  language: string;
  animationDelay?: number;
  animated?: boolean;
}

const Code: FC<CodeProps> = ({
  code,
  language,
  show,
  animated,
  animationDelay,
}) => {
  const { theme: applicationTheme } = useTheme();
  const [text, setText] = useState(animated ? '' : code);

  useEffect(() => {
    if (show && animated) {
      let i = 0;
      setTimeout(() => {
        const intervalId = setInterval(() => {
          setText(code.slice(0, i));
          i++;
          if (i > code.length) {
            clearInterval(intervalId);
          }
        }, 15);

        return () => clearInterval(intervalId);
      }, animationDelay || 150);
    }
  }, [code, show, animated, animationDelay]);

  //number of lines
  const lines = text.split(/\r\n|\r|\n/).length;

  const theme =
    applicationTheme === 'light' ? themes.nightOwlLight : themes.nightOwl;

  return (
    <Highlight
      code={text}
      language={language}
      theme={theme}>
      {({ className, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={
            className +
            'transition-all w-fit bg-transparten duration-100 py-0 no-scrollbar'
          }
          style={{
            maxHeight: show ? lines * 24 : 0,
            opacity: show ? 1 : 0,
          }}>
          {tokens.map((line, i) => {
            //esline-disable-next-line no-unused-vars
            const { key, ...rest } = getLineProps({ line, key: i });

            return (
              <div
                key={`line-${i}`}
                style={{ position: 'relative' }}
                {...rest}>
                {line.map((token, index) => {
                  //eslint-disable-next-line no-unused-vars
                  const { key, ...props } = getTokenProps({ token, i });
                  return (
                    <span
                      key={index}
                      {...props}
                    />
                  );
                })}
              </div>
            );
          })}
        </pre>
      )}
    </Highlight>
  );
};

export default Code;

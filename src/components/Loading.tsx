import { useEffect } from 'react';

export const Loading = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-slate-darker/30 dark:bg-slate-darker/50 backdrop-blur-sm" />
      <div className="relative z-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 200 200"
          width={150}
          height={150}
          className="loading"
        >
          <circle
            fill="none"
            strokeOpacity="1"
            className="stroke-ink dark:stroke-lavender-400"
            strokeWidth=".5"
            cx="100"
            cy="100"
            r="0"
          >
            <animate
              attributeName="r"
              calcMode="spline"
              dur="1"
              values="1;80"
              keyTimes="0;1"
              keySplines="0 .2 .5 1"
              repeatCount="indefinite"
            />
            <animate
              attributeName="stroke-width"
              calcMode="spline"
              dur="1"
              values="0;25"
              keyTimes="0;1"
              keySplines="0 .2 .5 1"
              repeatCount="indefinite"
            />
            <animate
              attributeName="stroke-opacity"
              calcMode="spline"
              dur="1"
              values="1;0"
              keyTimes="0;1"
              keySplines="0 .2 .5 1"
              repeatCount="indefinite"
            />
          </circle>
        </svg>
      </div>
    </div>
  );
};

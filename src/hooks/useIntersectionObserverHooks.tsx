import { useEffect, useRef, useState } from "react";

interface IProps {
  root?: Document | Element | null;
  rootMargin?: string;
  threshold?: number | number[];
}

export const useIntersect = (props?: IProps) => {
  const [entry, updateEntry] = useState<IntersectionObserverEntry | null>(null);
  const [node, setNode] = useState<HTMLDivElement | null>(null);

  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observer.current = new IntersectionObserver(
      ([entry]) => {
        if (entry) updateEntry(entry);
      },
      {
        root: props?.root,
        rootMargin: props?.rootMargin,
        threshold: props?.threshold || 0,
      }
    );

    const { current: currentObserver } = observer;

    if (node) currentObserver.observe(node);

    return () => {
      currentObserver.disconnect();
    };
  }, [node, props]);

  return { setNode, entry };
};

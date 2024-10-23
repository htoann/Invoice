import { useEffect, useRef, useState } from 'react';

const CountUp = ({
  start = 0,
  end = 100,
  suffix = '',
  prefix = '',
  delay = 0,
  decimals = 0,
  separator = ',',
  duration = 2,
}) => {
  const [count, setCount] = useState(start);
  const [hasStarted, setHasStarted] = useState(false);
  const startTime = useRef(null);

  useEffect(() => {
    const updateCount = () => {
      const elapsed = (Date.now() - startTime.current) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const newCount = start + (end - start) * progress;

      setCount(newCount);
      if (progress < 1) {
        requestAnimationFrame(updateCount);
      }
    };

    const timer = setTimeout(() => {
      setHasStarted(true);
      startTime.current = Date.now();
      updateCount();
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [start, end, duration, delay]);

  const formatNumber = (number) => {
    const parts = number.toFixed(decimals).split('.');
    const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator);
    const decimalPart = parts[1] ? `.${parts[1]}` : '';
    return `${prefix}${integerPart}${decimalPart}${suffix}`;
  };

  return <div>{hasStarted ? formatNumber(count) : formatNumber(start)}</div>;
};

export default CountUp;

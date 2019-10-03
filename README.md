# microhooks

A collection of useful React Hooks.

## Install

```
yarn add microhooks
```

## Hooks

### useDefferedState

```tsx
const Form: React.FC = () => {
  const [query, setQuery] = useDeferredState(500, '');

  useEffect(() => {
    fetch(`https://example.com/api`)
      .then(response => response.json())
      .then(json => {
        console.log(json);
      });
  }, [query]);

  function handleInput(e) {
    setQuery(e.value);
  }

  return <input onChange={handleInput} />;
};
```

### useTakeEffect

```tsx
const App: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  useTakeEffect(() => {
    ref.current.innerHTML = 'hey';
  }, [ref.current]);

  return <div ref={ref} />;
};
```

### usePrefetch

```tsx
const App: React.FC = () => {
  usePrefetch({
    logo: './assets/logo.png',
    bg: './assets/background.png',
  });
};
```

### useWindowBounds

```tsx
const App: React.FC = () => {
  const { width, height } = useWindowBounds();

  return <canvas width={width} height={height} />;
};
```

### useInlineSVG

```tsx
import LogoSVG from './assets/logo.svg';

const App: React.FC = () => {
  const Logo = useInlineSVG(LogoSVG);

  return (
    <>
      <Logo />
      <p>Heyyy</p>
    </>
  );
};
```

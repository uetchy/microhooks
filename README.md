# microhooks

A tiny collection of useful React Hooks.

## Install

```
yarn add microhooks
```

## API

### `useDeferredState`

Function as `useState` but will be deferred for the specific amount of time to avoid excessing API limit.

```tsx
import { useDeferredState } from 'microhooks';

const Form: React.FC = () => {
  const [query, setQuery] = useDeferredState(500, 'Initial value');

  useEffect(() => {
    fetch(`https://example.com/api?query=${query}`)
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

### `useTakeEffect`

Unlike `useEffect`, `useTakeEffect` will be called when all of the given props are neither `undefined` nor `null`.

```tsx
import { useTakeEffect } from 'microhooks';

const App: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  useTakeEffect(() => {
    ref.current.innerHTML = 'hey';
  }, [ref.current]);

  return <div ref={ref} />;
};
```

### `usePrefetch`

Prefetch any kind of media for the cache.

```tsx
import { usePrefetch } from 'microhooks';

const App: React.FC = () => {
  usePrefetch({
    logo: './assets/logo.png',
    bg: './assets/background.png'
  });
};
```

### `useWindowBounds`

Obtain width and height of a browser window and keep updating them.

```tsx
import { useWindowBounds } from 'microhooks';

const App: React.FC = () => {
  const { width, height } = useWindowBounds();

  return <canvas width={width} height={height} />;
};
```

### `useInlineSVG`

Thanks to the power of webpack, `useInlineSVG` can be used as a SVG container factory.

```tsx
import { useInlineSVG } from 'microhooks';

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

## Contribution

See [Contribution Guide](./CONTRIBUTING.md).

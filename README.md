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

  React.useEffect(() => {
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

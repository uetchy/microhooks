import React from 'react';
import { render, waitFor } from '@testing-library/react';

import { useDeferredState } from '../src';

describe('useDeferredState', () => {
  it('renders deferred state', async () => {
    const App: React.FC = () => {
      const [value, setValue] = useDeferredState(500, 0);
      React.useEffect(() => {
        setValue(1);
        setValue(2);
        setValue(3);
      }, [setValue]);
      return <div data-testid="root">{value}</div>;
    };
    const { container, getByTestId } = render(<App />);
    expect(getByTestId('root').textContent).toBe('0');
    await waitFor(() => expect(getByTestId('root').textContent).toBe('3'), {
      container,
    });
    // ReactDOM.render(<div></div>, div);
    // ReactDOM.unmountComponentAtNode(div);
  });
});

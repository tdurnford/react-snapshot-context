# `react-snapshot-context`

React Snapshot Context Provider is an open-source library for managing and sharing state across React components without prop drilling. It leverages React's context API and provides a more efficient and encapsulated approach to handle state changes, which only re-renders the components dependent on the changing piece of state instead of the entire component tree.

## Features

- **State sharing across components**: It provides a mechanism to share state across multiple components without prop drilling, which is especially useful in larger applications where state needs to be accessible in deeply nested components.

- **Efficient re-rendering**: Only the components dependent on a certain piece of state are re-rendered when that state changes, improving the efficiency of your React application.

- **Encapsulation of state logic**: The state logic is encapsulated within the context, which makes the components easier to test and reason about.

- **Type Safety**: It ensures type safety with TypeScript, improving the developer experience and reducing runtime errors.

## Installation

You can add React Snapshot Context Provider to your project using npm:

```bash
npm install react-snapshot-context
```


## How to use

Here is an example of how you can use the React Snapshot Context Provider in your application:

```jsx
// Assuming state is of type number
const NumberContext = createSnapshotContext<number>();

export const useNumber = (): [Number, (num: Number) => void] => {
  const { getSnapshot, setSnapshot, subscribe } = useSnapshotContext(NumberContext);
  const [localNumber, setLocalNumber] = useState(() => getSnapshot());

  useEffect(() => {
    return subscribe(() => {
      setLocalNumber(getSnapshot());
    });
  });

  return [localNumber, setSnapshot];
};

<NumberContext.SnapshotProvider defaultValue={10}>
  <MyComponent />
</NumberContext.SnapshotProvider>
```

In this example, `createSnapshotContext` is used to create a context for a state of type `number`. The `useNumber` hook is then used to get and set the snapshot, and to subscribe to any changes in the state. The `NumberContext.SnapshotProvider` is then used in the component tree to provide the state to the components.

## Contributions

Like us? [Star](https://github.com/tdurnford/react-snapshot-context/stargazers) us.

Want to make it better? [File](https://github.com/tdurnford/react-snapshot-context/issues) us an issue.

Don't like something you see? [Submit](https://github.com/tdurnford/react-snapshot-context/pulls) a pull request.

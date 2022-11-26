Link to the site : 
https://dhirajsgithub.github.io/React_module_18/

# 1. useState() hook 
* ### It allows us to manage state in functional based componenet of react, can be initialize with any value.
* ### useState always return two value in an array, the firselement being current state snap shot for the rerender cycle of the component and second is state updating function, helpful to change the current state
* ### when we decide to update an object with state ensure that we don't loose old data
* ### If you have a new state change that also depends on old state then use the functional form of use State while setting the state, which has an argument of prevState snapshot
* ### Multipile state survive updates of other state

# Rules of Hook
1. We only use hook inside of functional component, or inside of other custom hooks
2. we always use hook on the root levele, which means we can't use hook inside nested function

# 2. useEffect() hook
* ### use to manage side effects i.e. may not get finished in the current render cycle, useEffect will get executed AFTER every componenet render cycle
* ### second argument in useEffect is the dependencies, without which ueeEffect is of no use, only when such dependency change useEffect will execute again one more time
* ### with empty dependency [] useEffect will act like componentDidMount. it runs only once

# 3. useCallback() hook 
* ### functions are reference type in javascript hence whenever a dom is rerender it will think of a functiona as a newly created object
* ### adding dependency of function in useEffect might be trouble sum
* ### useCallback hook wraps function within and accept the second argument as the dependencies as when to consider the function to be a new object

# 4. useRef() hook 
* ### Allows you to persist values between renders
* ### It can be used for mutable value that does not cause a re-render when updated
* ### It can be used to access DOM elements directly

# When to use Refs and States
Refs are useful when getting user input, DOM element properties and storing constantly updating values.
However if you are storing component related info or use methods in components states are the best option.

# State Batching & State Updates
React groups multiple state updates into a single re-render for better performance
in the same synchronous (!) execution cycle (e.g. in the same function) will NOT trigger two component re-render cycles.
Instead, the component will only re-render once and both state updates will be applied simultaneously.
<br>
If we want multiple rerender between your state changes in synchronous way then we can seperate the two state by differrent setTimout function, or we can use seperate function like flushSync(()=>{}) for both state seperately

# 5. useReducer() hook
* ### It allows for custom state logic.
* ### If you find yourself keeping track of multiple pieces of state that rely on complex logic, useReducer may be useful.
* ### The reducer function contains your custom state logic and the initialState can be a simple value but generally will contain an object.
* ### The useReducer Hook returns the current state and a dispatch method.
When working with useReducer(), React will re-render the componenet whenever your reducer returns the new state 

# 6. useContext() hook
* ### React Context is a way to manage state globally.
* ### It can be used together with the useState Hook to share state between deeply nested components more easily than with useState alone.

# 7. useMemo() hook
* ### The React useMemo Hook returns a memoized value.
* ### The useMemo Hook only runs when one of its dependencies update.
* ### The useMemo Hook can be used to keep expensive, resource intensive functions from needlessly running.

The useMemo and useCallback Hooks are similar. The main difference is that useMemo returns a memoized value and useCallback returns a memoized function. You can learn more about useCallback in the useCallback chapter.








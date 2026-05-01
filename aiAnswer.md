# Learning Log: React Development & Architecture

## Question 3: Why didn"t my `setInterval` work?

**Answer:** There were two main technical reasons why your timer wasn"t ticking correctly:

### 1. The `prevTime--` Trap
In your code, you had: `setTime((prevTime) => (prevTime--))`.
- In JavaScript, `x--` is a **post-decrement** operator. It returns the value **before** it subtracts 1.
- So, `setTime` was essentially doing: `setTime(120)`, then `setTime(120)` again, forever.
- **Fix:** Always use `prevTime - 1` to ensure you are passing the new, smaller value to state.

### 2. The `useEffect` Logic
You had: `useEffect(() => { ... }, [status === "Cook"])`.
- This tells React: "Only re-run this effect if the *result* of the comparison changes."
- However, inside the effect, you didn"t have an `if` statement to check the status before starting the `setInterval`.
- **Fix:** Put an `if` statement inside the `useEffect` to start/stop the interval based on the status.

### 3. State vs. Context
You created a local `status` state inside `MenuList`, but you didn"t update the global `orderList` in your `OrdersContext`.
- To make the item move from the "In Kitchen" column to "Finished", you **must** update the global list in the Context.

### Corrected Timer Logic:
```jsx
useEffect(() => {
    let interval = null;

    if (list.status === "Cook" && countdownTime > 0) {
        interval = setInterval(() => {
            setTime(prev => prev - 1);
        }, 1000);
    }

    return () => clearInterval(interval);
}, [list.status, countdownTime]);
```

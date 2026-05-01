# Learning Log: React Development & Architecture

## Question 1: Is it good to use `useState` and `useEffect` with `useContext`?

**Answer:** Yes, this is a highly recommended "Hybrid" approach for performance-critical applications like an order board with timers.

### Why this approach?
1. **Performance (Re-render isolation)**: If you put a 1-second timer (`"timeLeft"`) in your global `"OrdersContext"`, **every single component** in your app (Navbar, Footer, every Menu Card) would re-render every second. By keeping the timer in the local `"useState"` of the item component, only that specific item re-renders.
2. **Encapsulation**: Each component should be "smart" enough to manage its own visual state (like a countdown), while the global context only tracks the "source of truth" (like the overall order status).
3. **Cleanliness**: It keeps your Context Provider simple. It doesn"t need to know about every individual timer tick, only when a status *actually* changes from "Cook" to "Finished".

---

## Question 2: Why did the "Key Prop" problem come back when I created `MenuList`?

**Answer:** The "Key Prop" warning returned because of a common misunderstanding of where the `key` needs to live.

### The Problem
When you moved the HTML from `"CookBoard"` into the `"MenuList"` component, you might have tried to put the `key` inside the `div` of `"MenuList.jsx"`:

```jsx
// MenuList.jsx (WRONG PLACE)
export default function MenuList({ order, list }) {
    return (
        <div key={...}> ... </div> 
    );
}
```

### The Rule
React needs the `key` on the **highest-level element inside the ".map()" loop**. 

When you use a component in a loop, the component *is* the highest-level element. Therefore, the `key` **MUST** be passed to the component in the parent file (`"CookBoard.jsx"`), not inside the child file (`"MenuList.jsx"`).

### The Correct Way
In your **`CookBoard.jsx`**, you must pass the key like this:

```jsx
// CookBoard.jsx (CORRECT PLACE)
{orders.map((e) => (
    <MenuList 
        key={`${e.orderId}-${list.id}`} // Key must be here!
        order={e} 
        list={list} 
    />
))}
```

### Why does React care?
The `key` is like an ID card for React. It uses it to track which items changed, were added, or were removed. If the ID card is *inside* the component, React can"t see it until it"s already started rendering the component, which is too late for its optimization process.

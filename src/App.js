import { useState } from "react";

function Header() {
  return <h1>🏖️Far Away👜</h1>;
}
function Form({ onAddItems }) {
  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;
    const items = { description, noItems, packed: false, id: Date.now() };
    console.log(items);
    setDescription("");
    setNoItems(1);
    onAddItems(items);
  }
  const [description, setDescription] = useState("");
  const [noItems, setNoItems] = useState(1);

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your Trip?</h3>
      <select
        value={noItems}
        onChange={(e) => {
          setNoItems(+e.target.value);
        }}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((n) => (
          <option value={n} key={n}>
            {n}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item"
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />
      <button>ADD</button>
    </form>
  );
}

function PackingList({ items, onDeleteItem, updateItem }) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItem;
  if (sortBy === "input") {
    sortedItem = items;
  }
  if (sortBy === "discription") {
    sortedItem = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  }
  if (sortBy === "packed") {
    sortedItem = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));
  }

  return (
    <div className="list">
      <ul>
        {sortedItem.map((s) => (
          <Item
            item={s}
            key={s.id}
            onDeleteClick={onDeleteItem}
            updateItem={updateItem}
          />
        ))}
      </ul>
      <select
        className="actions"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
      >
        <option value="input">Sort By input order</option>
        <option value="discription">Sort By description</option>
        <option value="packed">Sort By packed</option>
      </select>
    </div>
  );
}

function Item({ item, onDeleteClick, updateItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => {
          updateItem(item.id);
        }}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.noItems} {item.description}
      </span>
      <button
        onClick={() => {
          onDeleteClick(item.id);
        }}
      >
        ❌
      </button>
    </li>
  );
}
function Stats({ items }) {
  if (!items.length) {
    return (
      <p className="stats">
        <em>Start Adding some items to your packing list🚀</em>
      </p>
    );
  }
  const totalItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const precentage = Math.round((numPacked / totalItems) * 100);
  return (
    <footer className="stats">
      <em>
        {precentage === 100
          ? "You got everthing! Ready to GO✈️"
          : ` 👜 You have ${totalItems} items in your bag, and you already packed
          ${numPacked} (${precentage}%)`}
      </em>
    </footer>
  );
}

function App() {
  const [itemsA, setItems] = useState([]);
  function handleAddItems(item) {
    setItems((itemsA) => [...itemsA, item]);
  }
  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }
  function handleUpdateItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  return (
    <div className="app">
      <Header />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={itemsA}
        onDeleteItem={handleDeleteItem}
        updateItem={handleUpdateItem}
      />
      <Stats items={itemsA} />
    </div>
  );
}
export default App;

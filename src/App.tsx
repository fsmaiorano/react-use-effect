import { useEffect, useState } from "react";

function callApi() {
  console.log("Saved List");
}

function App() {
  const [list, setList] = useState<string[]>([]);
  const [filter, setFilter] = useState<string>("");

  const filteredList = list.filter((item) => item.includes(filter));

  useEffect(() => {
    callApi();
  }, [list]);

  useEffect(() => {
    console.log("Only in render");
    fetch("https://api.github.com/users/octocat/repos")
      .then((res) => res.json())
      .then((data) => setList(data.map((item: any) => item.full_name)));
  }, []);

  const addToList = () => {
    setList((state) => [...state, Math.random().toString()]);
    callApi();
  };

  const removeFromList = () => {
    if (list.length > 0) setList((state) => state.slice(1));
  };

  return (
    <>
      <input
        type="text"
        onChange={(e) => setFilter(e.target.value)}
        value={filter}
      />
      <button onClick={addToList}>Add to list</button>
      <button onClick={removeFromList}>Remove from list</button>
      <ul>
        {list.map((item) => (
          <li key={Math.random()}>{item}</li>
        ))}
      </ul>

      <ul>
        {filteredList.map((item) => (
          <li key={Math.random()}>{item}</li>
        ))}
      </ul>
    </>
  );
}

export default App;

/* Notes
   UseEffect is a hook that runs a function after the component is rendered.
*/

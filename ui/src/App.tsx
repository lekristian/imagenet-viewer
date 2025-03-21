import "./App.css";
import HierarchyExplorer from "./components/HierarchyExplorer/HierarchyExplorer";

function App() {
  return (
    <main className="flex min-h-screen flex-col">
      <header className="border-b bg-background px-6 py-4">
        <h1 className="text-2xl font-bold">Hierarchy Explorer</h1>
      </header>
      <HierarchyExplorer />
    </main>
  );
}

export default App;

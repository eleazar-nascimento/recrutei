import { Button } from "react-day-picker";
import { CreateTask } from "./components/create-task";
import { NavBar } from "./components/navbar";

function App() {
  return (
    <main className="container flex min-h-screen flex-col items-center pt-6 gap-1">
      <NavBar />
      <div className="px-6 py-4 bg-card rounded-b-2xl mb-20">
        <CreateTask>
          <Button className="rounded-full">Adicionar tarefa</Button>
        </CreateTask>
      </div>
    </main>
  );
}

export default App;

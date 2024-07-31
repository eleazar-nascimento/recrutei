import { CreateTask } from "./components/create-task";
import { DndComponent } from "./components/dnd/dnd-component";
import { NavBar } from "./components/navbar";
import { Button } from "./components/ui/button";

function App() {
  return (
    <main className="container flex min-h-screen flex-col items-center pt-6 gap-1 pb-6">
      <NavBar />
      <div className="px-6 py-4 bg-card rounded-b-2xl mb-20">
        <CreateTask>
          <Button className="rounded-full">Adicionar tarefa</Button>
        </CreateTask>
      </div>
      <DndComponent />
    </main>
  );
}

export default App;

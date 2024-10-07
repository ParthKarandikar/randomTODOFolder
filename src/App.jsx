import { useEffect, useState } from "react";
import "./App.css";
import { TodoProvider } from "./context/TodoContext";
import { TodoForm, TodoItem } from "./components";

function App() {
  const [todo, setTodo] = useState([]);

  const addTodos=(todo)=>{
    setTodo((prev) => [{ id: Date.now(), ...todo }, ...prev]);
  }
  const updateTodo=(id,todo)=>{
    setTodo((prev)=>prev.map((prevTodo)=>(
      prevTodo.id===id?todo:prevTodo
    )))
  }

  const deleteTodo=(id)=>{

    setTodo((prev)=>prev.filter((todo)=>todo.id!=id))
  } 

  const toggleTodo=(id)=>{
    setTodo((prev)=>prev.map((prevTodo)=>prevTodo.id===id?{...prevTodo,completed:!prevTodo.complete}:prevTodo))
  }

  useEffect(()=>{
    const getTodos=JSON.parse(localStorage.getItem("todos"))
    if(getTodos && getTodos.length>0){
      setTodo(getTodos)
    }
  },[])

  useEffect(() => {
    localStorage.setItem("todos",JSON.stringify(todo))
  }, [todo])
  
  
  return (
  <TodoProvider value={{todo,updateTodo,deleteTodo,toggleTodo,addTodos}}>
    <div className="bg-[#172842] min-h-screen py-8">
      <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
        <h1 className="text-2xl font-bold text-center mb-8 mt-2">
          Manage Your Todos
        </h1>
        <div className="mb-4">
        <TodoForm />
        </div>
        <div className="flex flex-wrap gap-y-3">
          {/*Loop and Add TodoItem here */}
          {todo.map((todo)=>(<div key={todo.id}>
            <TodoItem todo={todo}/>
          </div>))}
        </div>
      </div>
    </div>
  </TodoProvider>
  );
}

export default App;

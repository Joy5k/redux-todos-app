// import { useAppSelector } from "@/redux/hook";
import AddTodoModal from "./AddTodoModal";
import TodoCard from "./TodoCard";
import TodoFilter from "./TodoFilter";
import { useGetTodosQuery } from "@/redux/api/api";
import { JSX } from "react/jsx-runtime";


const TodoContainer = () => {
  // const {todos}=useAppSelector((state)=>state.todos)

  const { data, isLoading, isError } = useGetTodosQuery(undefined)
  if (isLoading) { 
    <p>Loading...</p>
  }
  if (isError) { 
    <p>Loading...</p>
  }
console.log(data);
  return (
    <div>
      <div className=" flex justify-between mb-5">    
        <AddTodoModal></AddTodoModal>
        <TodoFilter ></TodoFilter>
       
      </div>
      <div className="bg-primary-gradient w-full h-full rounded-xl  p-[5px]">
        {/* <div className="bg-white p-3 flex justify-center items-center rounded-md text-2xl font-bold">
                 <p>There is no task pending</p>
            </div> */}

        <div className="bg-white p-5 w-full space-y-3 h-full rounded-lg">
          {
            data?.map((item: JSX.IntrinsicAttributes & { id: string; title: string; description: string; priority: string; isCompleted?: boolean | undefined; }) => (<TodoCard key={item.id} {...item}></TodoCard>))
         }
        </div>
      </div>
    </div>
  );
};

export default TodoContainer;

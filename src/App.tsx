import { RouterProvider } from "react-router";
import { router } from "./routes";

export default function App() {

  return (
    <>
      <RouterProvider router={router} />
      
      <div className="d-flex flex-col items-center justify-center min-h-screen">
        <h1>Meu belo site!</h1>
        <p>Com Tailwind e DS do GovBr</p>
      </div>
    </>
  )
}

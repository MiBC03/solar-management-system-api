import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import {PrivateRoute} from "./routes/privateRoutes"

import {
  createBrowserRouter,
  RouterProvider,
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import SingIn from "./pages/Login/index"
import Cliente from "./pages/Cliente/index";
import EditCliente from "./pages/Cliente/edit";
import CreateCliente from "./pages/Cliente/create";
import Financiamento from "./pages/Financiamento";
import EditFinanciamento from "./pages/Financiamento/edit";
import CreateFinanciamento from "./pages/Financiamento/create";
import Obra from "./pages/Obra";
import EditObra from "./pages/Obra/edit";
import CreateObra from "./pages/Obra/create";
import Orcamento from "./pages/Orcamento";
import EditOrcamento from "./pages/Orcamento/edit";
import CreateOrcamento from "./pages/Orcamento/create";
import Pcivil from "./pages/Pcivil";
import EditPcivil from "./pages/Pcivil/edit";
import CreatePcivil from "./pages/Pcivil/create";
import Peletrico from "./pages/Peletrico";
import EditPeletrico from "./pages/Peletrico/edit";
import CreatePeletrico from "./pages/Peletrico/create";
import Funcionario from "./pages/Funcionario";
import CreateFuncionario from "./pages/Funcionario/create";
import EditFuncionario from "./pages/Funcionario/edit";

export function Rotas () {
  return(
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<SingIn/>} />
          
          <Route path="/clientes" element={<Cliente/>} />
          <Route path="/clientes/edit/:clienteId" element={<EditCliente/>} />
          <Route path="/clientes/create" 
          element={
          <PrivateRoute>
            <CreateCliente/>
          </PrivateRoute>
          } />

          <Route path="/orcamentos" element={<Orcamento/>} />
          <Route path="/orcamentos/edit/:orcamentoId" element={<EditOrcamento/>} />
          <Route path="/orcamentos/create/:clienteId" element={<CreateOrcamento/>} />
          
          <Route path="/financiamentos/" element={<Financiamento />} />
          <Route path="/financiamentos/edit/:financiamentoId/:clienteId" element={<EditFinanciamento />} />
          <Route path="/financiamentos/create/:clienteId" element={<CreateFinanciamento />} />

          <Route path="/obras" element={<Obra/>} />
          <Route path="/obras/edit/:clienteId" element={<EditObra/>} />
          <Route path="/obras/create" element={<CreateObra/>} />

          <Route path="/pcivil" element={<Pcivil/>} />
          <Route path="/pcivil/edit/:clienteId" element={<EditPcivil/>} />
          <Route path="/pcivil/create" element={<CreatePcivil/>} />

          <Route path="/peletrico" element={<Peletrico/>} />
          <Route path="/peletrico/edit/:clienteId" element={<EditPeletrico/>} />
          <Route path="/peletrico/create/:clienteId" element={<CreatePeletrico/>} />

          <Route path="/funcionario" element={<Funcionario/>} />
          <Route path="/funcionario/edit/:funcionarioId" element={<EditFuncionario/>} />
          <Route path="/funcionario/create" element={<CreateFuncionario/>} />

        </Routes>
    </BrowserRouter>
  )
}

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
      <Rotas />
  </React.StrictMode>
)








  



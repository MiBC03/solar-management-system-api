const express = require('express');
const clienteRoutes = require('./routes/clientes')
const orcamentosRoutes = require('./routes/orcamentos')
const financiamentosRoutes = require('./routes/financiamentos')
const funcionariosRoutes = require('./routes/funcionarios')
const loginRoutes = require('./routes/login')

const cors = require('cors')

const app = express();

app.use(express.json());
app.use(cors());

app.use("/", clienteRoutes)
app.use("/", orcamentosRoutes)
app.use("/", financiamentosRoutes)
app.use("/", funcionariosRoutes)
app.use("/", loginRoutes)

app.listen(8800);
import { Cliente } from "./Cliente.js";
import { contaCorrente } from "./ContaCorrente.js";

const cliente1 = new Cliente("Ricardo", 11122233309);
const cliente2 = new Cliente("Alice", 88822233309);

const contaCorrenteRicardo = new contaCorrente(1001, cliente1);
contaCorrenteRicardo.depositar(500);
const conta2 = new contaCorrente(1001, cliente2);

let valor = 200;
contaCorrenteRicardo.transferir(200, conta2);

console.log(contaCorrente.numeroDeContas)
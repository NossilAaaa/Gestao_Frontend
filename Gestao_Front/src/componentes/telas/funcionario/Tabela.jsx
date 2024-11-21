import { useContext } from "react";
import Alerta from "../../comuns/Alerta";
import { Table, Button } from "react-bootstrap";
import FuncionarioContext from "./FuncionarioContext";

function Tabela() {
    const {
        alerta,
        listaFuncionarios,
        remover,
        novoFuncionario,
        editarFuncionario
    } = useContext(FuncionarioContext);

    return (
        <div style={{ padding: '50px', width: '2000px' }}>
            <h1 style={{ color: 'white', textAlign: 'center' }}>
                Painel de Controle: Funcionários
            </h1>
            <Alerta alerta={alerta} />

            <Button variant="primary" onClick={novoFuncionario}>
                Cadastrar Novo Funcionário
            </Button>
            <br /><br />

            {/* Exibição condicional da tabela */}
            {listaFuncionarios.length === 0 ? (
                <h1 style={{ textAlign: 'center' }}>Nenhum registro encontrado</h1>
            ) : (
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th style={{ textAlign: 'center' }}>Ações</th>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Cargo</th>
                            <th>Salário</th>
                            <th>Departamento</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listaFuncionarios.map((funcionario) => (
                            <tr key={funcionario.id}>
                                <td key={`${funcionario.id}-acoes`} align="center">
                                    <Button
                                        variant="info"
                                        onClick={() => editarFuncionario(funcionario.id)}
                                        style={{ marginRight: '5px' }}
                                    >
                                        <i className="bi bi-pencil-square"></i>
                                    </Button>
                                    <Button
                                        variant="danger"
                                        onClick={() => remover(funcionario.id)}
                                    >
                                        <i className="bi bi-trash"></i>
                                    </Button>
                                </td>
                                <td key={`${funcionario.id}-id`}>{funcionario.id}</td>
                                <td key={`${funcionario.id}-nome`}>{funcionario.nome}</td>
                                <td key={`${funcionario.id}-cargo`}>{funcionario.cargo}</td>
                                <td key={`${funcionario.id}-salario`}>{funcionario.salario}</td>
                                <td key={`${funcionario.id}-departamento`}>
                                    {funcionario.nome_departamento || "Departamento não informado"}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    );
}

export default Tabela;

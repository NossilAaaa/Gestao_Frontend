import { useContext } from "react";
import Alerta from "../../comuns/Alerta";
import { Table, Button, Spinner } from "react-bootstrap";
import DepartamentoContext from "./DepartamentoContext";

function Tabela({ listaDepartamentos, carregando }) {
    const { alerta, remover, novoDepartamento, editarDepartamento } = useContext(DepartamentoContext);

    return (
        <div style={{ padding: '20px' }} className="tabela">
            <h1 style={{ color: 'white', textAlign: "center" }}>Painel de Controle: Departamentos</h1>
            <Alerta alerta={alerta} />
            <Button variant="primary" onClick={novoDepartamento}>Adicionar Novo Departamento</Button>
            <br /><br />

            {carregando ? (
                <div style={{ textAlign: 'center' }}>
                    <Spinner animation="border" variant="primary" />
                    <p>Carregando departamentos...</p>
                </div>
            ) : listaDepartamentos.length === 0 ? (
                <h1 style={{ textAlign: 'center' }}>Nenhum registro encontrado</h1>
            ) : (
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th style={{ textAlign: 'center' }}>Ações</th>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Localização</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listaDepartamentos.map((departamento) => (
                            <tr key={departamento.id}>
                                <td align="center">
                                    <Button variant="info" onClick={() => editarDepartamento(departamento.id)}>
                                        <i className="bi bi-pencil-square"></i>
                                    </Button>
                                    <Button variant="danger" onClick={() => remover(departamento.id)}>
                                        <i className="bi bi-trash"></i>
                                    </Button>
                                </td>
                                <td>{departamento.id}</td>
                                <td>{departamento.nome}</td>
                                <td>{departamento.localizacao}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    );
}

export default Tabela;

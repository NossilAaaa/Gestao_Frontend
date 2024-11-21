import { useContext, useState, useEffect } from "react";
import Alerta from "../../comuns/Alerta";
import { Table, Button, Spinner } from "react-bootstrap";
import DepartamentoContext from "./DepartamentoContext";

function Tabela() {
    const { alerta, remover, novoDepartamento, editarDepartamento } = useContext(DepartamentoContext);
    const [listaDepartamentos, setListaDepartamentos] = useState([]);
    const [carregando, setCarregando] = useState(true);  // Estado de carregamento

    // Busca os departamentos na API ao carregar o componente
    useEffect(() => {
        const apiUrl = process.env.REACT_APP_ENDERECO_API + '/departamentos';

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                setListaDepartamentos(data.departamentos);
                setCarregando(false);  // Atualiza o estado de carregamento
            })
            .catch(error => {
                console.error('Erro ao carregar os departamentos:', error);
                setCarregando(false);  // Mesmo em erro, o carregamento é finalizado
            });
    }, []);  // A lista de departamentos é carregada uma vez após a montagem do componente

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

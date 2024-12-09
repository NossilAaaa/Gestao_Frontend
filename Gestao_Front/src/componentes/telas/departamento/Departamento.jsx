import { useState, useEffect } from "react";
import {
    getDepartamentoAPI, getDepartamentoPorCodigoAPI, deleteDepartamentoPorCodigoAPI,
    cadastraDepartamentoAPI
} from "../../../servicos/DepartamentoServico";
import Tabela from "./Tabela";
import Formulario from "./Formulario";
import '../Home.css';
import DepartamentoContext from "./DepartamentoContext";
import WithAuth from "../../../seguranca/WithAuth";
import { useNavigate } from "react-router-dom";

function Departamento() {
    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaDepartamentos, setListaDepartamentos] = useState([]);
    const [editar, setEditar] = useState(false);
    const [exibirForm, setExibirForm] = useState(false);
    const [departamento, setDepartamento] = useState({ id: null, nome: '', localizacao: '' });
    const [carregando, setCarregando] = useState(true); // Inicia como carregando

    let navigate = useNavigate();

    // Função para iniciar novo departamento
    const novoDepartamento = () => {
        console.log('Iniciando novo departamento...');
        setEditar(false);
        setAlerta({ status: "", message: "" });
        setDepartamento({ id: null, nome: '', localizacao: '' });
        setExibirForm(true);
    };

    // Função para editar departamento
    const editarDepartamento = async (id) => {
        console.log(`Editando departamento com id: ${id}`);
        try {
            setCarregando(true);
            const dados = await getDepartamentoPorCodigoAPI(id);
            setDepartamento(dados);
            setEditar(true);
            setExibirForm(true);
        } catch (erro) {
            navigate("/login", { replace: true });
            setAlerta({ status: "error", message: "Erro ao carregar o departamento" });
        } finally {
            setCarregando(false);
        }
    };

    // Função para salvar (criar ou editar) departamento
    const acaoCadastrar = async (e) => {
        e.preventDefault();
        const metodo = editar ? "PUT" : "POST";
        try {
            console.log('Salvando departamento...');
            setCarregando(true);

            const retornoAPI = await cadastraDepartamentoAPI(departamento, metodo);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message });

            if (editar) {
                setEditar(false);
            }

            recuperaDepartamentos(); // Atualiza a lista
            setExibirForm(false);
        } catch (err) {
            navigate("/login", { replace: true });
            setAlerta({ status: "error", message: "Erro ao salvar o departamento" });
        } finally {
            setCarregando(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDepartamento({ ...departamento, [name]: value || '' });
    };

    const recuperaDepartamentos = async () => {
        console.log('Recuperando lista de departamentos...');
        try {
            setCarregando(true);
            const departamentos = await getDepartamentoAPI();
            setListaDepartamentos(departamentos);
        } catch (erro) {
            navigate("/login", { replace: true });
            setAlerta({ status: "error", message: "Erro ao carregar departamentos" });
        } finally {
            setCarregando(false);
        }
    };

    const remover = async (id) => {
        console.log(`Removendo departamento com id: ${id}`);
        if (window.confirm('Deseja remover este departamento?')) {
            try {
                const retornoAPI = await deleteDepartamentoPorCodigoAPI(id);
                setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
                recuperaDepartamentos();
            } catch (erro) {
                navigate("/login", { replace: true });
                setAlerta({ status: "error", message: "Erro ao remover o departamento" });
            }
        }
    };

    useEffect(() => {
        recuperaDepartamentos();
    }, []);

    return (
        <div className="departamento">
            <DepartamentoContext.Provider value={{
                alerta,
                remover,
                departamento,
                editarDepartamento,
                novoDepartamento,
                acaoCadastrar,
                handleChange,
                exibirForm,
                setExibirForm
            }}>
                <div className="tabela-container">
                    <Tabela
                        listaDepartamentos={listaDepartamentos}
                        carregando={carregando}
                    />
                </div>
                {exibirForm && <Formulario />}
            </DepartamentoContext.Provider>
        </div>
    );
}

export default WithAuth(Departamento);

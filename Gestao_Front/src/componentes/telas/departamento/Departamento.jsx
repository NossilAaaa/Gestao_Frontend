import { useState, useEffect } from "react";
import {
    getDepartamentoAPI, getDepartamentoPorCodigoAPI, deleteDepartamentoPorCodigoAPI,
    cadastraDepartamentoAPI
} from "../../../servicos/DepartamentoServico";
import Tabela from "./Tabela";
import Formulario from "./Formulario";
import Carregando from "../../comuns/Carregando";
import '../Home.css';
import DepartamentoContext from "./DepartamentoContext";

function Departamento() {
    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaDepartamentos, setListaDepartamentos] = useState([]);
    const [editar, setEditar] = useState(false);
    const [exibirForm, setExibirForm] = useState(false);
    const [departamento, setDepartamento] = useState({ id: null, nome: '', localizacao: '' });
    const [carregando, setCarregando] = useState(false);  // Estado de carregamento

    // Função para iniciar novo departamento
    const novoDepartamento = () => {
        console.log('Iniciando novo departamento...');
        setEditar(false);
        setAlerta({ status: "", message: "" });
        setDepartamento({ id: null, nome: '', localizacao: '' }); // Limpar id ao criar novo
        setExibirForm(true);
    };
    
    // Função para editar departamento
    const editarDepartamento = async (id) => {
        console.log(`Editando departamento com id: ${id}`);
        try {
            setCarregando(true);  // Inicia o carregamento
            const dados = await getDepartamentoPorCodigoAPI(id);
            console.log('Departamento encontrado:', dados);
            setDepartamento(dados); 
            setEditar(true);
            setExibirForm(true);
        } catch (erro) {
            console.error("Erro ao buscar o departamento para edição:", erro);
            setAlerta({ status: "error", message: "Erro ao carregar o departamento" });
        } finally {
            setCarregando(false);  // Finaliza o carregamento
        }
    };

    // Função para salvar (criar ou editar) departamento
    const acaoCadastrar = async (e) => {
        e.preventDefault();
        const metodo = editar ? "PUT" : "POST";
        try {
            console.log('Salvando departamento...');
            setCarregando(true);  // Inicia o carregamento

            const retornoAPI = await cadastraDepartamentoAPI(departamento, metodo);
            console.log('Resposta da API:', retornoAPI);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message });

            // Se for uma edição, setar editar para false após o sucesso
            if (editar) {
                setEditar(false);
            }

            // Recupera a lista de departamentos atualizada
            recuperaDepartamentos();
            setExibirForm(false);
        } catch (err) {
            console.error("Erro ao salvar departamento:", err);
            setAlerta({ status: "error", message: "Erro ao salvar o departamento" });
        } finally {
            setCarregando(false);  // Finaliza o carregamento
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(`Mudança no campo: ${name} com valor: ${value}`);
        setDepartamento({
            ...departamento,
            [name]: value || ''  // Garantir que o valor nunca seja null ou undefined
        });
    };

    const recuperaDepartamentos = async () => {
        console.log('Recuperando lista de departamentos...');
        setCarregando(true);  // Inicia o carregamento
        try {
            const departamentos = await getDepartamentoAPI();
            console.log('Departamentos recuperados:', departamentos);
            setListaDepartamentos(departamentos.departamentos);
        } catch (erro) {
            console.error("Erro ao recuperar departamentos:", erro);
            setAlerta({ status: "error", message: "Erro ao carregar departamentos" });
        } finally {
            setCarregando(false);  // Finaliza o carregamento
        }
    }

    const remover = async (id) => {
        console.log(`Removendo departamento com id: ${id}`);
        if (window.confirm('Deseja remover este departamento?')) {
            try {
                const retornoAPI = await deleteDepartamentoPorCodigoAPI(id);
                console.log('Resposta da API ao remover:', retornoAPI);
                setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
                recuperaDepartamentos();
            } catch (erro) {
                console.error("Erro ao remover departamento:", erro);
                setAlerta({ status: "error", message: "Erro ao remover o departamento" });
            }
        }
    };
/*
    useEffect(() => {
        console.log('Componente montado, recuperando departamentos...');
        recuperaDepartamentos(); 
    }, []);
*/
    return (
        <div className="departamento">
            <DepartamentoContext.Provider value={{
                alerta,
                listaDepartamentos,
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
                    <Carregando carregando={carregando}>  {/* Carregamento condicional */}
                        <Tabela />
                    </Carregando>
                </div>
                <Formulario />
            </DepartamentoContext.Provider>
        </div>
    );
}

export default Departamento;

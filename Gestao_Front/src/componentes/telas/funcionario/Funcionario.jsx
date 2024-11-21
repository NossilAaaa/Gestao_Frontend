import { useState, useEffect } from "react";
import FuncionarioContext from "./FuncionarioContext";
import {
    getFuncionarioAPI,
    getFuncionarioPorCodigoAPI,
    cadastraFuncionarioAPI,
    deleteFuncionarioPorCodigoAPI
} from "../../../servicos/FuncionarioServico";
import Tabela from "./Tabela";
import '../Home.css';
import Formulario from "./Formulario";
import Carregando from "../../comuns/Carregando";
import {
    getDepartamentoAPI
} from "../../../servicos/DepartamentoServico";

function Funcionario() {
    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaFuncionarios, setListaFuncionarios] = useState([]);
    const [editar, setEditar] = useState(false);
    const [exibirForm, setExibirForm] = useState(false);
    const [carregando, setCarregando] = useState(false);
    
    const [funcionario, setFuncionario] = useState({
        id: 0,
        nome: "",
        cargo: "",
        salario: 0.00,
        departamento_id: 0  
    });

    const [departamentos, setDepartamentos] = useState([]);

    // Função para cadastrar um novo funcionário
    const novoFuncionario = () => {
        setEditar(false);  
        setFuncionario({
            id: 0,
            nome: "",
            cargo: "",
            salario: 0.00,
            departamento_id: 0
        });
        setExibirForm(true);  
        setAlerta({ status: "", message: "" });  
    };

    // Função para editar um funcionário
    const editarFuncionario = async (id) => {
        try {
            const funcionarioEditado = await getFuncionarioPorCodigoAPI(id);
            if (funcionarioEditado) {
                setFuncionario({
                    ...funcionarioEditado,
                    departamento_id: funcionarioEditado.departamento_id || 0  
                });
                setEditar(true);
                setExibirForm(true);
                setAlerta({ status: "", message: "" });
            } else {
                setAlerta({ status: "error", message: "Funcionário não encontrado" });
            }
        } catch (error) {
            console.error("Erro ao editar funcionário:", error);
        }
    };

    const acaoCadastrar = async (e) => {
        e.preventDefault();
        const metodo = editar ? "PUT" : "POST";
    
        // Verifica o valor do departamento_id antes de realizar a validação
        console.log("Departamento ID: ", funcionario.departamento_id);
    
        if (funcionario.departamento_id === null || funcionario.departamento_id === undefined || funcionario.departamento_id === 0) {
            setAlerta({ status: "error", message: "O departamento deve ser selecionado!" });
            return;
        }
    
        try {
            const retornoAPI = await cadastraFuncionarioAPI(funcionario, metodo);
            if (retornoAPI) {
                setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
                if (!editar) setFuncionario(retornoAPI.funcionario);
                recuperaFuncionarios(); // Atualizar a lista após cadastro/edição
                setExibirForm(false);
            }
        } catch (error) {
            console.error("Erro ao cadastrar funcionário:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(`Mudança no campo ${name}: ${value}`); // Log para depuração
    
        setFuncionario((prevState) => {
            let novoValor = value;
    
            // Verifica se o campo é numérico e converte
            if (["id", "departamento_id", "salario"].includes(name)) {
                novoValor = Number(value);
                console.log(`Valor convertido para número (${name}): ${novoValor}`);
            }
    
            return {
                ...prevState,
                [name]: novoValor,
            };
        });
    };
    
    
    
    

    // Função para recuperar a lista de funcionários
    const recuperaFuncionarios = async () => {
        setCarregando(true);
        try {
            const lista = await getFuncionarioAPI();
            setListaFuncionarios(lista);
        } catch (error) {
            console.error("Erro ao carregar funcionários:", error);
        } finally {
            setCarregando(false);
        }
    };

    const recuperaDepartamentos = async () => {
        try {
            const departamentos = await getDepartamentoAPI();
            console.log('Resposta da API:', departamentos);
            if (departamentos && departamentos.departamentos) {
                setDepartamentos(departamentos.departamentos);
            } else {
                console.error("Estrutura de dados inesperada:", departamentos);
            }
        } catch (erro) {
            console.error("Erro ao recuperar departamentos:", erro);
        }
    };
    

    // Função para remover um funcionário
    const remover = async (id) => {
        if (window.confirm('Deseja remover este funcionário?')) {
            try {
                const retornoAPI = await deleteFuncionarioPorCodigoAPI(id);
                setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
                recuperaFuncionarios(); // Atualizar lista após remoção
            } catch (error) {
                console.error("Erro ao remover funcionário:", error);
            }
        }
    };

    // Recuperar funcionários ao montar o componente
    useEffect(() => {
        recuperaFuncionarios();
        recuperaDepartamentos();
    }, []);

    useEffect(() => {
        console.log("Estado do funcionário após carregamento: ", funcionario);
    }, [funcionario]);

    return (
        <div className="funcionario">
            <FuncionarioContext.Provider value={{
                alerta,
                listaFuncionarios,
                remover,
                funcionario,
                editarFuncionario,
                novoFuncionario,
                acaoCadastrar,
                handleChange,
                exibirForm,
                setExibirForm,
                departamentos
            }}>
                <div className="tabela">
                    <Carregando carregando={carregando}>
                        <Tabela />
                    </Carregando>
                </div>
                 <Formulario />
            </FuncionarioContext.Provider>
        </div>
    );
}

export default Funcionario;

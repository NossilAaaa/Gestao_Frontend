const baseUrl = process.env.REACT_APP_ENDERECO_API;

// Função para tratamento de resposta
const handleResponse = async (response) => {
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Erro ao processar a solicitação");
    }
    try {
        return await response.json();
    } catch (error) {
        return null; // Em casos onde a resposta é um DELETE ou não contém um JSON
    }
};

// Função para buscar todos os funcionários
export const getFuncionarioAPI = async () => {
    try {
        const response = await fetch(`${baseUrl}/funcionarios`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        return await handleResponse(response);
    } catch (error) {
        console.error("Erro ao buscar funcionários:", error);
        return [];
    }
};

// Função para buscar um funcionário por ID
export const getFuncionarioPorCodigoAPI = async (id) => {
    try {
        const response = await fetch(`${baseUrl}/funcionarios/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        return await handleResponse(response);
    } catch (error) {
        console.error(`Erro ao buscar funcionário com ID ${id}:`, error);
        return null;
    }
};

// Função para deletar um funcionário por ID
export const deleteFuncionarioPorCodigoAPI = async (id) => {
    try {
        const response = await fetch(`${baseUrl}/funcionarios/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (response.status === 204) {
            return { message: "Funcionário removido com sucesso" };
        }
        return await handleResponse(response);
    } catch (error) {
        console.error(`Erro ao deletar funcionário com ID ${id}:`, error);
        return null;
    }
};

// Função para cadastrar ou atualizar um funcionário
export const cadastraFuncionarioAPI = async (objeto, metodo) => {
    try {
        const response = await fetch(`${baseUrl}/funcionarios`, {
            method: metodo,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(objeto)
        });
        return await handleResponse(response);
    } catch (error) {
        console.error("Erro ao cadastrar/atualizar funcionário:", error);
        return null;
    }
};

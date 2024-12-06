import { getToken } from '../seguranca/Autenticacao';

export const getDepartamentoAPI = async () => {
    const response = await 
        fetch(`${process.env.REACT_APP_ENDERECO_API}/departamentos`,
            {
                method : "GET",
                headers : {
                    "Content-Type" : "application/json",
                    "authorization": getToken()
                }
            }
        );
    const data = await response.json();
    return data;
}

// Função para obter um departamento por ID
export const getDepartamentoPorCodigoAPI = async (id) => {
    console.log(`Buscando departamento com ID: ${id}`);
    try {
        const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/departamentos/${id}`);

        if (!response.ok) {
            console.error(`Erro ao obter departamento com ID ${id}: ${response.statusText}`);
            throw new Error(`Erro ao obter departamento com ID ${id}: ${response.statusText}`);
        }

        const dados = await response.json();
        console.log('Departamento encontrado:', dados);
        return dados;
    } catch (error) {
        console.error(`Erro ao recuperar o departamento com ID ${id}:`, error);
        throw error;
    }
}

// Função para deletar um departamento por ID
export const deleteDepartamentoPorCodigoAPI = async (id) => {
    console.log(`Removendo departamento com ID: ${id}`);
    try {
        const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/departamentos/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "authorization": getToken()
            }
        });

        if (!response.ok) {
            console.error(`Erro ao deletar departamento com ID ${id}: ${response.statusText}`);
            throw new Error(`Erro ao deletar departamento com ID ${id}: ${response.statusText}`);
        }

        const dados = await response.json();
        console.log('Departamento removido:', dados);
        return dados;
    } catch (error) {
        console.error(`Erro ao remover departamento com ID ${id}:`, error);
        throw error;
    }
}

export const cadastraDepartamentoAPI = async (departamento, metodo) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/departamentos`, {
            method: metodo,
            headers: {
                'Content-Type': 'application/json',
                "authorization": getToken()
            },
            body: JSON.stringify(departamento)
        });

        if (!response.ok) {
            throw new Error('Erro ao cadastrar departamento');
        }

        const data = await response.json();
        return data; // Retorna o departamento cadastrado
    } catch (error) {
        console.error('Erro ao cadastrar departamento:', error);
        throw error;
    }
};



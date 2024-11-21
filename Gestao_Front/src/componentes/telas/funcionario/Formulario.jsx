import { useContext, useEffect, useState } from 'react';
import Alerta from '../../comuns/Alerta';
import Col from 'react-bootstrap/Col';
import CampoEntrada from '../../comuns/CampoEntrada';
import Dialogo from '../../comuns/Dialogo';
import CampoSelect from '../../comuns/CampoSelect';
import FuncionarioContext from './FuncionarioContext';
import {
    getDepartamentoAPI
} from "../../../servicos/DepartamentoServico";

function Formulario() {
    const { funcionario, handleChange, acaoCadastrar, alerta,
        exibirForm, setExibirForm } = useContext(FuncionarioContext);

    const [departamentos, setDepartamentos] = useState([]);

    const recuperaDepartamentos = async () => {
        console.log('Recuperando lista de departamentos no formlario...');
        try {
            const departamentos = await getDepartamentoAPI();
            console.log('Departamentos recuperados:', departamentos);
            setDepartamentos(departamentos.departamentos);
        } catch (erro) {
            console.error("Erro ao recuperar departamentos:", erro);
        }
    }
    useEffect(() => {
        recuperaDepartamentos();
        console.log("no formulário: " + JSON.stringify(departamentos));
    }, []);

    useEffect(() => {
        console.log('Estado atual do funcionário no useEffect:', funcionario);
    }, [funcionario]);
    

    return (
        <Dialogo id="modalEdicao" titulo="Funcionário"
            idform="formulario" acaoCadastrar={acaoCadastrar}
            exibirForm={exibirForm} setExibirForm={setExibirForm}>

            <Alerta alerta={alerta} />

            {/* Campo para ID */}
            <Col xs={12} md={4}>
                <CampoEntrada value={funcionario?.id || ''}
                    id="txtId" name="id" label="ID"
                    tipo="number" onchange={handleChange}
                    requerido={true} readonly={false} maxCaracteres={5} />
            </Col>

            {/* Campo para Nome */}
            <Col xs={12} md={8}>
                <CampoEntrada value={funcionario?.nome || ''}
                    id="txtNome" name="nome" label="Nome"
                    tipo="text" onchange={handleChange}
                    msginvalido="Informe o nome"
                    requerido={true} readonly={false} maxCaracteres={40} />
            </Col>

            {/* Campo para Cargo */}
            <Col xs={12} md={6}>
                <CampoEntrada value={funcionario?.cargo || ''}
                    id="txtCargo" name="cargo" label="Cargo"
                    tipo="text" onchange={handleChange}
                    msginvalido="Informe o cargo"
                    requerido={true} readonly={false} maxCaracteres={30} />
            </Col>

            {/* Campo para Salário */}
            <Col xs={12} md={6}>
                <CampoEntrada value={funcionario?.salario || ''}
                    id="txtSalario" name="salario" label="Salário"
                    tipo="number" onchange={handleChange}
                    msginvalido="Informe o salário"
                    requerido={true} readonly={false} maxCaracteres={10} />
            </Col>

            {/* Campo Select para Departamento */}
            <Col xs={12} md={12}>
                <CampoSelect
                    value={funcionario?.departamento_id || ''}  // O valor do departamento no estado
                    id="selectDepartamento"
                    name="departamento_id"
                    label="Departamento"
                    onchange={handleChange}
                    msgvalido="Departamento escolhido"
                    msginvalido="Informe o departamento"
                >
                    {departamentos?.length > 0 ? (
                        departamentos.map((departamento) => (
                            <option key={departamento.id} value={departamento.id}>
                                {departamento.nome}
                            </option>
                        ))
                    ) : (
                        <option disabled>Carregando departamentos...</option>
                    )}
                </CampoSelect>

            </Col>
        </Dialogo>
    );
}

export default Formulario;

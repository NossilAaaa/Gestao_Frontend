import { useContext } from 'react';
import Alerta from '../../comuns/Alerta';
import { Col } from 'react-bootstrap';
import CampoEntrada from '../../comuns/CampoEntrada';
import Dialogo from '../../comuns/Dialogo';
import DepartamentoContext from './DepartamentoContext'; 

function Formulario() {
    const { departamento, handleChange, acaoCadastrar, alerta, exibirForm, setExibirForm } = useContext(DepartamentoContext);

    return (
        <Dialogo 
            id="modalEdicao" 
            titulo="Departamentos"
            idform="formulario" 
            acaoCadastrar={acaoCadastrar}
            exibirForm={exibirForm} 
            setExibirForm={setExibirForm}
        >
            <Alerta alerta={alerta} />
            <Col xs={12} md={12}>
                <CampoEntrada 
                    value={departamento.id || ''}
                    id="txtId" 
                    name="id" 
                    label="ID"
                    tipo="number" 
                    onchange={handleChange}
                    msginvalido="Informe o ID"
                    requerido={true} 
                    readonly={false}  
                    maxCaracteres={5} 
                />
            </Col>
            <Col xs={12} md={12}>
                <CampoEntrada 
                    value={departamento.nome || ''}
                    id="txtNome" 
                    name="nome" 
                    label="Nome"
                    tipo="text" 
                    onchange={handleChange}
                    msginvalido="Informe o nome"
                    requerido={true} 
                    readonly={false}
                    maxCaracteres={40} 
                />
            </Col>
            <Col xs={12} md={12}>
                <CampoEntrada 
                    value={departamento.localizacao || ''}
                    id="txtLocalizacao" 
                    name="localizacao" 
                    label="Localização"
                    tipo="text" 
                    onchange={handleChange}
                    msginvalido="Informe a localização"
                    requerido={true} 
                    readonly={false}
                    maxCaracteres={100} 
                />
            </Col>
        </Dialogo>
    );
}

export default Formulario;

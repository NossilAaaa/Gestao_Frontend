import "./Home.css";

const Home = () => {
    return (
        <>
            <div className="home">
                <div className="texto">
                    Bem-vindo à nossa API de Gestão de Departamentos e Funcionários!
                    <br />
    
                    <p className="tx2">Gerencie seu time com mais eficiência e flexibilidade!</p>
                    <br />
                    <p className="textoGrande">Por que escolher nossa API?</p>
                    <div class="cards-container">
                        <div class="card">
                            <h2>Gestão Simplificada</h2>
                            <p>A nossa API permite gerenciar departamentos, funcionários e suas funções de maneira simples e intuitiva, com integração fácil em sistemas existentes.</p>
                        </div>
    
                        <div class="card">
                            <h2>Flexibilidade e Personalização</h2>
                            <p>Você pode adaptar a API para diferentes fluxos de trabalho, desde a criação de departamentos até a atualização de informações de funcionários de forma ágil e prática.</p>
                        </div>
    
                        <div class="card">
                            <h2>Segurança e Escalabilidade</h2>
                            <p>Com altos padrões de segurança e capacidade de escalar conforme o crescimento da sua organização, nossa API garante o bom funcionamento de qualquer operação, mesmo em empresas de grande porte.</p>
                        </div>
    
                        <div class="card">
                            <h2>Suporte e Documentação Completa</h2>
                            <p>Oferecemos uma documentação detalhada e suporte dedicado para garantir que você aproveite ao máximo todas as funcionalidades da API.</p>
                        </div>
                    </div>
                    <p className="Final">Comece agora! <br /> Organize sua equipe e otimize sua gestão com nossa API!</p>
                </div>
            </div>
        </>
    )
    
}

export default Home;
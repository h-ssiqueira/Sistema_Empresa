let database = window.database;
function login_adm(){
    var log = document.getElementById("adm-email").value;
    var sen = document.getElementById("adm-password").value;

    ADM.loginADM(log, sen).then(function(resul){
        if(resul === true){
            document.getElementById("admlogin").style.visibility = "hidden";
            document.getElementById("admswap").style.visibility = "visible";
        }
        else{
            alert("Email ou senha incorretos");
        }
    });
    /*if(ADM.loginADM(log, sen)){
        //Troca vizualização
        document.getElementById("admlogin").style.visibility = "hidden";
        document.getElementById("admswap").style.visibility = "visible";

    }
    else{
        alert("Email ou senha incorretos");
    }*/
}

function login_cliente(){
    var log = document.getElementById("cliente_CNPJ").value;
    var sen = document.getElementById("cliente_senha").value;
    loginCliente(log, sen).then(function(resul){
        //Troca visualização
        if(resul == true){
            document.getElementById("logincli").style.visibility = "hidden";
            document.getElementById("swapcli").style.visibility = "visible";
        }else{
            alert("CNPJ ou senha incorretos");
        }
    })
    .catch(function(error){
        alert(error);
    })

    /*
    if(loginCliente(log, sen)){

        //Troca visualização
        document.getElementById("logincli").style.visibility = "hidden";
        document.getElementById("swapcli").style.visibility = "visible";
    }
    else{
        alert("CNPJ ou senha incorretos");
    }
    */
}

// Cadastro de cliente
function seja_nosso_cliente(){
    var nome = document.getElementById("cadastro-nome").value;
    var email = document.getElementById("cadastro-email").value;
    var CNPJ = document.getElementById("cadastro-CNPJ").value;
    var endereco = document.getElementById("cadastro-endereco").value;
    var tel = document.getElementById("cadastro-tel").value;
    var senha = document.getElementById("cadastro-senha").value;
    var senhaconf = document.getElementById("cadastro-senhaconf").value;

    if(senha == senhaconf){
        cadastro(nome, email, CNPJ,endereco,tel,senha).then(function(ret){
            if(ret == true){
                alert("Cliente cadastrado!");
            }
            else{
                alert("Dados incorretos ou já existentes.");
            }
        })
    }
    else{
        alert("Senhas não são iguais, tente novamente.");
    }
}

// Funções ADM (logadas)

// Textarea - exibição
function listar_pedidosA(){
    if(ADM.email != null){ // Confere se está logado
        var painel = document.getElementById("adm-textarea");
        var txt = listar_pedidos_abertos();
        painel.value = txt;
        console.log("Retorno:"+ window.database.select_pedidosALL());//Nao fuciona retornar

        //console.log(pedidos_aberto);
        //texto.value = pedidos_aberto;
    }
    else{
        alert("Faça login para utilizar este recurso.");
    }
}

function listar_clientes(){
    if(ADM.email != null){ // Confere se está logado
        var painel = document.getElementById("adm-textarea");
        var txt = listar_consumidores();
        painel.value = txt;
        console.log("Retorno:"+ window.database.select_pedidosALL());//Nao fuciona retornar
    }
    else{
        alert("Faça login para utilizar este recurso.");
    }
}

function listar_madeira(){
    if(ADM.email != null){ // Confere se está logado
        var painel = document.getElementById("adm-textarea");
        var txt = listar_madeiras();
        painel.value = txt;
        console.log("Retorno:"+ window.database.select_pedidosALL());//Nao fuciona retornar
    }
    else{
        alert("Faça login para utilizar este recurso.");
    }
}

function listar_pedidosH(){
    if(ADM.email != null){ // Confere se está logado
        var painel = document.getElementById("adm-textarea");
        var txt = listar_pedidos_fechados();
        painel.value = txt;
        console.log("Retorno:"+ window.database.select_pedidosALL());//Nao fuciona retornar
    }
    else{
        alert("Faça login para utilizar este recurso.");
    }
}

// Manipulação dos pedidos
function atender_pedido(){///ERROOOOO
    if(ADM._email != null){
        var num = document.getElementById("adm-atender_pedido").value;
        atender_pedido(num).than(function(ret){
            if(ret == true){
                alert("Pedido atendido");
            }else{
                alert("Pedido não encontrado");
            }
        })
    }
    else{
        alert("Faça login para utilizar este recurso.");
    }
}

function excluir_pedido(){//Esta chamando direto do bd(Arrumar)
    if(ADM.email != null){
        var num = document.getElementById("adm-excluir_pedido").value;
        database.remove_pedido(num).than(function(ret){
            if(ret == true){
                alert("Pedido excluído.");
            }
            else{
                alert("Pedido não encontrado.");
            }
        });
    }
    else{
        alert("Faça login para utilizar este recurso.");
    }
}

// Manipulação das madeiras
function madeira_add(){
    if(ADM._email != null){
        var num = document.getElementById("adm-num_madeira_add").value;
        var preco = document.getElementById("adm-preco_madeira_add").value;
        var tipo = document.getElementById("adm-tipo_madeira_add").value;
        var idade = document.getElementById("adm-idade_madeira_add").value;
        if(adicionar_madeira(num,preco,tipo,idade)){
            alert("Madeira adicionada.");
        }
        else{
            alert("Erro ao adicionar a madeira: mesmo número utilizado.");
        }
    }
    else{
        alert("Faça login para utilizar este recurso.");
    }
}

function madeira_att(){
    if(ADM._email != null){
        var num = document.getElementById("adm-num_madeira_att").value;
        var preco = document.getElementById("adm-preco_madeira_att").value;
        var tipo = document.getElementById("adm-tipo_madeira_att").value;
        var idade = document.getElementById("adm-idade_madeira_att").value;
        if(atualizar_madeira(num,preco,tipo,idade)){
            alert("Madeira atualizada.");
        }
        else{
            alert("Erro ao atualizar a madeira: número não encontrado.");
        }
    }
    else{
        alert("Faça login para utilizar este recurso.");
    }
}

function madeira_del(){
    if(ADM._email != null){
        var num = document.getElementById("adm-num_madeira_del").value;
        if(remover_madeira(num)){
            alert("Madeira removida.");
        }
        else{
            alert("Madeira não removida.");
        }
    }
    else{
        alert("Faça login para utilizar este recurso.");
    }
}

// Funções do cliente (logadas)

function realizar_pedido(){
    if(cliente.cnpj != null){ // Confere se o cliente está logado
        var m3 = document.getElementById("cliente-m3_pedido").value;
        var data = document.getElementById("cliente-data_pedido").value;
        if(fazer_pedido(cliente.cnpj, m3, data)){
            alert("Pedido realizado.");
        }
        else{
            alert("Erro ao realizar o pedido.");
        }
    }
    else{
        alert("Faça login para utilizar este recurso.");
    }
}

// Textarea
function pedidos_abertos(){
    if(cliente.cnpj != null){ // Confere se o cliente está logado
        
        var painel = document.getElementById("cliente-pedidosA");
        pedidos_em_aberto(cliente.cnpj).then(function(pedidos){
            painel.value = pedidos;
        })
        //painel.value = txt;
    }
    else{
        alert("Faça login para utilizar este recurso.");
    }
}

// Textarea
function pedidos_concluidos(){
    if(cliente.cnpj != null){ // Confere se o cliente está logado
        var painel = document.getElementById("cliente-pedidosH");
        pedidos_historico(cliente.cnpj).then(function(pedidos){
            painel.value = pedidos;
        })
    }
    else{
        alert("Faça login para utilizar este recurso.");
    }
}
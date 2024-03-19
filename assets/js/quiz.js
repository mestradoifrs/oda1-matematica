$(function (){

    // criar um timer. quando o timer acabar, precisa terminar o jogo e exibir o score.

    // Definindo o tempo inicial em segundos (1 minuto = 60 segundos)
    var tempoTotal = 0;
        
    function atualizarContador() {
        // Calculando minutos e segundos
        var minutos = Math.floor(tempoTotal / 60);
        var segundos = tempoTotal % 60;

        // Exibindo o contador na div com ID "contador"
        $('#contador').text(minutos.toString().padStart(2, "0") + ':' + segundos.toString().padStart(2, "0"));

        // Decrementando o tempo total
        tempoTotal--;

        // Verificando se o contador chegou a zero
        if (tempoTotal < 0) {
            clearInterval(intervalId); // Parando o contador
            callback(); // Executando a função de callback
        }
    }

    // Iniciando o contador
    var intervalId = ""

    $(".iniciar").click(function (){
        tempoTotal = 60;
    intervalId = setInterval(atualizarContador, 1000);
    $("#capa").addClass("d-none");
    $("#gameplay").removeClass("d-none");

     
    });
    $(".reiniciar").click(function (){

    $("#capa").removeClass("d-none");
    $("#scorefinal").addClass("d-none");

     
    });

    // Função de callback (substitua pelo seu código)
    function callback() {
        $("#gameplay").addClass("d-none"); // Exemplo de mensagem
        $("#scorefinal").removeClass("d-none"); // Exemplo de mensagem
        $("#score").text(pontuacao)
    }

    $("body").on("click", ".executar", function () {
        var valor = $("#equacao").text();
        var avalor = valor.replace("×", "*"); // Use a expressão regular /x/g para substituir todas as ocorrências
        var result = eval(avalor);
        if(result == $(this).text()){
            $(this).removeClass("btn-info");
            $(this).addClass("btn-success");
            pontuacao++;
        
        }else{
            $(this).removeClass("btn-info");
            $(this).addClass("btn-danger");

        }
        $("#resultados button").addClass("desativar")
        $("#proximo").removeClass("d-none")
    });

    $("body").on("click", "#proximo", function () {
        gerarEquacaoMultiplicacao();
        $(this).addClass("d-none")
    });

});
var pontuacao = 0;
var resultados = 0;
var arrayEmbaralhada = [];
function gerarEquacaoMultiplicacao() {
    const numero1 = Math.floor(Math.random() * 10) + 1; // Número aleatório de 1 a 10
    const numero2 = Math.floor(Math.random() * 10) + 1; // Número aleatório de 1 a 10
    const resultado = numero1 * numero2;

    const equacao = `${numero1} × ${numero2}`;
    resultados = resultado;
    // Inserir a equação na div com o ID "equacoes" usando jQuery
    $("#equacao").text(equacao);



// Receber o número fornecido pelo usuário
const numeroFornecido = parseInt(resultado);

// Gerar outros dois números aleatórios diferentes
let num_1, num_2;
do {
    num_1 = gerarNumeroAleatorio(1, 100); // Intervalo de 1 a 100 (ajuste conforme necessário)
    num_2 = gerarNumeroAleatorio(1, 100);
} while (num_1 === num_2 || num_1 === numeroFornecido || num_2 === numeroFornecido);


    const minhaArray = criarArrayComTresNumeros(num_1, num_2, resultado);
    arrayEmbaralhada = embaralharArray(minhaArray);
    gerarResultados(arrayEmbaralhada)
} 
// Chamar a função para gerar a equação
gerarEquacaoMultiplicacao();

// 
// Função para criar uma array com 3 números inteiros
function criarArrayComTresNumeros(num1, num2, num3) {
    return [num1, num2, num3];
}

// Função para embaralhar uma array
function embaralharArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]]; // Troca os elementos de posição
    }
    return arr;
}



function gerarResultados(array_){
    $("#resultados button").remove()
    var montar = "";
    array_.forEach(el => {
        montar += "<div class=\"col-4\"><button class=\"executar btn btn-info form-control\" type=\"button\">"+ el +"</button></div>";    
    })


    $("#resultados").html(montar);
}


 // Função para gerar um número aleatório entre min (inclusive) e max (inclusive)
 function gerarNumeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



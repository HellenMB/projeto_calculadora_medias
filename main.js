// Obtém referência ao formulário com ID "form-atividade"
const form = document.getElementById('form-atividade');

// Strings contendo elementos <img> para ícones de aprovação e reprovação
const imgAprovado = '<img src="./images/aprovado.png" alt="Emoji celebrando"/>';
const imgReprovado = '<img src="./images/reprovado.png" alt="Emoji decepcionado"/>';

// Arrays vazias para armazenar nomes de atividades e notas
const atividade = [];
const notas = [];

// Strings contendo elementos <span> para exibir resultados
const spanAprovado = '<span class="resultado aprovado">Aprovado</span>';
const spanReprovado = '<span class="resultado reprovado">Reprovado</span>';

// Solicita ao usuário a nota mínima e converte para número de ponto flutuante
const notaMinima = parseFloat(prompt("Digite a nota mínima: "));

// Variável para armazenar as linhas HTML da tabela
let linhas = '';

// Adiciona evento de submissão ao formulário
form.addEventListener('submit', function(e) {
  // Impede comportamento padrão do formulário
  e.preventDefault();

  // Chama as funções para adicionar linha, atualizar tabela e média final
  adicionaLinha();
  atualizaTabela();
  atualizaMediaFinal();
});

// Função para adicionar uma nova linha na tabela
function adicionaLinha() {
  // Obtém referências aos campos de entrada de nome e nota da atividade
  const inputNomeAtividade = document.getElementById('nome-atividade');
  const inputNotaAtividade = document.getElementById('nota-atividade');

  // Verifica se a atividade já foi inserida anteriormente
  if (atividade.includes(inputNomeAtividade.value)) {
    // Exibe alerta informando que a atividade já foi inserida
    alert(`A atividade: ${inputNomeAtividade.value} Já foi inserida`);
  } else { 
    // Adiciona o nome da atividade e a nota às respectivas arrays
    atividade.push(inputNomeAtividade.value);
    notas.push(parseFloat(inputNotaAtividade.value));

    // Cria uma nova linha HTML para a tabela
    let linha = '<tr>';
    linha += `<td>${inputNomeAtividade.value}</td>`; // Insere o nome da atividade na célula
    linha += `<td>${inputNotaAtividade.value}</td>`; // Insere a nota da atividade na célula
    // Insere o ícone de aprovação ou reprovação na célula, com base na nota
    linha += `<td>${inputNotaAtividade.value >= notaMinima ? imgAprovado : imgReprovado}</td>`;
    linha += '</tr>';

    // Adiciona a linha à variável linhas
    linhas += linha;
  }

  // Limpa os campos de entrada de nome e nota da atividade
  inputNomeAtividade.value = '';
  inputNotaAtividade.value = '';    
}

// Função para atualizar a tabela com as linhas adicionadas
function atualizaTabela() {
  // Obtém referência ao corpo da tabela
  const corpoTabela = document.querySelector('tbody');
  // Atualiza o conteúdo do corpo da tabela com as linhas
  corpoTabela.innerHTML = linhas;
}

// Função para atualizar a média final de acordo com as notas inseridas
function atualizaMediaFinal() {
  // Calcula a média final das notas
  const mediaFinal = calculaMediaFinal();

  // Atualiza a exibição da média final no documento HTML
  document.getElementById('media-final-valor').innerHTML = mediaFinal;
  // Exibe "Aprovado" ou "Reprovado" com base na média final e nota mínima
  document.getElementById('media-final-resultado').innerHTML = mediaFinal >= notaMinima ? spanAprovado : spanReprovado; 
}

// Função para calcular a média final das notas
function calculaMediaFinal() {
  let somaDasNotas = 0;

  // Percorre todas as notas e calcula a soma
  for (let i = 0; i < notas.length; i++) {
    somaDasNotas += notas[i];
  }
  
  // Retorna a média final dividindo a soma das notas pelo número
  return somaDasNotas / notas.length
};
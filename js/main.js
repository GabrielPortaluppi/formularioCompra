const form = document.querySelector('.formulario');
const array = JSON.parse(localStorage.getItem('itens')) ||[]
form.addEventListener("submit", (evento) => {
    evento.preventDefault()
    
    guardaEmail(evento)
})

function guardaEmail(evento){
    const firstName = evento.target.elements['firstName'];
    const lastName = evento.target.elements['lastName'];
    const emailAddress = evento.target.elements['emailAddress'];
    const password = evento.target.elements['password'];
    const elementoInput = {
        "firstName" : firstName.value,
        "lastName" : lastName.value,
        "emailAddress" : emailAddress.value,
        "password" : password.value
    }

    array.push(elementoInput);
    
    localStorage.setItem("itens", JSON.stringify(array));
}

const input = document.querySelectorAll(".input");
input.forEach(campo => {
    campo.addEventListener("blur", () => validacao(campo))
    campo.addEventListener("invalid", evento => evento.preventDefault)
})

const erros = [
    "valueMissing",
    " typeMismatch",
    " patternMismatch",
    "tooShort"
]

const mensagens = {
    nome: {
        valueMissing: "O campo de nome não pode estar vazio.",
        patternMismatch: "Por favor, preencha um nome válido.",
        tooShort: "Por favor, preencha um nome válido."
    },
    email: {
        valueMissing: "O campo de e-mail não pode estar vazio.",
        typeMismatch: "Por favor, preencha um email válido.",
        tooShort: "Por favor, preencha um e-mail válido."
    },}

function validacao(campo){
    let mensagem = ""
    erros.forEach(erro => {
        if(campo.validity[erro]){
            mensagem = mensagens[campo.name][erro]
            console.log(mensagem)
        }
    })

    const mensagemErro =  campo.parentNode.querySelector(".mensagem-erro");
    const validacampo = campo.checkValidity()
    if(!validacampo){
        mensagemErro.textContent = mensagem;
    }else{
        mensagemErro.textContent = "";
    }
}
//b7Validator é um objeto com varias funções
let b7Validator = {
    handleSubmit:(event)=>{
        event.preventDefault();
        let send = true; 

        let inputs = form.querySelectorAll('input');
        //limpando erros
        b7Validator.clearErros();

        //fazer loop em cada um dos campos para verifica-los individualmente
        for(let i=0; i<inputs.length; i++){
            let input = inputs[i];
            let check = b7Validator.checkInput(input); //funcao checkInput retorna boolean
            if(check !== true) {  // se não retornar true , significa que deu erro no campo
                send = false; // nao enviar formulário
                b7Validator.showError(input, check);
            }
        }

        if(send){
            form.submit();
        }
    },

    checkInput:(input) => {
        let rules = input.getAttribute('data-rules'); //verifica se tem o atributo data-rules
        if(rules !== null){ //significa que existe
            rules = rules.split('│');  // fazendo split para dividir as regras
            for (let k in rules){
                let rDetails = rules[k].split('=');
                switch(rDetails[0]) {
                    case 'required':
                        if(input.value == ''){
                            return 'Campo não pode ser vazio';
                        }
                    break;

                    case 'min':
                        if(input.value.length < rDetails[1]){
                            return 'Campo tem que ter pelo menos '+rDetails[1]+' caracteres';
                        }
                    break;

                    case 'email':
                        if(input.value != ''){
                            //fazendo expressão regular 
                            let regex = /^[a-zA-Z0-9][a-zA-Z0-9\._-]+@([a-zA-Z0-9\._-]+\.)[a-zA-Z-0-9]{2,3}$/;
                            if(!regex.test(input.value.toLowerCase())){
                                return 'E-mail inválido';
                            }
                        }
                    break;
                }   
            }
        }

    return true;
    },

    showError:(input,error) => {
        input.style.borderColor = 'red';
        let errorElement = document.createElement('div');
        errorElement.classList.add('error');
        errorElement.innerHTML = error;

        //adicionando o error depois do campo
        input.parentElement.insertBefore(errorElement, input.ElementSibling); 
    },

    clearErros:() => {
        let inputs  = form.querySelectorAll('input');
        for(i=0; i<inputs.length; i++){
            inputs[i].style = '';
        }

        let errorElements = document.querySelectorAll('.error');
        for(let i=0; errorElements.length; i++){
            errorElements[i].remove();
        }
    }


};

let form = document.querySelector('.b7validator'); 
//se é um validador, ele tem que se meter no meio do envio do formulário, ou seja:
form.addEventListener('submit', b7Validator.handleSubmit);
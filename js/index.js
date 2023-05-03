const LPLabel = document.querySelector('.legalPersonOption');
const LPTitle = document.querySelector('.legalPersonOption .typeFormBoxText');
const PPLabel = document.querySelector('.physicalPersonOption');
const PPTitle = document.querySelector(
  '.physicalPersonOption .typeFormBoxText',
);
const corporateReason = [...document.querySelectorAll('.corporateReason')];
const errorMsgList = [...document.querySelectorAll('.error-text')];
const corporateReasonGroup = [
  ...document.querySelectorAll('.corporateReasonGroup'),
];
const formBtn = document.querySelector('#submit-button');
corporateReason.forEach((e) => (e.style.display = 'none'));
// for (let i = 0; i < corporateReason.length; i++) {}

PPLabel.addEventListener('click', physicalPersonClick);

LPLabel.addEventListener('click', () => {
  corporateReason.forEach((e) => (e.style.display = 'flex'));
  // const recipientBox = document.querySelector('.partOne');
  // if (recipientBox.classList.contains('boxForNewFields'))
  //   document.querySelector('.boxForNewFields').remove();

  corporateFields();
  LPTitle.classList.add('selectedTitle');
  PPTitle.classList.remove('selectedTitle');
  LPLabel.classList.add('unselected');
  PPLabel.classList.remove('unselected');
  errorMsgList.forEach((e) => e.remove());
});

function physicalPersonClick() {
  const recipientBox = document.querySelector('.partOne');
  let boxForNewFields = document.querySelector('.boxForNewFields');
  if (boxForNewFields) {
    boxForNewFields.remove();
  }

  corporateReason.forEach((e) => (e.style.display = 'none'));
  corporateReasonGroup.forEach((e) => (e.style.display = 'none'));
  PPTitle.classList.add('selectedTitle');
  LPTitle.classList.remove('selectedTitle');
  PPLabel.classList.add('unselected');
  LPLabel.classList.remove('unselected');
  errorMsgList.forEach((e) => (e.innerHTML = ''));
}
function sendForm() {
  const form = document.querySelector('.form');

  function valitationFields() {
    let creditCardFields = document.querySelector('.formCreditCar');
    let valid = true;
    for (let erroText of form.querySelectorAll('.error-text')) {
      erroText.remove();
    }

    for (let field of form.querySelectorAll('.required')) {
      const label =
        field.previousElementSibling && field.previousElementSibling.innerText;

      if (!field.value) {
        label === null
          ? createError(field, `Inválido!`)
          : createError(
              field,
              `${label || 'Campo'} não poder estar em branco!`,
            );
        valid = false;
      }

      if (field.classList.contains('corporateName')) {
        if (!validateCorporateReason(field)) return valid;
      }

      if (field.classList.contains('cnpj')) {
        if (!validateCNPJ(field)) return valid;
      }

      if (field.classList.contains('stateRegistration')) {
        if (!validateStateRegistration(field)) return valid;
      }

      if (field.classList.contains('name')) {
        if (!validateName(field)) return valid;
      }

      if (field.classList.contains('email')) {
        if (!validateEmail(field)) return valid;
      }

      if (field.classList.contains('rg')) {
        if (!validateRG(field)) return valid;
      }

      if (field.classList.contains('cpf')) {
        if (!validateCPF(field)) return valid;
      }

      if (field.classList.contains('telefone')) {
        if (!validatePhoneNumber(field)) return valid;
      }

      if (field.classList.contains('formStateSelect')) {
        if (!validateSelects(field)) return valid;
      }

      if (field.classList.contains('formSchoolSelect')) {
        if (!validateSelects(field)) return valid;
      }

      if (field.classList.contains('inputRadio')) {
        if (!valedateInputRadio(field)) return valid;
      }

      if (creditCardFields) {
        for (let field of creditCardFields.querySelectorAll(
          '.requiredCreditCar',
        )) {
          if (field.classList.contains('numberCard')) {
            if (!validateNumberCard(field)) return valid;
          }
          if (field.classList.contains('cardSafeCode')) {
            if (!validateSecurityCode(field)) return valid;
          }
          // if (field.classList.contains('cardValidation')) {
          //   if (!validateCardValidation(field)) return valid;
          // }
        }
      }
    }
    return valid;
  }

  function validateCorporateReason(field) {
    const corporateReason = field.value;
    let valid = true;
    if (corporateReason.length < 6) {
      createError(field, 'Razão social precisa ter mais de 5 caracteres');
      valid = false;
    }
    return valid;
  }

  function validateStateRegistration(field) {
    const stateRegistration = field.value;
    const regex = /^[0-9.-]+$/;
    if (!regex.test(stateRegistration)) {
      createError(field, 'Deve conter apenas número');
      return false;
    }
    return true;
  }

  function validateCNPJ(field) {
    // let cnpjInput = document.getElementById('cnpj').value;
    let cnpjInput = field.value;
    let cnpj = cnpjInput.replace(/[^\d]+/g, ''); // Remove tudo o que não é dígito
    if (cnpj.length != 14) {
      createError(field, 'O CNPJ deve ter 14 digitos');
      return false; // O CNPJ deve ter 14 dígitos
    }
    // Verifica se todos os dígitos são iguais (ex.: 00000000000000)
    if (/^(\d)\1+$/.test(cnpj)) {
      createError(field, 'Não pode ser digitos repetidos');
      return false;
    }
    // Valida primeiro dígito verificador
    let soma = 0;
    let peso = 5;
    for (let i = 0; i < 12; i++) {
      soma += parseInt(cnpj.charAt(i)) * peso--;
      if (peso < 2) peso = 9;
    }
    let digito = 11 - (soma % 11);
    if (digito > 9) digito = 0;
    if (parseInt(cnpj.charAt(12)) != digito) {
      createError(field, 'Primiero digito verificador errado');
      return false;
    }
    // Valida segundo dígito verificador
    soma = 0;
    peso = 6;
    for (let i = 0; i < 13; i++) {
      soma += parseInt(cnpj.charAt(i)) * peso--;
      if (peso < 2) peso = 9;
    }
    digito = 11 - (soma % 11);
    if (digito > 9) digito = 0;
    if (parseInt(cnpj.charAt(13)) != digito) {
      createError(field, 'CNPJ inválido');
      return false;
    }
    const cnpjFormatado = cnpj.replace(
      /(\d{2})\.?(\d{3})\.?(\d{3})\/?(\d{4})\-?(\d{2})/,
      '$1.$2.$3/$4-$5',
    );
    document.getElementById('cnpj').value = cnpjFormatado;
    return true; // CNPJ válido
  }

  function validateName(field) {
    // let name = document.querySelector('.name').value;
    const corporateReason = field.value;
    let valid = true;
    const nameRegex = /^[a-zA-ZÀ-ÿ]+(([',. -][a-zA-ZÀ-ÿ ])?[a-zA-ZÀ-ÿ]*)*$/;
    if (corporateReason.length < 5 || !nameRegex.test(corporateReason)) {
      createError(field, 'Nome invalido.');
      valid = false;
      return false;
    }
    return true;
  }

  function validateEmail(field) {
    const email = field.value;
    let valid = true;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      createError(field, 'Email inválido');
      valid = false;
    }
    return true;
  }

  function validateRG(field) {
    // let rgInput = document.getElementById('rg').value;
    const rgInput = field.value;
    let rg = rgInput.replace(/\D/g, '');
    if (rg.length < 6) {
      createError(field, 'O RG deve ter mais de 6 dígitos');
      valid = false;
      return false;
    }
    const formattedValue = rg.replace(
      /^(\d{2})(\d{3})(\d{3})(\d{1})$/,
      '$1.$2.$3-$4',
    );
    document.getElementById('rg').value = formattedValue;
    return true;
  }

  function validateCPF(field) {
    const cpf = new ValidaCPF(field.value);
    if (!cpf.valida()) {
      createError(field, 'CPF inválido.');
      return false;
    }
    let cpfInput = document.getElementById('cpf').value;
    const regex = /^(\d{3})(\d{3})(\d{3})(\d{2})$/;
    const cpfFormatado = cpfInput.replace(regex, '$1.$2.$3-$4');
    document.getElementById('cpf').value = cpfFormatado;
    return true;
  }

  function validatePhoneNumber(field) {
    const phoneNumber = field.value.replace(/\D/g, ''); // Remove tudo que não é dígito
    if (/[^\d\s()-]/.test(field.value)) {
      // Verifica se há letras
      createError(field, 'Número inválido.');
      return false;
    }
    const ddd = phoneNumber.substring(0, 2);
    const bodyPhone = phoneNumber.substring(2, phoneNumber.length);
    let phoneFormated;
    if (bodyPhone.length === 9) {
      // Celular
      phoneFormated = bodyPhone.replace(/^(\d{5})(\d{4})/, '$1-$2');
    } else if (bodyPhone.length === 8) {
      // Telefone fixo
      phoneFormated = bodyPhone.replace(/^(\d{4})(\d{4})/, '$1-$2');
    } else {
      // Tamanho inválido
      createError(field, 'Número precisa conter de 8 a 9 dígitos + o DDD.');
      return false;
    }
    document.getElementById('telefone').value = `(${ddd}) ${phoneFormated}`;
    return true;
  }

  function validateSelects(field) {
    // const ufValue = ufSelect.value;
    // const poloValue = poloSelect.value;
    const ufValue = field.value;
    const poloValue = field.value;

    if (ufValue === '') {
      // createError(ufValue, 'Selecione o estado do Polo.');
      return false;
    }
    if (poloValue === '') {
      // createError(poloValue, 'Selecione a cidade do Polo.');
      return false;
    }

    return true;
  }

  function valedateInputRadio(field) {
    let isValid = false;
    const requiredRadios = document.querySelectorAll(
      'input[type="radio"].required',
    );
    requiredRadios.forEach((radio) => {
      if (radio.checked) {
        field.value;
        isValid = true;
      }
    });

    if (!isValid) {
      createError(field, 'Selecione uma das opções.');
      return false;
    }
    return true;
  }

  function validateNumberCard(field) {
    const numberInput = field.value;
    const onlyNumbers = numberInput.replace(/\D/g, '');

    // Verifica se o campo possui apenas números
    if (!/^\d+$/.test(onlyNumbers)) {
      createError(field, 'Número inválido.');
      return false;
    }

    if (numberInput.length < 12 || numberInput.length > 19) {
      createError(field, 'Precisa ter entre 13 e 19 dígitos');
      return false;
    }
    // Realiza a validação do número do cartão
    let sum = 0;
    let double = false;

    for (let i = onlyNumbers.length - 1; i >= 0; i--) {
      const digit = parseInt(onlyNumbers.charAt(i));

      if (double) {
        if (digit * 2 > 9) {
          sum += digit * 2 - 9;
        } else {
          sum += digit * 2;
        }
      } else {
        sum += digit;
      }

      double = !double;
    }
    // sum % 10 === 0;
    if (sum % 10 !== 0) {
      createError(field, 'Número inválido.');
      return false;
    }
    const regex = /(\d{4})(\d{4})(\d{4})(\d{4})/;
    const formattedNumber = onlyNumbers.replace(regex, '$1 $2 $3 $4');
    document.getElementById('numberCard').value = formattedNumber;

    return true;
  }

  function validateSecurityCode(field) {
    const securityCode = field.value;
    const cardNumber = document.getElementById('numberCard').value;

    const onlyNumbers = cardNumber.replace(/\s/g, '');

    console.log(onlyNumbers);

    // Verifica se o código de segurança possui 3 ou 4 dígitos
    if (!/^\d{3,4}$/.test(securityCode)) {
      createError(field, 'Número deve ter entre 3 e 4 dígitos.');
      return false;
    }
    /*
Parece que a validação do código de segurança do cartão não está passando, preciso dar continuidade a
partir daqui
*/
    // Verifica se o código de segurança corresponde aos últimos 3 ou 4 dígitos do número do cartão
    const lastDigits = onlyNumbers.slice(-4);
    if (lastDigits !== securityCode && lastDigits.slice(-3) !== securityCode) {
      createError(field, 'Código inválido.');
      return false;
    }

    return true;
  }

  //Create error mensages
  function createError(field, msg) {
    const span = document.createElement('span');
    span.innerHTML = msg;
    span.classList.add('error-text');
    field.insertAdjacentElement('afterend', span);
  }

  valitationFields();
}

//Search address
function searcheAddress(cep) {
  let cepInput = document.getElementById('cep');
  const xhr = new XMLHttpRequest();
  const url = 'https://viacep.com.br/ws/' + cep + '/json/';
  xhr.open('GET', url, true);

  xhr.onload = function () {
    if (xhr.readyState === xhr.DONE && xhr.status === 200) {
      const dados = JSON.parse(xhr.responseText);

      document.getElementById('address').value = dados.logradouro;
      document.getElementById('neighborhood').value = dados.bairro;
      document.getElementById('city').value = dados.localidade;
      document.getElementById('state').value = dados.uf;
    } else {
      const span = document.createElement('span');
      span.innerHTML = 'CEP Inválido!';
      span.classList.add('error-text');
      cepInput.insertAdjacentElement('afterend', span);
      return;
    }
  };

  xhr.send();
}

document.querySelector('.getAddressWithCep').addEventListener('click', () => {
  let cepInput = document.getElementById('cep');
  let cepLabel = document.querySelector('.cepLabel');
  let errorMsg = cepLabel.querySelector('.error-text');
  if (errorMsg) errorMsg.remove();

  const rawValue = cepInput.value.replace(/[^\d]/g, '');
  const formattedValue = rawValue.replace(/(\d{2})(\d{3})(\d{3})/, '$1.$2-$3');
  cepInput.value = formattedValue;

  if (cepInput.value.length <= 8) {
    const span = document.createElement('span');
    span.innerHTML = 'CEP Inválido!';
    span.classList.add('error-text');
    cepInput.insertAdjacentElement('afterend', span);
    return;
  }

  let cep = rawValue;
  searcheAddress(cep);
});

//Create corporate fields
function corporateFields() {
  let boxForNewFields = document.querySelector('.boxForNewFields');
  if (boxForNewFields) {
    boxForNewFields.remove();
  }
  let newFields = `<div class="corporateReasonGroup">
  <label for="corporateReason" class="corporateReason">Razão social</label>
  <input type="text" name="corporateReason" id="corporateReason" class="corporateReason required corporateName" placeholder="Digita a razão social*">
</div>
<div class="corporateReasonGroup"">
  <label for="fantasyName" class="corporateReason">Nome fantasia</label>
  <input type="text" name="fantasyName" id="fantasyName" class="corporateReason required" placeholder="Digite o nome fantasia*">
</div>

<div class="corporateReasonGroup"">
  <label for="cnpj" class="corporateReason">CNPJ</label>
  <input type="text" name="cnpj" id="cnpj" class="corporateReason required cnpj" placeholder="Digite o CNPJ*">
</div>
<div class="corporateReasonGroup">
  <label for="stateRegistration" class="corporateReason">Inscrição estadual</label>
  <input type="text" id="stateRegistration" class="corporateReason required stateRegistration" name="stateRegistration" placeholder="Digite a inscrição Estadual*">
</div>`;
  const recipientBox = document.querySelector('.partOne');
  boxForNewFields = document.createElement('div');

  boxForNewFields.classList.add('boxForNewFields');
  boxForNewFields.innerHTML = newFields;
  recipientBox.prepend(boxForNewFields);
}

function createCredtCardFilelds() {
  const typOfPayment = document.querySelector('.typOfPayment');
  let boxForNewFields = document.querySelector('.formCreditCar');
  if (boxForNewFields) {
    boxForNewFields.remove();
  }
  const recipientBox = document.querySelector('.partThreeFields');
  let newFields = `<input
  type="text"
  name="nameCard-lp"
  id="nameCard"
  placeholder="Nome no cartão"
  class="physicalPerson"
/>
<input
  type="text"
  name="numberCard-lp"
  id="numberCard"
  placeholder="Número do cartão*"
  class="physicalPerson requiredCreditCar numberCard"
  maxlength="19"
/>
<input
  type="text"
  name="cardSafeCode-lp"
  id="cardSafeCode"
  placeholder="Cod. Seg*"
  class="physicalPerson cardSafeCode requiredCreditCar"
/>
<input
  type="text"
  name="cardValidation-lp"
  id="cardValidation"
  placeholder="MM/AA"
  class="physicalPerson cardValidation requiredCreditCar"
/>`;
  boxForNewFields = document.createElement('div');
  boxForNewFields.classList.add('formCreditCar');
  boxForNewFields.innerHTML = newFields;
  typOfPayment.parentNode.insertBefore(
    boxForNewFields,
    document.querySelector('.captchaBox'),
  );
}

//Input radio events
function handlePaymentSelection() {
  const paymentOptions = document.querySelectorAll('input[name="payment"]');
  const creditCarBox = document.querySelector('.formCreditCar');
  let selectedOption;

  for (let i = 0; i < paymentOptions.length; i++) {
    if (paymentOptions[i].checked) {
      selectedOption = paymentOptions[i].value;
      break;
    }
  }
  switch (selectedOption) {
    case 'creditCar':
      // creditCarBox.style.display = 'flex';
      createCredtCardFilelds();
      break;
    case 'pix':
      if (creditCarBox) creditCarBox.remove();
      break;
    case 'ticket':
      if (creditCarBox) creditCarBox.remove();
      break;
    default:
      break;
  }
}

//Validate credit card
// function validateCreditCardFields(field) {
//   // const numberCard = document.getElementById('numberCard');
//   // const cardSafeCode = document.getElementById('cardSafeCode');
//   // const cardValidation = document.getElementById('cardValidation');
//   const numberCard = field.value;
//   const cardSafeCode = field.value;
//   const cardValidation = field.value;
//   // Validando o número do cartão
//   if (!/^\d+$/.test(numberCard.value)) {
//     createError(field, 'Número inválido.');
//     return false;
//   }

//   // Validando o código de segurança do cartão
//   if (!/^\d{3}$/.test(cardSafeCode.value)) {
//     createError(field, 'Código inválido.');
//     return false;
//   }

//   // Validando a validade do cartão
//   const cardValidationRegex = /^(0[1-9]|1[0-2])\/(\d{2})$/;
//   if (!cardValidationRegex.test(cardValidation.value)) {
//     createError(field, 'Data inválida. Digite no formato MM/AA.');
//     return false;
//   }

//   // Todos os campos obrigatórios foram validados
//   return true;
// }

// Add events in the input radio
const paymentInputs = document.querySelectorAll('input[name="payment"]');
for (let i = 0; i < paymentInputs.length; i++) {
  paymentInputs[i].addEventListener('click', handlePaymentSelection);
}

formBtn.addEventListener('click', sendForm);
physicalPersonClick();

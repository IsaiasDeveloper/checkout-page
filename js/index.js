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
corporateReason.forEach((e) => (e.style.display = 'none'));
for (let i = 0; i < corporateReason.length; i++) {}

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

class formValidation {
  constructor() {
    this.form = document.querySelector('.form');
    this.formEvents();
  }

  formEvents() {
    this.form.addEventListener('submit', (e) => {
      this.handleSibmit(e);
    });
  }

  handleSibmit(e) {
    e.preventDefault();
    const validateFields = this.valitationFields();

    if (validateFields) this.form.submit();
  }

  valitationFields() {
    let valid = true;
    for (let erroText of this.form.querySelectorAll('.error-text')) {
      erroText.remove();
    }

    for (let field of this.form.querySelectorAll('.required')) {
      const label =
        field.previousElementSibling && field.previousElementSibling.innerText;

      if (!field.value) {
        if (label === null) {
          this.createError(field, `Inválido!`);
        } else {
          this.createError(field, `${label} não poder estar em branco!`);
        }

        valid = false;
      }

      // if (field.classList.contains('corporateName')) {
      //   if (!this.validateCorporateReason(field)) return valid;
      // }

      if (field.classList.contains('cnpj')) {
        if (!this.validarCNPJ(field)) return valid;
      }

      // if (field.classList.contains('name')) {
      //   if (!this.validateName(field)) return valid;
      // }

      if (field.classList.contains('cpf')) {
        if (!this.validaCPF(field)) return valid;
      }

      if (field.classList.contains('rg')) {
        if (!this.validateRG(field)) return valid;
      }
    }

    return valid;
  }
  // validateCorporateReason(field) {
  //   const corporateReason = field.value;
  //   let valid = true;
  //   if (corporateReason.length < 6) {
  //     this.createError(field, 'Razão social precisa ter mais de 5 caracteres');
  //     valid = false;
  //   }
  //   // return valid;
  // }

  // validateName(field) {
  //   // let name = document.querySelector('.name').value;
  //   const corporateReason = field.value;
  //   let valid = true;
  //   const nameRegex = /^[a-zA-ZÀ-ÿ]+(([',. -][a-zA-ZÀ-ÿ ])?[a-zA-ZÀ-ÿ]*)*$/;
  //   if (name.length < 5 || !nameRegex.test(name)) {
  //     this.createError(field, 'Nome invalido.');
  //     valid = false;
  //   }
  // }

  validateRG(field) {
    let rgInput = document.getElementById('rg').value;
    let rg = rgInput.replace(/\D/g, '');
    if (rg.length < 6) {
      this.createError(field, 'O RG deve ter mais de 6 dígitos');
      return false;
    }
    const formattedValue = rg.replace(
      /^(\d{2})(\d{3})(\d{3})(\d{1})$/,
      '$1.$2.$3-$4',
    );
    document.getElementById('rg').value = formattedValue;
    return true;
  }

  validaCPF(field) {
    const cpf = new ValidaCPF(field.value);
    if (!cpf.valida()) {
      this.createError(field, 'CPF inválido.');
      return false;
    }
  }

  validarCNPJ(field) {
    let cnpjInput = document.getElementById('cnpj').value;

    let cnpj = cnpjInput.replace(/[^\d]+/g, ''); // Remove tudo o que não é dígito
    if (cnpj.length != 14) {
      this.createError(field, 'O CNPJ deve ter 14 digitos');
      return false; // O CNPJ deve ter 14 dígitos
    }
    // Verifica se todos os dígitos são iguais (ex.: 00000000000000)
    if (/^(\d)\1+$/.test(cnpj)) {
      this.createError(field, 'Não pode ser digitos repetidos');
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
      this.createError(field, 'Primiero digito verificador errado');
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
      this.createError(field, 'CNPJ inválido');
      return false;
    }
    return true; // CNPJ válido
  }

  createError(field, msg) {
    const span = document.createElement('span');
    span.innerHTML = msg;
    span.classList.add('error-text');
    field.insertAdjacentElement('afterend', span);
  }
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
//Validate RG

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
  <input type="text" id="stateRegistration" class="corporateReason required" name="stateRegistration" placeholder="Digite a inscrição Estadual*">
</div>`;
  const recipientBox = document.querySelector('.partOne');
  boxForNewFields = document.createElement('div');

  boxForNewFields.classList.add('boxForNewFields');
  boxForNewFields.innerHTML = newFields;
  recipientBox.prepend(boxForNewFields);
}

const validate = new formValidation();

physicalPersonClick();

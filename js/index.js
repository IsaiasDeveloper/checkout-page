$(document).ready(function () {
  // Esconder campos de Pessoa Jurídica
  $('.corporateReason').hide();
  $('.legalPersonOption .typeFormBoxText').addClass('selectedTitle');
  $('.legalPersonOption').addClass('unselected').removeClass('selected');

  // Mostrar campos correspondentes ao tipo de pessoa selecionado
  $('.physicalPersonOption').click(function () {
    $('.physicalPerson').show();
    $('.corporateReason').show();
    $('.legalPersonOption').addClass('selected').removeClass('unselected');
    $('.physicalPersonOption').addClass('unselected').removeClass('selected');
    $('.physicalPersonOption .typeFormBoxText').addClass('selectedTitle');
    $('.legalPersonOption .typeFormBoxText').removeClass('selectedTitle');
  });

  $('.legalPersonOption').click(function () {
    $('.corporateReason').hide();
    $('.physicalPerson').show();
    $('.physicalPersonOption').addClass('selected').removeClass('unselected');
    $('.legalPersonOption').addClass('unselected').removeClass('selected');
    $('.legalPersonOption .typeFormBoxText').addClass('selectedTitle');
    $('.physicalPersonOption .typeFormBoxText').removeClass('selectedTitle');
  });

  // Validar formulário ao ser enviado
  $('form').submit(function (event) {
    if ($('.physicalPersonOption').hasClass('selected')) {
      // Validar campos de Pessoa Física
      if (
        !$('#name').val() ||
        !$('#cpf').val() ||
        !$('#email').val() ||
        !$('#rg').val() ||
        !$('#telefone').val()
      ) {
        event.preventDefault();
        alert('Por favor, preencha todos os campos obrigatórios.');
      }
    } else if ($('.legalPersonOption').hasClass('selected')) {
      // Validar campos de Pessoa Jurídica
      if (
        !$('#corporateReason').val() ||
        !$('#cnpj').val() ||
        !$('#stateRegistration').val() ||
        !$('#fantasyName').val()
      ) {
        event.preventDefault();
        alert('Por favor, preencha todos os campos obrigatórios.');
      }
    }
  });

  //Search address
  // Função para buscar os dados do CEP
  function searcheAddress(cep) {
    // Faz uma requisição AJAX para o serviço ViaCEP
    $.ajax({
      url: 'https://viacep.com.br/ws/' + cep + '/json/',
      type: 'GET',
      dataType: 'json',
      success: function (dados) {
        // Preenche os campos do formulário com os dados do CEP
        $('#address').val(dados.logradouro);
        $('#neighborhood').val(dados.bairro);
        $('#city').val(dados.localidade);
        $('#state').val(dados.uf);
      },
      error: function () {
        alert('Não foi possível buscar os dados do CEP.');
      },
    });
  }

  // Evento de mudança do campo CEP
  $('#cep').change(function () {
    var cep = $(this).val().replace(/\D/g, '');
    if (cep.length == 8) {
      searcheAddress(cep);
    } else {
      alert('CEP inválido.');
    }
  });

  // Adiciona evento de clique na classe "getAddressWithCep"
  $('.getAddressWithCep').click(function () {
    var cep = $('#cep').val(); // obtém o valor do campo de CEP
    searcheAddress(cep); // chama a função que busca o endereço
  });

  //Validation form
  function validateFields() {
    var isValid = true;

    if ($('.physicalPersonOption').hasClass('selected')) {
      // Validar campos de Pessoa Física
      if (
        !$('#name').val() ||
        !$('#cpf').val() ||
        !$('#email').val() ||
        !$('#rg').val() ||
        !$('#telefone').val()
      ) {
        // Exibe mensagem de erro ao usuário
        $('.pessoa-fisica input[required]').each(function () {
          if (!$(this).val()) {
            $(this).addClass('invalid');
          }
        });

        isValid = false;
      }
    } else if ($('.legalPersonOption').hasClass('selected')) {
      // Validar campos de Pessoa Jurídica
      if (
        !$('#corporateReason').val() ||
        !$('#cnpj').val() ||
        !$('#stateRegistration').val() ||
        !$('#fantasyName').val()
      ) {
        // Exibe mensagem de erro ao usuário
        $('.pessoa-juridica input[required]').each(function () {
          if (!$(this).val()) {
            $(this).addClass('invalid');
          }
        });

        isValid = false;
      }
    }

    return isValid;
  }

  //Send button
  // Validar formulário ao ser enviado
  $('#submit-button').click(function (event) {
    if ($('.physicalPersonOption').hasClass('selected')) {
      // Validar campos de Pessoa Física
      if (
        !$('#name').val() ||
        !$('#cpf').val() ||
        !$('#email').val() ||
        !$('#rg').val() ||
        !$('#telefone').val() ||
        !$('#cep').val() ||
        !$('#address').val() ||
        !$('#number').val() ||
        !$('#neighborhood').val() ||
        !$('#state').val() ||
        !$('#city').val()
      ) {
        event.preventDefault();
        $('.form-field:invalid').addClass('invalid-field');
        $('#name').css('border-color', 'red').addClass('form-field');
        $('#cpf').css('border-color', 'red').addClass('form-field');
        $('#email').css('border-color', 'red').addClass('form-field');
        $('#rg').css('border-color', 'red').addClass('form-field');
        $('#telefone').css('border-color', 'red').addClass('form-field');
        $('#cep').css('border-color', 'red').addClass('form-field');
        $('#address').css('border-color', 'red').addClass('form-field');
        $('#number').css('border-color', 'red').addClass('form-field');
        $('#neighborhood').css('border-color', 'red').addClass('form-field');
        $('#state').css('border-color', 'red').addClass('form-field');
        $('#city').css('border-color', 'red').addClass('form-field');
      } else {
        $('.form-field').each(function () {
          if ($(this).val()) {
            $(this).css('border-color', '');
          }
        });
      }
    } else if ($('.legalPersonOption').hasClass('selected')) {
      // Validar campos de Pessoa Jurídica
      if (
        !$('#corporateReason').val() ||
        !$('#cnpj').val() ||
        !$('#stateRegistration').val() ||
        !$('#fantasyName').val()
      ) {
        event.preventDefault();
        $('.form-field:invalid').addClass('invalid-field');
        $('#corporateReason').css('border-color', 'red').addClass('form-field');
        $('#cnpj').css('border-color', 'red').addClass('form-field');
        $('#stateRegistration')
          .css('border-color', 'red')
          .addClass('form-field');
        $('#fantasyName').css('border-color', 'red').addClass('form-field');
      } else {
        $('.form-field').each(function () {
          if ($(this).val()) {
            $(this).css('border-color', '');
          }
        });
      }
    }
  });

  // Validar campos ao perder o foco
  $(
    '#name, #cpf, #email, #rg, #telefone, #corporateReason, #cnpj, #stateRegistration, #fantasyName, #cep'
  ).blur(function () {
    validateFields($(this));
  });

  //Change validation card
  $('#cardValidation').on('blur', function () {
    var data = $(this).val();
    var regex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/; // Expressão regular para validação da data

    if (!regex.test(data)) {
      $(this).css('border-color', 'red');
    } else {
      $(this).css('border-color', '');
    }
  });
});

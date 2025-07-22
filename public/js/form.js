const form = document.querySelector('#form')
const formSubmit = document.querySelector('#form__submit')
const phoneInputs = document.querySelectorAll('.input__phone');

console.log('Working')

  // Для каждого элемента добавляем обработчик события keydown
  phoneInputs.forEach(phoneInput => {
    phoneInput.addEventListener('keydown', function(e) {
      inputphone(e, this); // Используем 'this' для передачи текущего элемента
    });
  });

  // Функция маски для телефона
  function inputphone(e, phone) {
    function stop(evt) {
      evt.preventDefault();
    }

    let key = e.key,
      v = phone.value;
    not = key.replace(/([0-9])/, 1);

    if (not == 1 || 'Backspace' === not) {
      if ('Backspace' != not) {
        if (v.length < 3 || v === '') {
          phone.value = '+7 (';
        }
        if (v.length === 7) {
          phone.value = v + ') ';
        }
        if (v.length === 12) {
          phone.value = v + '-';
        }
        if (v.length === 15) {
          phone.value = v + '-';
        }
      }
    } else {
      stop(e);
    }
  }



form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const data = {};
    const formData = new FormData(form);
    formData.forEach((value, key) => {
        data[key] = value.trim();
    });



    try {
        const response = await fetch('/feedback', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)

        });
        if (response.ok) {
            alert('success')
        } else {
            const result = await response.json();
            alert(result.message || 'Ошибка при отправке формы');
        }
    } catch (error) {
        alert('Ошибка соединения с сервером');
        console.error(error);
    }

})
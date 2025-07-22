const React = require("react");
function Form({ users }) {
  return (
    <>
        <form id="form">
            <input type="text" name="name" placeholder="Ваше имя" />
            <input name="phone" type="text" placeholder="Номер телефона" className="input__phone" maxLength={18} required />
            <button type="submit" id="form__submit">Оправить</button>
        </form>

        <script src="/js/form.js"></script>
    </>

  );
}
module.exports = Form;

const React = require("react");
function Form({ users }) {
  return (
    <>
        <h2 className="text-2xl py-[20px]">Оставить заявку</h2>
        <form id="form" className="flex flex-col max-w-[400px] gap-2">
            <input className="px-5 py-2 border-black border-[1px] border-solid rounded-xl" type="text" name="name" placeholder="Ваше имя" />
            <input className="px-5 py-2 input__phone border-black border-[1px] border-solid rounded-xl" name="phone" type="text" placeholder="Номер телефона"  maxLength={18} required />
            <button type="submit" id="form__submit" className="bg-black text-white px-5 py-2 rounded-xl cursor-pointer">Оправить</button>
        </form>

        <script src="/js/form.js"></script>
    </>

  );
}
module.exports = Form;

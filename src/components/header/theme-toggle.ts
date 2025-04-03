import { Toggle } from "../ui/switch";

export default class ThemeToggle extends Toggle {
	constructor() {
		super();
    // показано для примера, проще было изменить родительский класс чтобы конструктор принимал и сетил колбэк и тогда не пришлось бы создавать еще один класс поверх него
		this.onclick = () =>
			(document.body.className = this.isToggled ? "" : "dark");
	}
}

import { Base } from "../../base";
import { createElement } from "../../helpers";
import css from "./switch.module.css";

export class Toggle extends Base {
	// дополним нужными полями
	#slider: HTMLLabelElement;
	#checkbox: HTMLInputElement;
	#onclick: null | (() => void) = null;

	constructor() {
		super("div", { className: css.wrapper });
		this.#checkbox = createElement("input", {
			className: css.switch,
			type: "checkbox",
			id: "switch",
		});
		this.#slider = createElement("label", {
			htmlFor: "switch",
			className: css.slider,
		});
		this.addElementChildren(this.#checkbox, this.#slider);
	}
	// расширим базовый класс специфичными методами
	get isToggled() {
		return this.#checkbox.checked;
	}

	get onclick() {
		return this.#onclick;
	}
	set onclick(fn: null | (() => void)) {
		this.#onclick = fn;
		this.#slider.onclick = fn;
	}
}
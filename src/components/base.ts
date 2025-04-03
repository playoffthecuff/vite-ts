import { type Tag, createElement } from "./helpers";

export abstract class Base<T extends Tag = "div"> {
	// абстрактный класс с базовыми методами
	#el;
	#children: Base<Tag>[] = [];

	constructor(
		tag: T,
		props?: Partial<HTMLElementTagNameMap[T]>,
		children?: Base<Tag>[],
	) {
		this.#el = createElement(tag, props);
		if (children?.length) this.addChildren(children);
	}

	get element() {
		return this.#el;
	}

	set text(t: string) {
		this.#el.textContent = t;
	}

	addChild(c: Base<Tag>) {
		this.#children.push(c);
		this.#el.append(c.element);
	}

	addChildren(c: Base<Tag>[]) {
		c.forEach((c) => this.#children.push(c));
	}

	addElementChild(el: HTMLElement | SVGSVGElement) {
		this.#el.append(el);
	}

	addElementChildren(...el: (HTMLElement | SVGSVGElement)[]) {
		this.#el.append(...el);
	}

	removeChildren() {
		this.#el.replaceChildren();
		this.#children.length = 0;
	}

	destroy() {
		this.removeChildren();
		this.#el.remove();
	}
}

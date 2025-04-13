export type Tag = keyof HTMLElementTagNameMap;

export const createElement = <T extends Tag>(
	tag: T,
	props?: Partial<HTMLElementTagNameMap[T]>,
): HTMLElementTagNameMap[T] =>
	Object.assign(document.createElement(tag), props); // функция создаёт элемент с типом зависящем от tag и опциональными свойствами для этого типа

export const createParentElement = <T extends Tag>(
	tag: T,
	props?: Partial<HTMLElementTagNameMap[T]>,
	children?: (HTMLElement | SVGSVGElement)[],
): HTMLElementTagNameMap[T] => {
	const el = createElement(tag, props);
	if (children?.length) el.append(...children);
	return el;
}; // тоже самое, родительский элемент с детьми

// export function div(...children: (HTMLElement | SVGSVGElement)[]): HTMLDivElement;
// export function div(
// 	props: Partial<HTMLDivElement> | undefined,
// 	...children: (HTMLElement | SVGSVGElement)[]
// ): HTMLDivElement;
// export function div(
// 	props?: Partial<HTMLDivElement> | HTMLElement | SVGSVGElement,
// 	...children: (HTMLElement | SVGSVGElement)[]
// ): HTMLDivElement {
// 	if (props instanceof HTMLElement || props instanceof SVGSVGElement) {
// 		return createParentElement("div", undefined, [props, ...children]);
// 	}
// 	return createParentElement("div", props, children);
// }
// чтобы не писать такие перегрузки для использования одной функции с пропсами и без сделаем фабрику через as :)

export const createElementFactory =
	<T extends Tag>(tag: T) =>
	(
		...args: (Partial<HTMLElementTagNameMap[T]> | HTMLElement | SVGSVGElement)[]
	): HTMLElementTagNameMap[T] => {
		if (args[0] instanceof HTMLElement || args[0] instanceof SVGSVGElement) {
			return createParentElement(
				tag,
				undefined,
				args as (HTMLElement | SVGSVGElement)[],
			);
		}
		const [props, ...children] = args as [
			Partial<HTMLElementTagNameMap[T]> | undefined,
			...(HTMLElement | SVGSVGElement)[],
		];
		return createParentElement(tag, props, children);
	}; // фабрика функций создания html элементов, с поддержкой дочерних svg и опциональными свойствами

export const a = createElementFactory("a");
export const article = createElementFactory("article");
export const button = createElementFactory("button");
export const div = createElementFactory("div");
export const header = createElementFactory("header");
export const hr = createElementFactory("hr");
export const li = createElementFactory("li");
export const nav = createElementFactory("nav");
export const span = createElementFactory("span");
export const ul = createElementFactory("ul"); // насыпем нужных тегов
export const h1 = createElementFactory("h1");

export const createSvgElement = (
	svg: string,
	width = 24,
	height = 24,
	className?: string,
) => {
	const el = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	el.setAttribute("width", String(width));
	el.setAttribute("height", String(height));
	el.insertAdjacentHTML("beforeend", svg);
	if (className) el.classList.add(className);
	el.setAttribute("viewBox", "0 0 16 16");
	return el;
}; // создание инлайновых свг

export const sanitizeHtml = (html: string) =>
	html.replace(/<script\b[^<]*>.*?<\/script>/gi, ""); // очистка html строк от скриптов

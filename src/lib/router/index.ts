import { a, div } from "../../components/helpers";

export type Guard = () => boolean | string; // тип для функции которая предотвращает переход на маршрут (например если пользователь не авторизован), если возврат булевый, то будет использоваться как запрет/разрешение, а если строковый, то будет перенаправлять юзера на другой маршрут (например он идёт в профиль будучи не авторизованым, а мы его перекидываем на логин)

interface Route {
	element: HTMLElement;
	guard?: Guard;
}

interface RouterConfig {
	[key: string]: Route;
	"*": Route; // делаем обязательный роут * - fallback для страницы "Не найдено"
}

declare global {
	// расширим интерфейс карты событий окна из lib.dom.ts чтобы тс не выносил мозг при подписке на кастомное событие
	interface WindowEventMap {
		navigate: CustomEvent<{ path: string }>;
	}
}

class Router {
	#element: HTMLElement | null = null;
	#outlet: HTMLDivElement = div();
	#path = "";
	#config: RouterConfig | null = null;
	static #instance: Router | null = null;
	constructor(config: RouterConfig) {
		this.#config = config;
		this.fixPath();
		this.render(this.getHash());
	}

	fixPath() {
		if (!window.location.hash) window.location.hash = "#/";
	}

	getHash = () => location.hash.slice(1);

	listen() {
		if (!window.onhashchange)
			window.onhashchange = () => {
				this.fixPath();
				this.navigate(this.getHash());
			};
	}

	navigate(path: string) {
		if (path === this.#path) return;
		const route = this.#config?.[path];  // ищем роут в нашем конфиге
		if (!route) return this.render(path); // если нет выходим и рендерим несуществующий путь - отрендерится нат фаунд
		const guard = route?.guard; // смотрим есть ли гард
		let guardResult: string | boolean = true; // по умолчанию можно ходить на маршрут
		if (guard) guardResult = guard();
		if (guardResult === true) { // если булево разрешение то сохраняем путь, рендерим страничку и выходим
			console.log("navigate to", path);
			this.#path = path;
			return this.render(path);
		}
		if (typeof guardResult === "string") { // если же гард нам вернул строку значит это путь для редиректа
			console.log("redirect to", guardResult);
			window.location.hash = guardResult // мутируем хэш на значение редиректа, путь будет сохраняться в результате вызова навигейт который дернёт слушатель окна и для которого не будет гарда или который вернёт истину
			return; // и выходим
		}

		window.location.hash = this.#path; // если успеха выше не будет значит надо остаться на прошлом адресе
	}

	render(path: string) {
		if (!this.#config) return;
		this.#element =
			path in this.#config ? this.#config[path].element : this.#config['*'].element;
		this.#outlet?.replaceChildren();
		this.#outlet?.append(this.#element);
	}

	get path() {
		return this.#path;
	}

	get outlet() {
		return this.#outlet;
	}

	static create(config: RouterConfig) {
		if (!Router.#instance) return new Router(config); // делаем синглтон
		return Router.#instance;
	}
}

export const createRouter = Router.create; // укорачиваем (обесточиваем :-) )

// делаем хитрожопую ссылку
export function link(props: Partial<HTMLElementTagNameMap["a"]>, ...children: (HTMLElement | SVGSVGElement)[]) {
	const link = a(props, ...children);
	link.addEventListener("click", (e) => {
		e.preventDefault();
		let path = link.href.split("/").at(-1); // разрезаем полный артибут href ссылки по слэшам и берём самый последний кусок - пришлось включить es2022 в конфиге тс для поддержки Array.prototype.at (таргет тоже повысил чтобы не полифилился)
		if (path) path = `/${path}`; // если что-то есть дописываем слэш который мы затёрли когда разрезали ссылку
		path ??= "404"; // если не нашлось пойдём на заведомо несуществующий роут чтобы отрисовать нат фаунд
		window.location.hash = path; // в идеале здесь нужно было использовать конструктор new URL(link.href) и оттуда брать нужные поля, но из-за того что у нас есть хак с мутированием адреса в fixPath, это не даст профит. Зато получаем чистые ссылки без решёток
	});
	return link;
}

import { a, li, nav, ul } from "../helpers";

export interface Link {
	href: string;
	text: string;
	blank?: boolean;
}

// пример реализации статичного компонента который мапит массив ссылок в меню nav -> ul -> ...(li->a)[] и может быть стилизован/настроен через props
export const navigation = (links: Link[], props: Partial<HTMLElement>) =>
	nav(
		props,
		ul(
			...links.map(({ href, text, blank }) =>
				li(a({ href, text, target: blank ? "_blank" : "_self" })),
			),
		),
	);

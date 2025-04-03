import { a, createElement, div } from "../helpers";
import logo from "../ui/logo";
import { type Link, navigation } from "../ui/navigation";
import css from "./footer.module.css";

const navLinks1: Link[] = [
	{ href: "https://1.1/", text: "Consectetur" },
	{ href: "https://1.2/", text: "Ipsum" },
	{ href: "https://1.3/", text: "Dolor" },
	{ href: "https://1.4/", text: "Sit amet" },
	{ href: "https://1.5/", text: "Lorem" },
];
const navLinks2: Link[] = [
	{ href: "https://2.1/", text: "Adipisicing" },
	{ href: "https://2.2/", text: "Elit" },
	{ href: "https://2.3/", text: "Minima" },
	{ href: "https://2.4/", text: "Autem" },
];

const navLinks3: Link[] = [
	{ href: "https://3.1/", text: "Magnam" },
	{ href: "https://3.2/", text: "Doloremque" },
	{ href: "https://3.3/", text: "Quidem" },
	{ href: "https://3.4/", text: "Distinctio" },
	{ href: "https://3.5/", text: "Et cumque" },
	{ href: "https://3.6/", text: "Iure nulla" },
];

const footer = createElement("footer", { className: css.footer }); // показано для примера, можно было сразу создать функцию footer фабрикой и наполнить коллбеками как сделано ниже для div
footer.append(
	div(
		{ className: css.wrapper },
		logo(48, 48, { className: css.social }),
		div({ className: css.nav }, navigation(navLinks1, { className: css.nav })),
		div({ className: css.nav }, navigation(navLinks2, { className: css.nav })),
		div({ className: css.nav }, navigation(navLinks3, { className: css.nav })),
		div(
			{ className: css.about },
			div(
				{ className: css.cr, textContent: "© 2025" },
				a({
					href: "https://github.com/playoffthecuff/",
					text: "playoffthecuff",
				}),
			),
		),
	),
);

export default footer;

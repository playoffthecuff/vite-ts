import { Base } from "../base";
import { div } from "../helpers";
import logo from "../ui/logo";
import { type Link, navigation } from "../ui/navigation";
import ThemeToggle from "./theme-toggle";
import css from "./header.module.css";
import { link } from "../../lib/router";

const navLinks: Link[] = [
	{ href: "./first", text: "First" },
	{ href: "./second", text: "Second" },
	{ href: "./third", text: "Third" },
	{ href: "./fourth", text: "Fourth" },
];

const SCROLL_TO_HIDE = 250;
export default class Header extends Base<"header"> {
	constructor() {
		super("header", { className: css.header });
		let relativeOpacity = SCROLL_TO_HIDE;
		let scroll = 0;
		window.onscroll = () => { // т.к. хэдер живёт вместе приложением, то отписка не нужна
			const dy = window.scrollY - scroll;
			scroll = window.scrollY;
			relativeOpacity = Math.min(Math.max(relativeOpacity - dy, 0), SCROLL_TO_HIDE);
			const opacity = relativeOpacity / SCROLL_TO_HIDE;
			this.element.style.pointerEvents = opacity > 0.5 ? "all" : "none";
			this.element.style.opacity = String(opacity);
		}
		const themeToggler = new ThemeToggle();
		const wrapper = div(
			{ className: css.wrapper },
			link({href: './'}, logo(24, 24, { className: css.logo })), // переделал лого в ссылку чтобы протестить корневой роут
			navigation(navLinks, { className: css.navigation }),
			themeToggler.element,
		);
		this.addElementChild(wrapper);
	}
}

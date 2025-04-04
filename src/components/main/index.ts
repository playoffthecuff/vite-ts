import { Base } from "../base";
import firstArticle from "./first-article";
import css from "./main.module.css";

export default class Main extends Base<"main"> {
	constructor() {
		super("main", {
			className: css.main,
		});
		this.addStaticMarkup(
			`<div class='reverse'><h1 class="${css.heading}">Lorem ipsum dolor sit, amet consectetur adipisicing elit.</h1></div>`,
		);
		this.addElementChild(firstArticle);
	}
}

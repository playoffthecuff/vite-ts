import { emit } from "../../lib/utils/event-bus";
import { Base } from "../base";
import Chat from "../chat";
import { button } from "../helpers";
import css from "./third.module.css";

export default class ThirdPage extends Base<"main"> {
	constructor() {
		super("main", {
			className: css.main,
		});
		this.addStaticMarkup(
			`<div class='reverse'><h1 class="${css.heading}">Welcome to Third Page</h1></div>`,
		);
		const button1 = button({ textContent: "paint footer red" });
		button1.onclick = () => emit("paint:footer", "red");
		const button2 = button({ textContent: "paint footer blue" });
		button2.onclick = () => emit("paint:footer", "blue");
		this.addElementChildren(button1, button2);
		this.addChild(new Chat())
	}
}

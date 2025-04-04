import { Base } from "../base";
import type { Tab } from "../ui/tabs";
import Tabs from "../ui/tabs";
import firstArticle from "./first-article";
import css from "./main.module.css";
import SecondArticle from "./second-article";

const tabs: Tab[] = [
	{name: "first", element: firstArticle},
	{name: "second", element: new SecondArticle().element},
	{name: "third", element: new SecondArticle().element},
	{name: "fourth", element: new SecondArticle().element},
]
export default class Main extends Base<"main"> {
	constructor() {
		super("main", {
			className: css.main,
		});
		this.addStaticMarkup(
			`<div class='reverse'><h1 class="${css.heading}">Lorem ipsum dolor sit, amet consectetur adipisicing elit.</h1></div>`,
		);
		this.addChild(new Tabs(tabs));
	}
}

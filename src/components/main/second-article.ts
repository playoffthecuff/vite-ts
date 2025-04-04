import { Base } from "../base";
import css from "./article.module.css";

// чтобы использовать статью несколько раз в приложении перепишем first-article в компонент
export default class SecondArticle extends Base<"article"> {
	constructor() {
		super("article", { className: css.article });
		this.addStaticMarkup(
			"<h1>The article under construction.<h1>",
		);
	}
}


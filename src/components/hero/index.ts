import { Base } from "../base";
import { createElement } from "../helpers";
import css from "./hero.module.css";
import imgSrc from "./sunglassed_cat.jpg"; // импорт статических ресурсов как ссылки https://vite.dev/guide/assets.html#static-asset-handling

export class Hero extends Base<"section"> {
	constructor() {
		super("section", { className: css.hero });
		const img = createElement("img", {
			className: css.background,
			src: imgSrc, // просто установите атрибут, об остальном позаботится сборщик
		});
		this.addElementChild(img);
	}
}

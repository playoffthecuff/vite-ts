import { Base } from "../../base";
import { button, div } from "../../helpers";
import css from "./tabs.module.css";

export interface Tab {
	name: string;
	element: HTMLElement;
}

export default class Tabs extends Base {
	private activeIndex = 0;

	constructor(tabs: Tab[]) {
		super("div", {className: css.wrapper});
		const tabElements = tabs.map((t, i) => div({ hidden: i !== this.activeIndex }, t.element));
		const tabContent = div(
			{ className: css["tab-panel"], role: "tabpanel" },
			...tabElements,
		);
		const buttons = tabs.map((t,i) =>
			button({
				className: css.tab,
				onclick: (e) => {
					buttons.forEach((b,i) => {
						b.ariaSelected = null;
						tabElements[i].hidden = true;
						if (e.target === b) {
							this.activeIndex = i;
							b.ariaSelected = "true";
							tabElements[i].hidden = false;
						}
					})
				},
				role: "tab",
				textContent: t.name,
				ariaSelected: i === this.activeIndex ? "true" : null
			}));
		const tablist = div(
			{ className: css.tablist },
			...buttons,
		);
		this.addElementChildren(tablist, tabContent);
	}
}

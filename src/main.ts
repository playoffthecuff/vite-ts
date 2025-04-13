import footer from "./components/footer";
import Header from "./components/header";
import { Hero } from "./components/hero";
import Main from "./components/main";
import { fourthPage } from "./components/pages/fourth";

import { notFoundPage } from "./components/pages/not-found";
import { secondPage } from "./components/pages/second";
import ThirdPage from "./components/pages/third";
import { createRouter } from "./lib/router";
import { adminGuard, authGuard } from "./lib/services/auth";
import "./style.css";

// первую страничку не добавлял чтобы тестировать нат фаунд роут
const router = createRouter({
	"/": { element: new Main().element }, // на главную страницу можно всем пользователям
	"/second": { element: secondPage, guard: () => authGuard() || "/third" }, // сюда добавим гард который не позволит перейти не авторизованному и перенаправит его на третюю страницу
	"/third": { element: new ThirdPage().element },
	"/fourth": { element: fourthPage, guard: adminGuard }, // гард передаём просто как ссылку, так как редирект не используем
	"*": { element: notFoundPage }, // сюда можно тоже всем :)
});
router.listen();

document.body.append(
	new Header().element,
	new Hero().element,
	router.outlet,
	footer,
);

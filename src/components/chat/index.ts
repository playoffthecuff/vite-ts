import { Ws } from "../../lib/services/ws";
import { Base } from "../base";
import { button, div, input, p } from "../helpers";
import css from "./chat.module.css";

const WS_URL = "https://echo.websocket.org/.sse"; // бесплатный эхо сервер - шлём сообщение в ответ получаем такое же

export default class Chat extends Base {
	constructor() {
		super("div");
		this.addStaticMarkup("<h2>Welcome to Chat</h2>");
		const chatWindow = div({ className: css.window });
		const inputMessage = input({ className: css.input });
		inputMessage.placeholder = 'type message ("hi" for example)';
		const sendButton = button({ textContent: "SEND" });
		this.addElementChildren(chatWindow, inputMessage, sendButton);
		const ws = new Ws(
			// конфигурируем
			WS_URL,
			{
				// теперь эта диспатч таблица абстрагирована в отдельный слой, соответственно её можно вынести куда угодно и обрабатывать независимо, а не писать в копоненте иф е.дата == хай рисуй хай элс иф е.дата == бай рисуй бай
				hi: (message: string) => chatWindow.append(p({ textContent: message })),
				bye: (message: string) =>	chatWindow.append(p({ textContent: message })),
			},
			(ev: MessageEvent) => {
				// добавим фоллбэк если пришло не хай и не бай
				chatWindow.append(p({ textContent: "unknown message" })); // выводим пользователю UI что что-то идёт не так
				console.log("recieve unregistered message", ev); // и логируем событие
			},
		);
		ws.init(); // создаём соединение
		sendButton.onclick = () => {
			if (inputMessage.value) ws.send(inputMessage.value); // если инпут не пустой отсылаем через веб сокет
		};
	}
}

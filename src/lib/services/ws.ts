const WS_STATES = ["CONNECTING", "OPEN", "CLOSED"] as const;

export class Ws {
	#dispatchTable: Record<string, (message: string) => void>;
	#ws: WebSocket | null = null;
	#state: (typeof WS_STATES)[number] = "CLOSED";
	#url: string;
	#fallback?: (ev: MessageEvent) => void;

	constructor(
		url: string,
		api: Record<string, (message: string) => void>,
		fallback?: (message: MessageEvent) => void,
	) {
		// Будем передавать объект onmessage колбэков и сохранять в диспатч таблице. Опционально можно передать фоллбэк который будем выполнять если в диспатч таблице нет нужной функции (пришло неожиданное для нашего АПИ сообщение от сервера)
		this.#dispatchTable = api;
		this.#url = url;
		this.#fallback = fallback;
	}

	#updateState() {
		if (this.#ws) {
			this.#state = WS_STATES[this.#ws.readyState];
		}
	}

	#cleanup() {
		if (this.#ws) {
			this.#ws.onmessage = null;
			this.#ws.onerror = null;
			this.#ws.onopen = null;
			this.#ws.onclose = null;
			this.#ws = null;
		}
	}

	destroy() {
		this.#ws?.close();
	}

	init() {
		this.#ws = new WebSocket(this.#url); // создаём соединение;
		this.#updateState(); // оно сразу переходит в "CONNECTING";
		this.#ws.onmessage = (ev) => {
			console.log(ev);
			if (ev.data in this.#dispatchTable) {
				// Для простоты у нас в data просто строки поэтому их ищем в таблице и с этим же аргументом вызываем коллэк. Если бы был объект, то можно было бы десериализовать сначала и смотреть одно из полей объекта и выполнять колбэк от аргумента данных, например d = JSON.parse(ev.data); this.#dispatchTable[d.type](d); - выполняем функцию с нужным типом передавая в неё объект данных
				this.#dispatchTable[ev.data](ev.data); // если есть апи для данного сообщения в диспатч таблице то выполняем коллбэк
			} else if (this.#fallback) {
				this.#fallback(ev); // если нет апи и есть фоллбэк то выполним его
			}
		};

		// логику внутри следующих 3 методов можно также передавать коллбэками через конструктор для гибкости
		this.#ws.onopen = (ev) => {
			this.#updateState(); // переход в "OPEN";
			console.log(ev); // вместо вашей логики
		};
		this.#ws.onclose = (ev) => {
			console.log(ev); // вместо вашей логики, некие посмертные действия, или реинициализация
			if (this.#ws) {
				this.#cleanup();
			}
		};
		this.#ws.onerror = (ev) => {
			this.#updateState();
			console.log(ev); // вместо вашей логики, некие действия при ошибке
		};
	}

	get state() {
		return this.#state;
	}

	send(d: string) {
		// будем отсылать строки для простоты
		this.#ws?.send(d); // но можем отсылать объекты или ещё что-то сериализуемое через JSON.stringify(d)
	}
}

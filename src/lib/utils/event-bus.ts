const bus = new EventTarget(); // делаем шину из самого примитивного интерфейса

// тут будем регистрировать наши события, чтобы тайпскрипт не грыз
interface EventMap {
  "paint:footer": string; // в detail будем ожидать строку с цветом
}

// накинем апи:
// подписчики будут подписывать свои колбэки на нужные им события или отписывать их
// издатели будут эмитировать события для подписантов

// подписка:
export const on = <T extends keyof EventMap>(type: string, callback: (e: CustomEvent<EventMap[T]>) => void) => {
  function listener(e: Event) {
    if (e instanceof CustomEvent && e.type === type) callback(e);
  }
	bus.addEventListener(type, listener);
};

// отписка:
export const off = (type: string, callback: () => void) => {
	bus.removeEventListener(type, callback);
};

// однократное выполнение с автоматической отпиской:
export const once = (type: string, callback: () => void) => {
  const wrapper = () => {
    callback();
    bus.removeEventListener(type, wrapper);
  }
  bus.addEventListener(type, wrapper) // подпишем самоотписывающуюся обёртку
}

// отправка события подписантам, по дефолту без данных, но можно что-то записать туда и потом считать из поля дитэйл в событии
export const emit = (type: string, detail: string | null = null) => {
  bus.dispatchEvent(new CustomEvent(type, {detail}))
};


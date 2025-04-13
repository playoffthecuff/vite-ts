// типа сервис авторизации, не будем заморачиваться с классами/объектами etc, просто используем модульную изоляцию для демонстрации

let isAuthorized = false; // в замыкании модуля будут нужные флаги и ниже апи к ним
let isAdmin = false;

export const login = async () => { // допустим это наш фетч, которым мы где-то вызываем, ходим на сервер и авторизуемся там
  await new Promise((r) => setTimeout(r, 250)) //типа ждём пока сервак ответит
  const responseResult = Math.random(); // имитируем рандомный ответ
  isAuthorized = responseResult > 0.5;
  isAdmin = isAuthorized && responseResult * Math.random() > 0.5; // тут по идее шансы поменьше :)
};

export const authGuard = () => isAuthorized; // этот гард будет использоваться для всех роутов которые требуют авторизации
export const adminGuard = () => isAdmin; // тоже для доступа к админке например

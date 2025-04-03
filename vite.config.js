import {defineConfig} from "vite"

export default defineConfig({
  base: "/vite-ts/", // указываем сборщику относительный путь для обработки при сборке в проекте пути были валидны на сервере (из gh-pages деплой происходит в подпапку с именем репозитория)
});

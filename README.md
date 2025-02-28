# Приложение состоит из 2 частей: server - backend на Spring Framework с Postgresql и Liquibase для базы данных и client - frontend на Angular с Material

После клонирования проекта

## Запуск server

1. Установка Postgresql, если нет. https://www.enterprisedb.com/downloads/postgres-postgresql-downloads
2. Создание базы данных zoodb.
3. Должен быть создан пользователь с правами на запись на схему public этой базы данных с именем-паролем согласно файлу <путь к месту, куда был клонирован проект>/project_zoo/server/src/main/resources/application.yaml
4. В Intellij Idea или аналогичной среде для разработки запустить server главный файл приложения из файла ZooApplication.java.

## Запуск client

1. Установка Nodejs для работы с Angular, если нет. https://nodejs.org/
2. Используя терминал, или Visual studio code, или аналогичную последней среду для разработки запустить команду ng serve. В браузере результат по адресу `http://localhost:4200/`


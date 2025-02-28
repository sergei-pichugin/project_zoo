# Server

This project was generated using [spring initializer](https://start.spring.io/) Spring Boot version 3.4.3, Java version 17 with Maven (use mvn in terminal).

## Running the Application

To start a local development server, run:

```terminal
mvn spring-boot:run
```

Once the server is running, it is accessible by `http://localhost:8080/`. 

## Creating an Executable Jar

You can run a completely self-contained executable jar file in production. Executable jars are archives containing compiled classes along with all of the jar dependencies.

```terminal
mvn package
```

If you look in the target directory, you should see myproject-0.0.1-SNAPSHOT.jar. If you want to peek inside, you can use jar tvf, as follows:

```terminal
jar tvf target/myproject-0.0.1-SNAPSHOT.jar
```

To run that application, use the java -jar command, as follows:

```terminal
java -jar target/myproject-0.0.1-SNAPSHOT.jar
```

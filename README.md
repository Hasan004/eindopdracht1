Hoe start je de applicatie? 

Eerst een paar instellingen veranderen:

Je moet eerst naar application.properties gaan om je wachtwoord te veranderen naar je eigen mySql wachtwoord.

```
"\src\main\resources\application.properties"
```

is de path voor de file.
Hierin moet je de volgende waardes aanpassen naar de username en wachtwoord die bij jou mySql horen.

```
spring.datasource.username=
spring.datasource.password=
```

Vervolgens moet je de sql script in die in de eindopdracht-hasan-master folder staat runnen in mysql!

   
 Volg deze stap uit om de serverside te laten runnen.
```
./mvnw.cmd spring-boot:run
```

Nu de serverside up en running is kunnen we de clientside starten. 
De terminal met Maven moet geopend blijven, dus openen we een nieuwe terminal:

Nu voeren we de volgende stappen uit:
```
1. cd src
2. cd main
3. cd webapp
4. cd reactjs
5. npm install
6. npm start
```

Ga naar: http://localhost:3000

# starterProject

StarterProjekt für Praktikanten zum erlernen der grundlegenden Technik von Projekten des Cloud-Teams

## Getting started

Ordnerstruktur/wichtige Files:
  

    - ./backup                  sql dumps
    - ./frontend                Frontend client
    - ./dev                     nginx (webserver) Konfiguration
    - ./src                     Backend
    - ./src/main                Backend Logik, REST API und Entity-Klassen
    - ./src/resources           JPA-Konfiguration persistence.xml
    - ./src/webapp              Servlet Konfiguration web.xml
    - ./pom.xml                 Backend Libaries und Abhängikeiten für Maven
    - ./docker-compose.yml      Docker Compose File welcher die Applikationsteile definiert
    - ./init.sh                 Script zum starten der Applikation

  
1. Kotlin Projekt mit IntelliJ durch `Build > Build Artifacts > All Artifacts` oder `mvn package` kompilieren.
2. `docker-compose up -d` ausführen
3. Projekt ist unter http://localhost erreichbar
4. Backend Beispiel ist unter http://localhost/api/hello/world erreichbar
5. Logs anzeigen mit `docker-compose logs -f`

- Bei Änderungen im Backend, dies neu bauen und `docker-compose restart` ausführen
- Änderungen im Frontend werden automatisch neugebaut. Wenn die Abhängigkeiten des Frontends geändert wurden muss mit `docker-compose build` der Frontend Container neugebaut werden

## Aufgaben

Baue eine TODO-Liste Applikation

1. TodoAPI.kt File erweitern um fehlende REST Schnittstellen  (siehe TODO im genannten File)
2. Frontend für CRUD Operationen bauen mit einer Technik deiner Wahl (siehe TODO in ./frontend/index.html)

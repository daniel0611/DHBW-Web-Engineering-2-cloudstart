# DHBW Web-Engineering II Projektaufgabe

## Getting started

Ordnerstruktur/wichtige Files:
  

    - ./backup                  sql dumps
    - ./frontend                Frontend client
    - ./dev                     nginx (webserver) Konfiguration
    - ./backend                 Rust Backend
    - ./src/main                Backend Logik, REST API und Entity-Klassen
    - ./src/resources           JPA-Konfiguration persistence.xml
    - ./src/webapp              Servlet Konfiguration web.xml
    - ./pom.xml                 Backend Libaries und Abhängikeiten für Maven
    - ./docker-compose.yml      Docker Compose File welcher die Applikationsteile definiert
    - ./init.sh                 Script zum starten der Applikation

  
1. `docker-compose up -d` bzw. `init.sh` ausführen
2. Projekt ist unter http://localhost oder http://localhost:9090 erreichbar
3. Backend Beispiel ist unter http://localhost/api/ erreichbar
4. Logs anzeigen mit `docker-compose logs -f`

- Bei Änderungen im Backend, dies neu bauen mit `docker-compose build backend` und `docker-compose restart` ausführen
- Änderungen im Frontend werden automatisch neugebaut. Wenn die Abhängigkeiten des Frontends geändert wurden muss mit `docker-compose build frontend` der Frontend Container neugebaut werden

## Aufgaben

Baue eine TODO-Liste Applikation

1. TodoAPI.kt File erweitern um fehlende REST Schnittstellen  (siehe TODO im genannten File)
2. Frontend für CRUD Operationen bauen mit einer Technik deiner Wahl (siehe TODO in ./frontend/index.html)

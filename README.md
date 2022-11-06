# DHBW Web-Engineering II Projektaufgabe

## Verwendete Technologien

- Frontend
  - Angular mit [Angular Material](https://material.angular.io/)
- Backend
  - [Rust](https://www.rust-lang.org)
  - [Rocket](https://rocket.rs) als HTTP Server
  - [SeaORM](https://www.sea-ql.org/SeaORM/) für die Datenbank Anbindung

## Getting started

Ordnerstruktur/wichtige Files:

    - ./backup                  sql dumps
    - ./frontend                Frontend client
    - ./dev                     nginx (webserver) Konfiguration
    - ./backend                 Rust Backend
    - ./backend/src             Rust Backend Quellcode
    - ./backend/migration/src   DB Schema/Migrationsskripte
    - ./docker-compose.yml      Docker Compose File welcher die Applikationsteile definiert
    - ./init.{sh,bat}           Script zum starten der Applikation
  
1. `docker-compose up -d` bzw. `init.sh`/`init.bat` ausführen

   - Beim ersten Starten kann das Builden des Backend Containers einige Zeit dauern (3-7 Minuten).

2. Projekt ist unter http://localhost oder http://localhost:9090 erreichbar
3. Backend Beispiel ist unter http://localhost/api/ erreichbar
4. Logs anzeigen mit `docker-compose logs -f`

- Bei Änderungen im Backend, dies neu bauen mit `docker-compose build backend` und `docker-compose restart` ausführen
- Änderungen im Frontend werden automatisch neugebaut. Wenn die Abhängigkeiten des Frontends geändert wurden muss mit `docker-compose build frontend` der Frontend Container neugebaut werden

## Students

| GitHub username | Matrikelnummer |
|-----------------|----------------|
| @daniel0611     | 6424019        |
| @Juli-47        | 3083733        |
| @1Adri1         | 3344271        |

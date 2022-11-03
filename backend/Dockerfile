FROM rust AS builder 
WORKDIR /app


# Build dependencies
COPY migration ./migration
COPY Cargo.toml Cargo.lock ./
RUN mkdir src && echo "fn main() {}" > src/main.rs
RUN cargo build --release
RUN rm -rf src


COPY . .
# The last modified attribute of main.rs needs to be updated manually,
# otherwise cargo won't rebuild it.
RUN touch -a -m ./src/main.rs

# Build application
RUN cargo build --release 

# Start fresh image with mysql/mariadb client and application
FROM debian:buster-slim AS runtime
WORKDIR /app

RUN apt update && apt install libmariadb-dev -y

COPY --from=builder /app/target/release/backend /usr/local/bin
ENV ROCKET_ADDRESS=0.0.0.0
EXPOSE 8000
ENTRYPOINT ["/usr/local/bin/backend"]

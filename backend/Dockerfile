FROM rust:1.77.1

# 1. Create a new empty shell project
RUN USER=root cargo new --bin back
WORKDIR /back

# 2. Copy our manifests
COPY ./Cargo.lock ./Cargo.lock
COPY ./Cargo.toml ./Cargo.toml

# 3. Build only the dependencies to cache them
RUN cargo build --release
RUN rm src/*.rs

# 4. Now that the dependencies are built, copy your source code
COPY ./src ./src

# 5. Build for release
RUN rm ./target/release/deps/back*
RUN cargo build --release

# 6. Install the compiled binary
RUN cargo install --path .


# 7. Expose the port the app runs on
EXPOSE 8080

# 8. Set the startup command to run your binary
CMD ["back"]
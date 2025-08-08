FROM debian:bullseye-slim

# Instala Kaniko y sleep
RUN apt-get update && \
    apt-get install -y curl ca-certificates busybox && \
    curl -LO https://github.com/GoogleContainerTools/kaniko/releases/download/v1.22.0/executor && \
    chmod +x executor && \
    mv executor /kaniko/executor

ENV PATH="/kaniko:${PATH}"
ENTRYPOINT ["/kaniko/executor"]

FROM gcr.io/kaniko-project/executor:latest

# Instala busybox para tener acceso a comandos básicos como `sleep`
USER root
RUN apt-get update && apt-get install -y busybox

# Establece el usuario por defecto de nuevo
USER kaniko

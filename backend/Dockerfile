FROM --platform=$BUILDPLATFORM python:3.10-alpine AS builder

ARG PORT=7000
ARG REQUIREMENT 

ENV ENVPORT=${PORT}
ENV ENVREQUIREMENT = ${REQUIREMENT} 

EXPOSE ${PORT}

WORKDIR /app

COPY backend/ .

RUN pip3 install -r requirements/${REQUIREMENT}.txt --no-cache-dir
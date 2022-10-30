FROM node:16.13
WORKDIR /usr/src/currency-conversion-api-backend
COPY ./package*.json ./
COPY ./yarn.lock ./
RUN yarn install
RUN chmod -77 /usr/src/currency-conversion-api-backend/node_modules
ENV LANG=en_US.UTF-8 \
  LC_ALL=en_US.UTF-8
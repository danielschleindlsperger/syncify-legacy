#################
# BASE ##########
#################
FROM node:10 AS base
WORKDIR /app
COPY package.json package-lock.json /app/
RUN npm install
COPY . /app/

# #################
# # TEST ##
# #################
FROM base AS test
WORKDIR /app
RUN ["npm", "test"]

# #################
# # BUILD #######
# #################
FROM base AS build
WORKDIR /app
RUN npm run build

#################
# SERVE #######
#################

FROM iamfreee/docker-nginx-static-spa:latest
WORKDIR /app
COPY --from=build /app/dist/ /var/www/html

EXPOSE 80

ENTRYPOINT ["nginx","-g","daemon off;"]

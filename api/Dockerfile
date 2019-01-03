#################
# BASE ##########
#################
FROM node:10-alpine AS base

WORKDIR /app

#################
# DEPENDENCIES ##
#################
COPY package.json package-lock.json /app/
RUN npm install

#################
# RELEASE #######
#################
FROM node:10-alpine AS release

# ARG AND ENV
ENV WORKSPACE /app
WORKDIR /app
ENV NODE_ENV production

COPY --from=base /app/node_modules ./node_modules
COPY package.json package-lock.json /app/
# remove dev-dependencies
COPY . .
RUN npm run build
RUN npm prune --production

# SETTINGS
EXPOSE 3000
USER node:node

# START THE APP
CMD ["npm", "run", "start:prod"]
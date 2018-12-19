# FROM node:10-alpine AS builder

# WORKDIR /app

# COPY package.json /app

# # Creating tar of productions dependencies
# RUN npm install --production && cp -rp ./node_modules /tmp/node_modules

# # Installing all dependencies
# RUN npm install

# # Copying application code
# COPY . /app

# FROM node AS runner

# EXPOSE 3000
# WORKDIR /app

# # Adding production dependencies to image
# COPY --from=builder /tmp/node_modules /app/node_modules

# # Copying application code
# COPY . /app

# CMD npm run start:prod

# USER node




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

# get dependencies from dependencies-stage
COPY --from=base /app/node_modules ./node_modules
COPY package.json package-lock.json /app/
# remove dev-dependencies
RUN npm prune --production
COPY . .

# SETTINGS
EXPOSE 3000
USER node:node

# START THE APP
CMD ["npm", "run", "start:prod"]
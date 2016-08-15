# Starting Image
FROM node:argon
MAINTAINER Nick Lombardi <nlombardi@translations.com>

# Set npm log levels
RUN npm config --global set progress false && \
    npm config --global set spin false && \
    npm config --global set loglevel http && \
    npm config --global set color true

# Make sure we are running the latest version of npm
RUN npm install npm@3.9.5 -g \
    --loglevel=warn

# Create Working Directory
RUN mkdir /api
WORKDIR /api

# Install Dependencies
RUN npm install

# Install pm2 so we can run our application
RUN npm i -g pm2

# Copy source & mount directory
COPY . /api
VOLUME ./:/api

# Expose ports & serve application
EXPOSE 3000

CMD ["npm", "start"]

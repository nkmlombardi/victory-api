# Starting Image
FROM node:argon
MAINTAINER Nick Lombardi <nlombardi@translations.com>

# Add build utils (seems to be necessary for certain node-gyp commands)
# RUN apt-get update && \
#     apt-get install \
#         -y \
#         --no-install-recommends \
#         build-essential \
#     && \
#     apt-get autoremove -y && \
#     apt-get clean && \
#     rm -rf /var/lib/apt/lists/*

# Set npm log levels
RUN npm config --global set progress false && \
    npm config --global set spin false && \
    npm config --global set loglevel http && \
    npm config --global set color true

# Make sure we are running the latest version of npm
RUN npm install npm -g \
    --loglevel=warn
RUN npm install -g nodemon

# Create the directory we are going to install our app into, and make all
# following RUN commands execute in that directory
RUN mkdir -p /api
WORKDIR /api

# Copy in the package.json and NPM install first
# to hopefully be able to reuse a prio cached image
# COPY package.json /api
COPY . /api

RUN npm install \
    --loglevel=warn

RUN ls -la
RUN pwd

EXPOSE 80 3000 3001 443

CMD [ "npm", "start" ]

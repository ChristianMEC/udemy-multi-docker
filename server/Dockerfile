FROM node:alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --only=prod
COPY . .
 
# Finally runs the application
CMD [ "npm", "run", "start" ]
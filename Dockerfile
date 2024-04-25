
FROM node:latest
        
WORKDIR /chat-application
        
COPY package.json package.json

COPY . .   
        
RUN npm install

EXPOSE 4000
        
CMD ["npm","start"]
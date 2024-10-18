FROM node:18.18-alpine 
WORKDIR /usr/src/app 
RUN apk add build-base 
RUN apk add python3 
RUN npm install -g node-gyp 
COPY package*.json ./ 
RUN npm install 
COPY . . 
ENV PRISMA_ENGINES_CHECKSUM_IGNORE_MISSING=1 
RUN npx prisma generate 
EXPOSE 3000
EXPOSE 5555
CMD ["sh", "-c", "npx prisma db push --accept-data-loss && npm start"]

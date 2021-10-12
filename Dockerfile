FROM node:14

WORKDIR /app
COPY package.json .
RUN npm install
RUN npm i bcrypt
COPY . .
COPY ./docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh
CMD ["npm", "run", "pm2"]
# ENTRYPOINT ["/docker-entrypoint.sh"]
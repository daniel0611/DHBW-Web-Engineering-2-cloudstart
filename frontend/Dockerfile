FROM node:18.10.0

WORKDIR /app
COPY package.json /app
COPY package-lock.json /app

RUN npm install
#Uncomment the following line to enable auto comiling on windows.
#RUN npm install -g @angular/cli@14.2.5

COPY . /app/

CMD npm run start
#Uncmment the following line and comment the line above to enable auto compiling on windows.
#CMD ng serve --poll 1000


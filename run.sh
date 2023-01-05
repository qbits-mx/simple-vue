RUTA=/home/ubuntu

docker stop dockerized-front-artemisa
docker rm dockerized-front-artemisa

docker run -d \
--name dockerized-front-artemisa \
--restart unless-stopped \
-p 7771:8080 \
-v $RUTA/front-artemisa:/front \
-w /front \
gustavoarellano/front-artemisa npm run serve

# ya dentro del contenedor hcer:
# npm run serve
# y luego ir a la siguiente dirección en el navegador:
# http://localhost:3000/usa-modal

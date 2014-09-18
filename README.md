ngrok for Docker
============
Heavily leveraged [andrewmunsell/docker-ngrok](https://github.com/andrewmunsell/docker-ngrok). Remove CMD and add the EXPOSE 4040.

<!-- 
Example usage:
`docker run --rm --name ngrok -e "HTTP_PORT=192.168.0.100:8080" centurylink/ngrok`
Valid environmental variables are: `HTTP_PORT` and `HTTPS_PORT`
-->

View the docker logs for the running container to see the URL to use to access.

Detailed instructions [here](https://ngrok.com).  



FROM busybox:ubuntu-14.04
MAINTAINER Gullit Miranda <gullitmiranda@gmail.com>

# Install ngrok
ADD https://api.equinox.io/1/Applications/ap_pJSFC5wQYkAyI0FIVwKYs9h1hW/Updates/Asset/ngrok.zip?os=linux&arch=amd64&channel=stable /
RUN unzip ngrok.zip -d /bin && \
 rm -f ngrok.zip && \
 mkdir -p /ngrok/log && \
 echo 'inspect_addr: 0.0.0.0:4040' > /ngrok/ngrok.yml

EXPOSE 4040

#Add config script
ADD ngrok_discover /bin/ngrok_discover
RUN chmod +x /bin/ngrok_discover

CMD ["/bin/ngrok_discover"]
# CMD ["/bin/ngrok -config=/ngrok/ngrok.yml -log=/ngrok/log/ngrok.log "]

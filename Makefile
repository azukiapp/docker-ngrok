# `adocker` is alias to `azk docker`
all:
	adocker build -t azukiapp/ngrok latest

no-cache:
	adocker build --rm --no-cache -t azukiapp/ngrok latest

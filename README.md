[azukiapp/ngrok](http://images.azk.io/#/ngrok)
==================

Base docker image to run [**ngrok**](https://ngrok.com/) tunnel in [`azk`](http://azk.io)

Versions (tags)
---

<versions>
- [`latest`](https://github.com/azukiapp/docker-ngrok/blob/master/latest/Dockerfile)
</versions>

Image content:
---

- Ubuntu 14.04
- ngrok

For more detailed instructions of [ngrok](https://ngrok.com).  


### Usage with `azk`

Example of using that image with the [azk](http://azk.io):

```js
/**
 * Documentation: http://docs.azk.io/Azkfile.js
 */
 
// Adds the systems that shape your system
systems({
  "app": {
    export_envs: {
      APP_URL: "http://#{system.name}.#{azk.default_domain}:#{net.port.http}"
    }
  },
  ngrok: {
    // Dependent systems
    depends: [ "app" ],
    image : { docker: "azukiapp/ngrok" },
    scalable: { default: 0,  limit: 1 }, // disable auto start
    wait: {"retry": 20, "timeout": 1000},
    http      : {
      domains: [ "#{manifest.dir}-#{system.name}.#{azk.default_domain}" ],
    },
    ports     : {
      http : "4040"
    },
    envs      : {
      // NGROK_SUBDOMAIN : "#{manifest.dir}",
      // NGROK_AUTH      : "",
    }
  }
});
```

**Note**: protocol will be recognized and used based on your `APP_URL`.

### Usage with `docker`

To create the image `azukiapp/ngrok`, execute the following command on the ngrok folder:

```sh
$ docker build -t azukiapp/ngrok .
```

To run the image and bind to port 4040:

```sh
# exporting as http
$ docker run --rm --name ngrok-run -p 4040:4040 -v "$PWD":/myapp -w /myapp -e "APP_URL=http://app.dev.azk.io:80" azukiapp/ngrok
```

```sh
# exporting as tcp
$ docker run --rm --name ngrok-run -p 4040:4040 -v "$PWD":/myapp -w /myapp -e "APP_URL=tcp://app.dev.azk.io:27015" -e "NGROK_AUTH_TOKEN=12345" azukiapp/ngrok
```

**Note**: protocol will be recognized and used based on your `APP_URL`.

Logs
---

```sh
# with azk
$ azk logs ngrok

# with docker
$ docker logs ngrok-run
```

## License

Azuki Dockerfiles distributed under the [Apache License][license].

[license]: ./LICENSE

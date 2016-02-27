/**
 * Documentation: http://docs.azk.io/Azkfile.js
 */
// Adds the systems that shape your system
systems({
  web: {
    // Dependent systems
    depends: [],
    // More images:  http://images.azk.io
    image: {"docker": "azukiapp/internal-services:0.4.0"},
    workdir: "/azk/#{manifest.dir}/test",
    shell: "/bin/bash",
    command: "echo $HTTP_PORT; socat TCP4-LISTEN:$HTTP_PORT,fork EXEC:./bashttpd",
    wait: 20,
    mounts: {
      '/azk/#{manifest.dir}': sync("."),
    },
    http: {
      domain: "#{system.name}.#{azk.default_domain}",
    },
    export_envs: {
      APP_URL: "tcp://#{system.name}.#{azk.default_domain}:#{net.port.http}",
    }
  },

  'ngrok': {
    depends: ['web'],
    // Dependent systems
    image: {dockerfile: './latest'},
    scalable: false,
    wait: 10,
    http: {
      domains: ['#{system.name}.#{azk.default_domain}']
    },
    ports: {
      http: '4040/tcp'
    },
  },

});

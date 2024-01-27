## IPs, Ports and Domains

### The IP Protocol

An IP address is a label that is assigned to a network interface on your computer.
For example, your wireless network interface might have an IP address that it can use to communicate with other computers on the same wireless network.

Such an address consists of 4 numbers between 0 and 255, separated by dots.
Examples addresses might be `123.56.1.17` or `192.168.178.47`.

A particularly important address is `127.0.0.1` which always identifies the IP of the network interface itself.
For example, if you run a web server on your computer, its IP address would usually be `127.0.0.1`.

Note that instead of saying that a network interface has a particular IP, we will often say that a computer has some IP.
This is because often we only really care about a particular interface (usually your wireless interface).
However, it is important to understand that diffent network interfaces can have different IP addresses even if they are located on the same machine.

### Ports

Usually you want to be able to run multiple networking services on your machine.
This is enabled by ports.

A **port** is simply a number assigned to uniquely identify a connection endpoint on a machine.
For example, I might have a web service running on port `443` and an ssh service on port `22`.

> The `ssh` protocol allows you to remotely login on a computer.

These two services might run on the same computer with the same IP, because they can be distinguished by their port numbers.

### Domains

While IP addresses are great, they are very unwieldy and hard to remember for humans.
Indeed, in real life, we never tell someone to go to `142.251.37.14`, instead we tell them to "go to Google".

This is possible because of **domains**.
A domain (or _domain name_) is a string that identifies some network resource and usually has a corresponding IP address.

For example, the domain `google.com` might correspond to the IP address `142.251.37.14`.
That is, you can identify the resource either via `google.com` or via `142.251.37.14`.

> The reality is much more complicated.
> A single domain usually corresponds to many IP addresses for load balancing reasons etc.
> Nevertheless, this is a useful mental model to have.

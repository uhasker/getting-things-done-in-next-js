## IPs, Ports and Domains

<div style="text-align: right"> <i> Well, it works on localhost. <br> — Seconds before disaster </i> </div>

### Network Interfaces

**Network interfaces** are the mechanism your computer uses to connect to a network.
Network interfaces can correspond to physical objects like a network interface controller (the hardware component that allows a computer to connect to a network via a cable or wireless connection).
They can also be virtual, i.e. only exist in software.

### Protocols

A **protocol** defines the rules by which computers communicate.
Protocols allow computer to "speak the same language".

The internet knows a lot of different protocols - from really common ones like IP, HTTP or DNS to really exotic ones that are only relevant for a select group of specialists.

If you go to `www.google.com`, you will see that your browser actually navigates you to `https://www.google.com/`.
In this case the underlying protocol is HTTPS.

### The IP Protocol

An IP address is an identifier that is assigned to a network interface on your computer.
For example, your wireless network interface might have an IP address that it can use to communicate with other computers on the same wireless network.

> Note that we will only talk about the IPv4 protocol and ignore the IPv6 protocol.

Such an address consists of 4 numbers between 0 and 255, separated by dots.
Example addresses might be `123.56.1.17` or `192.168.178.47`.

A special IP address is `127.0.0.1` which can be used to identify the machine you're currently on.
For example, if you run a web server on your computer, you could access it at `127.0.0.1`.

Note that instead of saying that a network interface has a particular IP, we will often say that a computer has some IP.
This is because often we only really care about a particular interface (usually your wireless interface).
However, it is important to understand that diffent network interfaces will usually have different IP addresses even if they are located on the same machine.

### Ports

Usually you want to be able to run multiple networking services on your machine.
This is enabled by ports.

A **port** is simply a number assigned to uniquely identify a connection endpoint on a machine.
For example, you might have a web service running on port `443` and an ssh service on port `22`.

> The `ssh` protocol allows you to remotely log in to a computer and execute commands on it.

These two services might run on the same computer with the same IP, because they can be distinguished by their port numbers.

If you want to specify the IP and port together, you use the colon `:` notation.
For example, if you have an HTTPS web server running on IP `123.56.1.17` and port `443`, you would say that it's located at `123.56.1.17:443` (more specifically on `https://123.56.1.17:443`).

Similarly, if you start an HTTP web server locally (i.e. on `127.0.0.1`) on port `3000`, you could access it at `127.0.0.1:3000` (more specifically on `http://127.0.0.1:3000`).

There is a list of "well-known ports".
For example, an `http` application typically runs on port `80` while an `https` application typically runs on port `443`.
This is why you don't need to explicitly tell your browser that `google.com` can be found at port `443` - it will figure that out automatically.

> During development we will not follow this convention and mostly run our applications on port `3000`.
> This is because you don't need special "root" permissions to run something on port `3000`.
> Typically, ports below `1024` are considered "privileged" and require these special permissions.

### Domains

While IP addresses are great, they are very unwieldy and hard to remember for humans.
Imagine that instead of "just google it" or "go to `google.com`" you would have to tell someone to go to `142.251.37.14`.

This why the concept of a **domain** was introduced.
A domain (or _domain name_) is a string that identifies some network resource and usually has a corresponding IP address.

For example, the domain `google.com` might correspond to the IP address `142.251.37.14`.
That is, you can identify the resource either via `google.com` or via `142.251.37.14`.

The translation of domains to IP adresses is handled by the **Domain Name System** (DNS) protocol.
If you type `google.com` into your browser address bar, DNS will translate it to the correct IP under the hood.

> The reality is much more complicated.
> A single domain can correspond to many IP addresses for load balancing reasons etc.
> Nevertheless, this is a useful mental model to have.

A special domain is `localhost` which resolves to `127.0.0.1`.

This means that if you want to access a locally running HTTP web server on port `3000`, you would need to go to `localhost:3000` (more specifically `http://localhost:3000`).

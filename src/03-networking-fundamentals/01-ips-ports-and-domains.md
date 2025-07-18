## IPs, Ports and Domains

<div style="text-align: right"> <i> Well, it works on localhost. <br> — Seconds before disaster </i> </div>

### Network Interfaces

**Network interfaces** are the mechanism your computer uses to connect to a network.
Network interfaces can correspond to physical objects like a network interface controller (the hardware component that allows a computer to connect to a network via a cable or wireless connection).
They can also be virtual, i.e. only exist in software.

### Protocols

A **protocol** defines the rules by which the network interfaces communicate.
Protocols allow computers to "speak the same language".

The internet knows a lot of different protocols—from really common ones like IP, HTTP, HTTPS or DNS to really exotic ones that are only relevant for a select group of specialists.

For example, if you're browsing `http://example.com`, the underlying protocol is HTTP.
Similarly, if you browse `https://www.google.com/`, the underlying protocol is HTTPS.

Protocols can also use other protocols.
For example, the HTTP protocol uses the TCP protocol which in turn uses the IP protocol.

### The IP Protocol

The **IP protocol** powers a large portion of the modern web.
Its most important concept is the so-called IP address.

> Note that there are two versions of the IP protocol—the IPv4 protocol and the IPv6 protocol.
> We will only talk about the IPv4 protocol and ignore the IPv6 protocol in this book.

An **IPv4 address** (or simply **IP** for short) is an identifier that is assigned to a network interface on your computer.
For example, your wireless network interface might have an IPv4 address that it can use to communicate with other computers on the same wireless network.

Such an address consists of 4 numbers between 0 and 255, separated by dots.
Therefore, IP addresses look like `123.56.1.17` or `192.168.178.47`.

Note that instead of saying that a _network interface has a particular IP_, we will often say that _a computer has some IP_.
This is because often we only really care about a particular interface (usually your Ethernet or your wireless interface).
However, it's important to understand that different network interfaces will usually have different IP addresses even if they're located on the same machine.

The **loopback address** `127.0.0.1` is a special IP address which can be used to identify the machine you're currently on.
You can basically use this to talk to your own computer.
For example, if you run a local web server, you could access it at `127.0.0.1`.

Additionally, some IP addresses are designated as **private addresses**, i.e. they can only appear on local networks and can't be used on the public internet.
The Internet Assigned Number Authority (IANA) has reserved the following blocks of IP addresses for private networks:

- `10.0.0.0-10.255.255.255`
- `172.16.0.0-172.31.255.255`
- `192.168.0.0-192.168.255.255`

This has the important consequence that if you're on a local network you usually won't be able to access a machine from another local network using its private address.
For example, let's say that you're in your home network and you've finally managed to host a web server on your machine which has the IP address `172.16.32.155`.
Full of excitement, you send a link to your friend Alice (who is on _her_ home network), only for her to tell you that she can't reach your IP address.
The problem is that your machine is only reachable at `172.16.32.155` _from your home network_ and can't be reached under that address from any other network.

Therefore, if you want your machine to be reachable from anywhere it needs to have a **public address**.
A public address is basically any address that hasn't been explicitly marked as private.
For example, `142.251.37.14` is a public address since it's not in one of the private address blocks.

> There are a few other special address blocks like the "link local" block.
> However, they won't be important for this book and therefore we'll simply skip over them.

### Ports

Usually, you want to be able to run multiple networking services on your machine.
This poses the problem of _uniquely identifying_ those services.
After all, if they all share the same IP, how can we distinguish them from one another?

The answer is that we can use **ports**.
A port is simply a number assigned to uniquely identify a connection endpoint on a machine.

Let's say you want to have a web service and an `ssh` service running on the same machine.

> The `ssh` protocol allows you to remotely log in to a computer and execute commands on it.

You could assign the web service the port `443` and the ssh service the port `22`.
Even though these services run on the same machine with the same IP, they can be distinguished from each other by their port number.

If a service is assigned some port, programmers often say that the service is **listening** (for incoming connections) on that port.
In our example, the web service would be _listening_ on port `443` and the ssh service would be _listening_ on port `22`.

If you want to specify an IP and a port together, you use the colon `:` notation.
For example, if you have an HTTPS web server running on a machine with the IP `123.56.1.17` and you have assigned the port `443` to the web server, it would be reachable at `123.56.1.17:443`.

> If we add the protocol (HTTPS), we would get the correct URL for the web server, which would be `https://123.56.1.17:443`.
> We will talk about URLs in more detail soon.

Similarly, if you start an HTTP web server locally (i.e. on `127.0.0.1`) on port `80`, you could access it at `127.0.0.1:80`.

> If we add the protocol (HTTP), we would get the correct URL for the web server, which would be `http://127.0.0.1:80`.

There is a list of **well-known ports**.
For example, an HTTP application typically runs on port `80` while an HTTPS application typically runs on port `443`.
This is why you don't need to explicitly tell your browser that `google.com` can be found at port `443`—your web browser will figure this out automatically because `443` is a well-known port.

> During development we will not follow this convention and mostly run our applications on port `3000`.
> This is because you don't need special "root" permissions to run something on port `3000`.
> Typically, ports below `1024` are considered "privileged" and require these special permissions.
> However, when we deploy our final application to production, it will run on the well-known port `443`.

### Domains

While IP addresses are great, they are very unwieldy and hard to remember for humans.
Imagine that instead of "just google it" or "go to `google.com`" you would have to tell someone to "go to `142.251.37.14`".
That would suck!

This is why the concept of a **domain** was introduced.
A domain is a string that identifies some network resource.
In our neat and tidy web development world, a domain usually has a corresponding IP address.

For example, the domain `google.com` might correspond to the IP address `142.251.37.14`.
That is, you can identify the resource either via `google.com` or via `142.251.37.14`.

The translation of domains to IP addresses is handled by the **Domain Name System** (DNS) protocol.
If you type `google.com` into your browser address bar, DNS will translate it to the correct IP under the hood.

> The reality is much more complicated and involves something called DNS records.
> This means that domains can have IPv4 addresses, IPv6 addresses, mail addresses etc.
> Domains can also be forwarded to other domains with so-called CNAME records.
> The picture becomes even more complicated once we go into load balancing.
> Nevertheless, for our purposes the mental model of "there are domains and they correspond to IP addresses" is enough.

A special domain is `localhost` which resolves to `127.0.0.1`.

This means that if you want to access a locally running HTTP web server on port `3000`, you would need to go to `localhost:3000` or, more specifically, `http://localhost:3000`.

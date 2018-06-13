package com.tang.websocket;

import org.java_websocket.WebSocketImpl;

public class Test {
    public static void main(String[] args) {
        WebSocketImpl.DEBUG = false;

        int port = 8085;
        Server server = new Server(port);

        server.start();

    }
}

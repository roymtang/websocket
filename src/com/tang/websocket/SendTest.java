package com.tang.websocket;

public class SendTest {
    public static void main(String[] args) {
        Pool.sendMessageToAll("服务端消息");

        Pool.getWsByUser("aa");
    }
}

# `SSE`

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="service" label="sse.service.ts">

```ts
import { Injectable } from '@nestjs/common';
import { ServerResponse } from 'http';
@Injectable()
export class SseService {
  private clients = new Map<string, ServerResponse>();

  // 添加客户端
  addClient(clientId: string, res: ServerResponse) {
    this.clients.set(clientId, res);
  }

  // 移除客户端
  removeClient(clientId: string) {
    this.clients.delete(clientId);
  }

  // 广播消息
  broadcastMessage(message: string) {
    this.clients.forEach((res) => {
      res.write(`data: ${JSON.stringify({ message })}\n\n`);
    });
  }

  // 给指定客户端发送消息
  sendMessageToClient(clientId: string, message: string) {
    const client = this.clients.get(clientId);
    if (client) {
      client.write(`data: ${JSON.stringify({ message })}\n\n`);
    } else {
      console.warn(`客户端 ${clientId} 不存在或已断开连接`);
    }
  }
}

```

</TabItem>

<TabItem value="controller" label="sse.controller.ts">

```ts
import { Controller, Get, Req, Res, Sse } from '@nestjs/common';
import { Response, Request } from 'express';
import { SseService } from './sse.service';
import { v4 as uuidv4 } from 'uuid';
import { Interval } from '@nestjs/schedule';

@Controller('sse')
export class SseController {
  constructor(private readonly sseService: SseService) {}

  @Get('msg')
  createMsgEvent(@Res() res: Response, @Req() req: Request) {
    // 设置 SSE 响应头
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders(); // 立即发送头部

    const clientId = uuidv4(); // 分配唯一 ID
    this.sseService.addClient(clientId, res);

    // 可选：发送一个欢迎消息
    res.write(`data: ${JSON.stringify({ message: 'SSE 连接已建立' })}\n\n`);
  }

  // 测试用 定时发送消息
  @Interval(5000)
  sendMessage() {
    const testMsg = '测试消息发送';
    console.log('testMsg');
    this.sseService.broadcastMessage(testMsg);
    return { success: true, message: testMsg };
  }
}
```

</TabItem>

</Tabs>

## 分布式消息推送 `Redis`
- `sse` 链接实例是保存在单一实例的，其他服务实例无法使用
- 结合 `Redis` 的发布订阅就能做到在分布式的系统中，统一处理推送消息

```ts
import { Injectable } from '@nestjs/common';
import { ServerResponse } from 'http';
// info-start
import Redis from 'ioredis';
// info-end
@Injectable()
export class SseService {
  // info-start
  private redisPublisher = new Redis(); // 用于发送消息
  private redisSubscriber = new Redis(); // 用于接收消息
  // info-end
  private clients: Map<string, ServerResponse> = new Map(); // 存储本地连接

  // info-start
  constructor() {
    // 订阅 Redis 频道，接收所有实例推送的消息
    this.redisSubscriber.subscribe('sse-channel');
    this.redisSubscriber.on('message', (channel, message) => {
      if (channel === 'sse-channel') {
        const { message: msg, clientId } = JSON.parse(message);
        this.sendToLocalClients(msg, clientId);
      }
    });
  }
  // info-end

  // 添加客户端
  addClient(clientId: string, res: ServerResponse) {
    this.clients.set(clientId, res);
  }

  // 移除客户端
  removeClient(clientId: string) {
    this.clients.delete(clientId);
  }

  // info-start
  /**
   * 推送消息到当前实例的所有客户端或指定客户端
   * @param message 消息内容
   * @param clientId 可选，指定客户端 ID，若为空则广播给所有客户端
   */
  private sendToLocalClients(message: string, clientId?: string) {
    if (clientId) {
      const client = this.clients.get(clientId);
      if (client) {
        client.write(`data: ${JSON.stringify({ message })}\n\n`);
      }
    } else {
      this.clients.forEach((res) => {
        res.write(`data: ${JSON.stringify({ message })}\n\n`);
      });
    }
  }

  /**
   * 推送消息到所有实例的所有客户端或指定客户端
   * @param message 消息内容
   * @param clientId 可选，指定客户端 ID，若为空则广播给所有客户端
   */
  sendToAllInstances(message: string, clientId?: string) {
    this.redisPublisher.publish(
      'sse-channel',
      JSON.stringify({ message, clientId }),
    );
  }
  // 定时任务：每隔 2 分钟发送心跳消息，保持连接活跃
  @Interval(120000)
  sendHeartbeat() {
    const heartbeatMsg = 'keep-alive';
    // 这里使用全局广播方式
    this.sendToAllInstances(heartbeatMsg);
    console.log('心跳消息已发送:', heartbeatMsg);
  }
  // info-end
}

```



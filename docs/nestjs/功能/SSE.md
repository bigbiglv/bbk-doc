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


:::tip
  用户的数据维护表最好使用 `redis` 来做，而不是直接保存在单一实例内存中
:::

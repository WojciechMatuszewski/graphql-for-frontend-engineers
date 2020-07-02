import React from "react";
import { Comment, List, Avatar } from "antd";

type Message = {
  id: string;
  content: string;
  createdAt: string;
};

type ChatMessageProps = {
  message: Message;
};

function ChatMessage({ message }: ChatMessageProps) {
  return (
    <Comment
      content={message.content}
      author="Workshop participant"
      avatar={
        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
      }
      style={{ wordBreak: "break-all" }}
    />
  );
}

type ChatMessagesListProps = {
  messages: Message[];
  loading: boolean;
};

function ChatMessagesList({ messages, loading }: ChatMessagesListProps) {
  return (
    <List
      bordered={true}
      dataSource={messages}
      loading={loading}
      header="Messages"
      itemLayout="horizontal"
      rowKey={(message) => message.id}
      style={{
        maxWidth: "500px",
        width: "100%",
        minWidth: "300px",
        paddingLeft: 24,
        paddingRight: 24
      }}
      renderItem={(message) => (
        <li>
          <ChatMessage message={message} />
        </li>
      )}
    />
  );
}

export { ChatMessage, ChatMessagesList };

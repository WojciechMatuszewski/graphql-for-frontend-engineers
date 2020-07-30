import React from "react";
import { Comment, List, Avatar, Input, Form, Button } from "antd";
import { Store } from "antd/lib/form/interface";
import { useForm } from "antd/lib/form/Form";

export type Message = {
  id: string;
  content: string;
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
  loading?: boolean;
};

function ChatMessagesList({ messages, loading }: ChatMessagesListProps) {
  React.useEffect(() => {
    const elem = document.querySelector(".list-test");
    if (!elem) return;
    elem.scrollTop = elem.scrollHeight;
  }, []);

  React.useLayoutEffect(() => {
    const elem = document.querySelector(".list-test");
    if (!elem) return;
    elem.scrollTop = elem.scrollHeight;
  }, [messages]);

  return (
    <List
      className="list-test"
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
        paddingRight: 24,
        maxHeight: 300,
        overflowY: "scroll"
      }}
      renderItem={(message) => (
        <li data-cy="chat-message">
          <ChatMessage message={message} />
        </li>
      )}
    />
  );
}

type ChatMessagesInputProps = {
  onSubmit: (message: string) => void;
};

function ChatMessagesInput({ onSubmit }: ChatMessagesInputProps) {
  const [form] = useForm();

  function handleOnFinish(store: Store) {
    onSubmit((store as { message: string }).message);
    form.resetFields();
  }

  return (
    <Form
      form={form}
      onFinish={handleOnFinish}
      name="chatMessages"
      initialValues={{ message: "" }}
    >
      <Form.Item
        name="message"
        rules={[{ required: true, message: "Field required" }]}
      >
        <Input placeholder="Type here..." />
      </Form.Item>
      <Button htmlType="submit">Submit</Button>
    </Form>
  );
}

type ChatProps = {
  onMessage: (message: string) => void;
} & ChatMessagesListProps;

function Chat({ messages, loading, onMessage }: ChatProps) {
  return (
    <div
      style={{
        maxWidth: "500px",
        width: "100%",
        minWidth: "300px"
      }}
    >
      <ChatMessagesList messages={messages} loading={loading} />
      <ChatMessagesInput onSubmit={onMessage} />
    </div>
  );
}

export { ChatMessage, ChatMessagesList, Chat };

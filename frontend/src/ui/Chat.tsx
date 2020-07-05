import React from "react";
import { Comment, List, Avatar, Input, Form } from "antd";
import { Store } from "antd/lib/form/interface";

export type Message = {
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
            rowKey={message => message.id}
            style={{
                maxWidth: "500px",
                width: "100%",
                minWidth: "300px",
                paddingLeft: 24,
                paddingRight: 24
            }}
            renderItem={message => (
                <li>
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
    function handleOnFinish(store: Store) {
        console.log(store);
    }

    return (
        <Form
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
        </Form>
    );
}

type ChatProps = {
    messages: Message[];
    loading: boolean;
    onMessage: (message: string) => void;
};

function Chat({ messages, loading, onMessage }: ChatProps) {
    return (
        <React.Fragment>
            <ChatMessagesList messages={messages} loading={loading} />
            <ChatMessagesInput onSubmit={onMessage} />
        </React.Fragment>
    );
}

export { ChatMessage, ChatMessagesList, Chat };

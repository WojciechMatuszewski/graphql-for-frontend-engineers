import React from "react";
import {
  Row,
  Col,
  Typography,
  Avatar,
  Descriptions,
  Tag,
  Button,
  Form,
  Input,
  Select,
  Space
} from "antd";
import { UserOutlined } from "@ant-design/icons";

export type User = {
  firstName: string;
  lastName: string;
  hobbies: string[];
};

type Props = {
  user: User;
  onEditLoading: boolean;
  onEdit: (user: User) => void;
};

function UserProfile({ user, onEdit, onEditLoading }: Props) {
  const [editing, setEditing] = React.useState(false);
  const toggleEditing = () => setEditing((prev) => !prev);

  const isMountedRef = React.useRef(false);
  React.useEffect(() => {
    isMountedRef.current = true;
    return () => void (isMountedRef.current = false);
  }, []);

  async function onSubmit(user: User) {
    await onEdit(user);
    isMountedRef.current && toggleEditing();
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        maxWidth: 400
      }}
    >
      <Typography.Title>User profile</Typography.Title>
      {editing ? (
        <UserProfileForm
          onCancel={toggleEditing}
          onSubmit={onSubmit}
          initialValues={user}
          loading={onEditLoading}
        />
      ) : (
        <React.Fragment>
          <UserProfileInformation user={user} />
          <Button type="primary" onClick={toggleEditing}>
            Edit profile
          </Button>
        </React.Fragment>
      )}
    </div>
  );
}

type UserProfileInformationProps = {
  user: User;
};

function UserProfileInformation({ user }: UserProfileInformationProps) {
  return (
    <Row gutter={16}>
      <Col flex="0">
        <Avatar size={64} icon={<UserOutlined />} />
      </Col>
      <Col flex="1">
        <Descriptions column={1} title="User information">
          <Descriptions.Item label="First name">
            {user.firstName}
          </Descriptions.Item>
          <Descriptions.Item label="Last Name">
            {user.lastName}
          </Descriptions.Item>
          <Descriptions.Item label="Hobbies">
            {user.hobbies.length === 0
              ? "None"
              : user.hobbies.map((hobby, index) => (
                  <Tag key={`${index}-${hobby}`}>{hobby}</Tag>
                ))}
          </Descriptions.Item>
        </Descriptions>
      </Col>
    </Row>
  );
}

type UserProfileFormProps = {
  initialValues: User;
  onSubmit: (user: User) => void;
  onCancel: VoidFunction;
  loading: boolean;
};

function UserProfileForm({
  initialValues,
  onSubmit,
  onCancel,
  loading
}: UserProfileFormProps) {
  return (
    <Form
      data-testid="userProfileForm"
      name="userProfileForm"
      initialValues={{ ...initialValues }}
      onFinish={(values) => onSubmit(values as User)}
      layout="vertical"
    >
      <Form.Item
        name="firstName"
        label="First name"
        rules={[{ required: true, message: "Cannot be empty" }]}
      >
        <Input placeholder="First name" />
      </Form.Item>
      <Form.Item
        name="lastName"
        label="Last name"
        rules={[{ required: true, message: "Cannot be empty" }]}
      >
        <Input placeholder="Last name" />
      </Form.Item>
      <Form.Item label="Hobbies" name="hobbies">
        <Select mode="tags" className="antd" />
      </Form.Item>
      <Form.Item>
        <Space size="small">
          <Button loading={loading} htmlType="submit" type="primary">
            Submit
          </Button>
          <Button htmlType="button" onClick={onCancel} disabled={loading}>
            Cancel
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
}

export { UserProfile };

import {
  Layout,
  Menu,
  Breadcrumb,
  Table,
  Tag,
  Spin,
  Empty,
  Button,
  Badge,
  Avatar,
  Radio,
  Popconfirm,
} from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  LoadingOutlined,
  PlusOutlined,
} from "@ant-design/icons";

import StudentDrawerForm from "./StudentDrawerForm";

import "./App.css";
import { deleteStudent, getAllStudents } from "./client";
import { useEffect, useState } from "react";
import { successNotification } from "./shared/AppNotifications";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const TheAvatar = ({ name }) => {
  let inputName = name.toUpperCase();
  let trimName = inputName.trim();

  if (trimName.length === 0) return <Avatar icon={<UserOutlined />} />;

  const split = trimName.split(" ");
  if (split.length === 1) return <Avatar>{inputName.charAt(0)}</Avatar>;

  return (
    <Avatar>{`${inputName.charAt(0)}${inputName.charAt(
      inputName.length - 1
    )}`}</Avatar>
  );
};

function App() {
  const [students, setStudents] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const [fetching, setFetching] = useState(true);

  const [showDrawer, setShowDrawer] = useState(false);

  const removeStudent = (studentId, callback) => {
    console.log(callback());
    deleteStudent(studentId).then(() => {
      successNotification(
        "Student deleted",
        `Student with ${studentId} was deleted`
      );
      callback();
    });
  };

  const fetchStudents = () =>
    getAllStudents()
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setStudents(data);
        setFetching(false);
      });

  // initial run
  useEffect(() => {
    console.log("Component mounted");
    console.log("run fetchStudents");
    fetchStudents();
  }, []);

  const columns = (fetchStudents) => [
    {
      title: "",
      dataIndex: "avatar",
      key: "avatar",
      render: (text, student) => <TheAvatar name={student.name} />,
    },
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, student) => (
        <Radio.Group>
          <Popconfirm
            placement="topRight"
            title={`Are you sure to delete ${student.name}`}
            onConfirm={() => removeStudent(student.id, fetchStudents)}
            okText="Yes"
            cancelText="No"
          >
            <Radio.Button value="small">Delete</Radio.Button>
          </Popconfirm>
          <Radio.Button value="small">Edit</Radio.Button>
        </Radio.Group>
      ),
    },
  ];

  const data = [
    {
      id: "1",
      name: "Rabin",
      email: "rabin@yahoo.com",
      gender: "Male",
    },
  ];

  const renderStudents = () => {
    if (fetching) {
      return <Spin indicator={antIcon} />;
    }
    if (students.length <= 0) {
      return <Empty />;
    }
    const size = 10;

    return (
      <>
        <StudentDrawerForm
          showDrawer={showDrawer}
          setShowDrawer={setShowDrawer}
          fetchStudents={fetchStudents}
        />
        <Table
          dataSource={students}
          columns={columns(fetchStudents)}
          bordered
          title={() => (
            <>
              <Button
                onClick={() => setShowDrawer(!showDrawer)}
                type="primary"
                shape="round"
                icon={<PlusOutlined />}
                size="small"
              >
                Add New Student
              </Button>
              <br />
              <br />
              <Tag style={{ marginLeft: "5px" }}>No of students</Tag>
              <Badge count={students.length} className="site-badge-count-4" />
            </>
          )}
          pagination={{ pageSize: 50 }}
          scroll={{ y: 240 }}
          rowKey={(student) => student.id}
        />
      </>
    );
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            Option 1
          </Menu.Item>
          <Menu.Item key="2" icon={<DesktopOutlined />}>
            Option 2
          </Menu.Item>
          <SubMenu key="sub1" icon={<UserOutlined />} title="User">
            <Menu.Item key="3">Tom</Menu.Item>
            <Menu.Item key="4">Bill</Menu.Item>
            <Menu.Item key="5">Alex</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
            <Menu.Item key="6">Team 1</Menu.Item>
            <Menu.Item key="8">Team 2</Menu.Item>
          </SubMenu>
          <Menu.Item key="9" icon={<FileOutlined />}>
            Files
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            {renderStudents()}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Zalo IT ©2021 Created by Rabin
        </Footer>
      </Layout>
    </Layout>
  );
}

export default App;

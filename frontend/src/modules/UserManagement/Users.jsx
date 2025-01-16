import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  message,
  Spin,
  Row,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  FilePdfOutlined,
} from "@ant-design/icons";
import userService from "../../services/userService";
import ViewUser from "./ViewUser";
import jsPDF from "jspdf";
import "jspdf-autotable";

const Drivers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingUser, setEditingUser] = useState(null);
  const [viewUserOpen, setViewUserOpen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [form] = Form.useForm();

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const data = await userService.getAllUsers();
        setUsers(data);
      } catch (error) {
        message.error("Failed to fetch users");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await userService.deleteUser(id);
      setUsers(users.filter((user) => user._id !== id));
      message.success("User deleted successfully");
    } catch (error) {
      message.error("Failed to delete user");
      console.error(error);
    }
  };

  const showEditModal = (user) => {
    setEditingUser(user);
    form.setFieldsValue(user);
    setIsModalVisible(true);
  };

  const handleUpdate = async () => {
    try {
      const values = form.getFieldsValue();
      await userService.updateUser(editingUser._id, values);
      setUsers(
        users.map((user) =>
          user._id === editingUser._id ? { ...user, ...values } : user
        )
      );
      message.success("User updated successfully");
      setIsModalVisible(false);
      setEditingUser(null);
    } catch (error) {
      message.error("Failed to update user");
      console.error(error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.driverName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    { title: "Driver ID", dataIndex: "driverId", key: "driverId" },
    { title: "Driver Name", dataIndex: "driverName", key: "driverName" },
    { title: "Basic Salary", dataIndex: "basicSalary", key: "basicSalary" },
    {
      title: "Overtime Hours",
      dataIndex: "overtimeHours",
      key: "overtimeHours",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, user) => (
        <div>
          <Button
            onClick={() => {
              setEditingUser(user);
              setViewUserOpen(true);
            }}
            icon={<EyeOutlined />}
            style={{ marginRight: 8 }}
          />
          <Button
            icon={<EditOutlined />}
            onClick={() => showEditModal(user)}
            style={{ marginRight: 8 }}
          />
          <Button
            onClick={() => handleDelete(user._id)}
            icon={<DeleteOutlined />}
            danger
          />
        </div>
      ),
    },
  ];

  // Function to generate PDF
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("User Report", 14, 20);
    const tableColumn = [
      "Driver ID",
      "Driver Name",
      "Basic Salary",
      "Overtime Hours",
    ];
    const tableRows = [];

    users.forEach((user) => {
      const userData = [
        user.driverId,
        user.driverName,
        user.basicSalary,
        user.overtimeHours,
      ];
      tableRows.push(userData);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 30,
    });

    doc.save("user_report.pdf");
  };

  return (
    <div>
      <Row justify={"space-between"}>
        <h1>Salary Details</h1>
        <Input
          placeholder="Search by driver name"
          value={searchTerm}
          onChange={handleSearch}
          style={{ marginBottom: 20, width: "300px" }}
        />
        {/* Generate PDF button */}
        <Button type="primary" icon={<FilePdfOutlined />} onClick={generatePDF}>
          Generate PDF
        </Button>
      </Row>

      {loading ? (
        <Spin size="large" />
      ) : (
        <Table
          columns={columns}
          dataSource={filteredUsers}
          rowKey={(user) => user._id}
        />
      )}

      <Modal
        title="Edit User"
        visible={isModalVisible}
        onOk={handleUpdate}
        onCancel={() => setIsModalVisible(false)}
        okText="Update"
        cancelText="Cancel"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Driver ID"
            name="driverId"
            rules={[{ required: true, message: "Please input the Driver ID" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Driver Name"
            name="driverName"
            rules={[
              { required: true, message: "Please input the Driver Name" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Basic Salary"
            name="basicSalary"
            rules={[
              { required: true, message: "Please input the Basic Salary" },
            ]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Overtime Hours"
            name="overtimeHours"
            rules={[
              { required: true, message: "Please input the Overtime Hours" },
              {
                pattern: /^([0-1]?[0-9]|2[0-3]):([0-5]?[0-9]):([0-5]?[0-9])$/,
                message: "Please enter time in HH:MM:SS format",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      <ViewUser
        open={viewUserOpen}
        onCancel={() => setViewUserOpen(false)}
        onClose={() => setViewUserOpen(false)}
        id={editingUser?._id}
      />
    </div>
  );
};

export default Drivers;

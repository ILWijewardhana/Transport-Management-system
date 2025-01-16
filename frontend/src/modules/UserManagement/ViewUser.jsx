import React, { useEffect, useState } from "react";
import { Modal, Descriptions, Spin, message } from "antd";
import userService from "../../services/userService";

const ViewUser = ({ id, onClose, onCancel, open }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      if (id) {
        setLoading(true);
        try {
          const res = await userService.getUserById(id);
          setUser(res);
        } catch (error) {
          message.error("Failed to fetch user details");
        } finally {
          setLoading(false);
        }
      }
    };
    fetchUser();
  }, [id]);

  return (
    <Modal
      width={1000}
      open={open}
      onCancel={onCancel}
      onClose={onClose}
      title="User Details"
      footer={null}
    >
      {loading ? (
        <Spin />
      ) : user ? (
        <Descriptions bordered>
          <Descriptions.Item label="Driver ID">
            {user.driverId}
          </Descriptions.Item>
          <Descriptions.Item label="Driver Name">
            {user.driverName}
          </Descriptions.Item>
          <Descriptions.Item label="Basic Salary">
            {user.basicSalary}
          </Descriptions.Item>
          <Descriptions.Item label="Overtime Hours">
            {user.overtimeHours}
          </Descriptions.Item>
          <Descriptions.Item label="Overtime Rate">
            {user.overtimeRate}
          </Descriptions.Item>
          <Descriptions.Item label="Present Days">
            {user.presentDays}
          </Descriptions.Item>
          <Descriptions.Item label="Advance">{user.advance}</Descriptions.Item>
          <Descriptions.Item label="Net Pay">{user.netPay}</Descriptions.Item>
        </Descriptions>
      ) : (
        <p>No user data available</p>
      )}
    </Modal>
  );
};

export default ViewUser;

import React, { useEffect, useRef, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  message,
  Row,
  Space,
  Alert,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import inventoryService from "../../services/inventoryService";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Pie, Bar } from "react-chartjs-2";
import html2canvas from "html2canvas";

const InventoryManager = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState("");

  // Refs for the chart elements
  const pieChartRef = useRef(null);
  const barChartRef = useRef(null);

  // Fetch all inventory items
  const fetchItems = async () => {
    setLoading(true);
    try {
      const data = await inventoryService.getAllItems();
      setItems(data);
    } catch (error) {
      message.error("Failed to fetch inventory items.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // Show modal for creating or editing item
  const showModal = (item = null) => {
    setEditingItem(item);
    if (item) {
      form.setFieldsValue(item);
    } else {
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  // Handle form submission for creating/updating item
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (editingItem) {
        await inventoryService.updateItem(editingItem._id, values);
        message.success("Item updated successfully.");
      } else {
        await inventoryService.createItem(values);
        message.success("Item created successfully.");
      }
      setIsModalVisible(false);
      setEditingItem(null);
      fetchItems();
    } catch (error) {
      message.error("Error in processing the form.");
    }
  };

  // Delete item
  const deleteItem = async (id) => {
    try {
      await inventoryService.deleteItem(id);
      message.success("Item deleted successfully.");
      fetchItems();
    } catch (error) {
      message.error("Failed to delete item.");
    }
  };

  // Table columns
  const columns = [
    {
      title: "Item ID",
      dataIndex: "Item_ID",
      key: "Item_ID",
      sorter: (a, b) => a.Item_ID.localeCompare(b.Item_ID),
    },
    {
      title: "Item Name",
      dataIndex: "Item_Name",
      key: "Item_Name",
      sorter: (a, b) => a.Item_Name.localeCompare(b.Item_Name),
    },
    {
      title: "Size",
      dataIndex: "Size",
      key: "Size",
      sorter: (a, b) => a.Size.localeCompare(b.Size),
    },
    {
      title: "Type",
      dataIndex: "Type",
      key: "Type",
      sorter: (a, b) => a.Type.localeCompare(b.Type),
    },
    {
      title: "Price",
      dataIndex: "Price",
      key: "Price",
      sorter: (a, b) => a.Price - b.Price,
    },
    {
      title: "Stock Count",
      dataIndex: "Stock_Count",
      key: "Stock_Count",
      sorter: (a, b) => a.Stock_Count - b.Stock_Count,
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => showModal(record)} />
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => deleteItem(record._id)}
          />
        </Space>
      ),
    },
  ];

  // Search handler
  const handleSearch = (value) => {
    setSearchText(value);
  };

  // Data for pie chart (Price distribution)
  const pieData = {
    labels: items.map((item) => item.Item_Name),
    datasets: [
      {
        label: "Price",
        data: items.map((item) => item.Price),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
      },
    ],
  };

  // Data for bar chart (Stock distribution)
  const barData = {
    labels: items.map((item) => item.Item_Name),
    datasets: [
      {
        label: "Stock Count",
        data: items.map((item) => item.Stock_Count),
        backgroundColor: "#36A2EB",
      },
    ],
  };

  // Function to generate PDF
  const generatePDF = async () => {
    try {
      const doc = new jsPDF({ format: "a4", orientation: "landscape" });

      doc.text("Inventory Report", 14, 20);

      // Ensure charts are rendered before capturing them
      const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
      await delay(1000);

      // Convert Pie chart to image
      const pieChartCanvas = pieChartRef.current;
      const pieImage = await html2canvas(pieChartCanvas, { scale: 3 }).then((canvas) =>
        canvas.toDataURL("image/png")
      );
      doc.addImage(pieImage, "PNG", 14, 30, 180, 100);  // Adjust dimensions as needed

      // Convert Bar chart to image
      const barChartCanvas = barChartRef.current;
      const barImage = await html2canvas(barChartCanvas, { scale: 3 }).then((canvas) =>
        canvas.toDataURL("image/png")
      );
      doc.addPage();
      doc.addImage(barImage, "PNG", 14, 30, 180, 100);

      // Table data
      const tableColumn = [
        "Item ID",
        "Item Name",
        "Size",
        "Type",
        "Price",
        "Stock Count",
      ];
      const tableRows = [];

      items.forEach((item) => {
        const itemData = [
          item.Item_ID,
          item.Item_Name,
          item.Size,
          item.Type,
          item.Price,
          item.Stock_Count,
        ];
        tableRows.push(itemData);
      });

      doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: 150,
      });

      doc.save("inventory_report_with_charts.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
      message.error("Failed to generate PDF");
    }
  };

  // Check if there are items with stock count below 40
  const hasLowStockItems = items.some((item) => item.Stock_Count < 40);

  return (
    <div>
      <Row justify="space-between" style={{ marginBottom: 20 }}>
        <h1>Inventory Manager</h1>
        <Space>
          <Input.Search
            placeholder="Search items"
            onSearch={handleSearch}
            style={{ width: 200 }}
          />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => showModal()}
          >
            Add Item
          </Button>
          <Button type="default" onClick={generatePDF}>
            Generate PDF
          </Button>
        </Space>
      </Row>

      {/* Show warning message if any item has low stock */}
      {hasLowStockItems && (
        <Alert
          message="Warning"
          description="Some items have a stock count below 40. Please restock."
          type="warning"
          showIcon
          style={{ marginBottom: 20 }}
        />
      )}

      <Table
        dataSource={items.filter((item) =>
          item.Item_Name.toLowerCase().includes(searchText.toLowerCase())
        )}
        columns={columns}
        rowKey={(record) => record._id}
        loading={loading ? { indicator: <LoadingOutlined /> } : false}
      />

      {/* Modal for Creating/Editing Item */}
      <Modal
        title={editingItem ? "Edit Item" : "Add Item"}
        visible={isModalVisible}
        onOk={handleSubmit}
        onCancel={() => setIsModalVisible(false)}
        okText={editingItem ? "Update" : "Create"}
        cancelText="Cancel"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="Item_ID"
            label="Item ID"
            rules={[{ required: true, message: "Please enter the Item ID" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="Item_Name"
            label="Item Name"
            rules={[{ required: true, message: "Please enter the Item Name" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="Size"
            label="Size"
            rules={[{ required: true, message: "Please enter the Size" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="Type"
            label="Type"
            rules={[{ required: true, message: "Please enter the Type" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="Price"
            label="Price"
            rules={[{ required: true, message: "Please enter the Price" }]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="Stock_Count"
            label="Stock Count"
            rules={[{ required: true, message: "Please enter the Stock Count" }]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
        </Form>
      </Modal>

      {/* Charts */}
      <div style={{ display: "flex", justifyContent: "space-around", marginTop: "20px" }}>
        <div ref={pieChartRef} style={{ width: "400px", height: "400px" }}>
          <Pie data={pieData} options={{ maintainAspectRatio: false }} />
        </div>

        <div ref={barChartRef} style={{ width: "400px", height: "400px" }}>
          <Bar data={barData} options={{ maintainAspectRatio: false }} />
        </div>
      </div>
    </div>
  );
};

export default InventoryManager;
